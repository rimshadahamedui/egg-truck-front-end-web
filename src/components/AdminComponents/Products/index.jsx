import { useState } from "react";
import { ADMIN_URL, productHeaders } from "../../../constants";
import AddorEditProduct from "./dialogue/AddorEditProduct";
import useDisableBodyScroll from "../../../Hooks/useDisableBodyScroll";
import useFetchApi from "../../../Hooks/useFetchApi";
import ProductRow from "./ProductRow";
import AvailableOffers from "./dialogue/AvailableOffers";
import Loader from "../../UserComponents/Loader";
import updateArrayObjects from "../../../utils";
import Pagination from "../../UserComponents/Pagination";
import { usePaginateState } from "../../../Hooks/usePagination";

const ProductList = () => {
  // const { currentPage, itemsPerPage, pageSize, setCurrentPage } =
  //   usePaginateState();
  const {
    data: products,
    isLoading,
    setData: setProducts,
  } = useFetchApi({ url: ADMIN_URL + "/products" });
  const [productModal, setProductModal] = useState({
    show: false,
    isEditing: false,
    productData: null,
  });
  const [offerListModal, setOfferListModal] = useState({
    show: false,
    productId: null,
    isOfferActive: null,
    offerId: null,
  });
  useDisableBodyScroll(productModal.show);

  const handleNewProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleEditProduct = (productData) => {
    setProductModal({
      isEditing: true,
      show: true,
      productData,
    });
  };

  const handleVisibility = () => {
    setProductModal({ show: false, isEditing: false, productData: null });
  };
  const handleOfferApply = (product) => {
    const { _id, isOfferActive, offer } = product;
    const offerId = isOfferActive ? offer?.offerId : null;
    setOfferListModal({
      show: true,
      productId: _id,
      hasOffer: isOfferActive,
      offerId,
    });
  };

  const handleOfferModalVisibility = (offerUpdatedData) => {
    if (offerUpdatedData) {
      const updatedProducts = updateArrayObjects(
        products,
        "_id",
        offerListModal.productId,
        offerUpdatedData
      );
      setProducts(updatedProducts);
    }
    setOfferListModal({
      show: false,
      productId: null,
      offerId: null,
      isOfferActive: null,
    });
  };
  return (
    <div className={`p-5 w-full h-full`}>
      <div className="flex justify-end item-center">
        <button
          type="button"
          onClick={() => setProductModal((prev) => ({ ...prev, show: true }))}
          className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Add Product
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto border bg-white-A700 dark:bg-dark rounded-2xl">
          <table className="min-w-full overflow-x-auto">
            <thead>
              <tr>
                {productHeaders.map((header, i) => (
                  <th className="py-2 px-4 border" key={i}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                <>
                  {products.map((product) => (
                    <ProductRow
                      {...product}
                      key={product?._id}
                      handleEditProduct={() => handleEditProduct(product)}
                      handleApplyOfferClick={() => handleOfferApply(product)}
                    />
                  ))}
                </>
              ) : (
                <tr>
                  <td>
                    <h3>No products</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <Pagination
            currentPage={currentPage}
            totalCount={pageSize}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      )}
      {/* create product modal */}
      {productModal.show && !productModal.isEditing && (
        <AddorEditProduct
          handleNewProduct={handleNewProduct}
          handleVisibility={() =>
            setProductModal((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      )}

      {/* Product editing modal */}
      {productModal.show && productModal.isEditing && (
        <AddorEditProduct
          isEditing={true}
          handleVisibility={handleVisibility}
          productData={productModal.productData}
        />
      )}
      {/* Available offers list */}
      {offerListModal.show && (
        <AvailableOffers
          offerData={{ type: "product", objectId: offerListModal.productId }}
          offerStatus={offerListModal}
          handlevisibilty={handleOfferModalVisibility}
        />
      )}
    </div>
  );
};

export default ProductList;
