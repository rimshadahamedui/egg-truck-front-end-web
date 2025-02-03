import React, { useEffect, useState } from "react";
import { ADMIN_URL, categoryHeaders } from "../../../constants";
import AddorEditcategory from "./dialogue/AddorEditCategory";
import CategoryRow from "./CategoryRow";
import AddorEditSubcategory from "./dialogue/AddorEditSubcategory";
import SubCategoryList from "./SubCategoryList";
import useDisableBodyScroll from "../../../Hooks/useDisableBodyScroll";
import AvailableOffers from "../Products/dialogue/AvailableOffers";
import updateArrayObjects from "../../../utils";
import useFetchApi from "../../../Hooks/useFetchApi";

const CategoryList = () => {
  const {
    data: categories,
    setData: setCategories,
    isLoading,
  } = useFetchApi({ url: ADMIN_URL + "/categories" });
  const [categoryModal, setCategoryModal] = useState({
    isEditing: false,
    show: false,
    _id: null,
    name: null,
    image: null,
  });
  const [subCategoryModal, setSubCategoryModal] = useState({
    isEditing: false,
    show: false,
    _id: null,
    name: null,
    categoryId: null,
  });

  const [subCategory, setSubCategory] = useState({
    show: false,
    _id: null,
    parentCategory: null,
  });
  const [offerListModal, setOfferListModal] = useState({
    show: false,
    categoryId: null,
  });
  useDisableBodyScroll(categoryModal.show);

  const handleNewCategory = (category) => {
    setCategories((prev) => [...prev, category]);
  };
  const handleUpdateCategory = (updatedCategory) => {
    const updateCategories = updateArrayObjects(
      categories,
      "_id",
      categoryModal._id,
      updatedCategory
    );
    setCategories(updateCategories);
  };

  const handleOfferApply = (category) => {
    const { _id, isOfferActive, offer } = category;
    const offerId = isOfferActive ? offer?.offerId : null;
    setOfferListModal({
      show: true,
      categoryId: _id,
      hasOffer: isOfferActive,
      offerId,
    });
  };

  const handleOfferModalVisibility = (offerUpdatedData) => {
    if (offerUpdatedData) {
      const updatedCategory = updateArrayObjects(
        categories,
        "_id",
        offerListModal.categoryId,
        offerUpdatedData
      );
      setCategories(updatedCategory);
    }
    setOfferListModal({
      show: false,
      categoryId: null,
      offerId: null,
      isOfferActive: null,
    });
  };
  return (
    <div className="p-8 w-full h-screen">
      <div className="flex justify-end ">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setSubCategoryModal((prev) => ({
                ...prev,
                show: true,
              }))
            }
            className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add SubCategory
          </button>
          <button
            type="button"
            onClick={() =>
              setCategoryModal((prev) => ({
                ...prev,
                show: true,
              }))
            }
            className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border bg-white-A700 dark:bg-dark rounded-2xl">
        <table className="min-w-full">
          <thead>
            <tr>
              {categoryHeaders.map((header, i) => (
                <th className="py-2 px-4 border" key={i}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              <>
                {categories.map((category, i) => (
                  <CategoryRow
                    S_no={i + 1}
                    key={category._id}
                    {...category}
                    handleEdit={(_id, name) =>
                      setCategoryModal({
                        isEditing: true,
                        name,
                        _id,
                        image: category?.image,
                        show: true,
                      })
                    }
                    handleViewSubcategory={(_id, parentCategory) =>
                      setSubCategory({
                        show: true,
                        _id,
                        parentCategory,
                      })
                    }
                    handleApplyOfferClick={() => handleOfferApply(category)}
                  />
                ))}
              </>
            ) : null}
          </tbody>
        </table>
      </div>
      {categoryModal.show && !categoryModal.isEditing && (
        <AddorEditcategory
          handleNewCategory={handleNewCategory}
          handlevisibilty={() =>
            setCategoryModal((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      )}
      {categoryModal.show && categoryModal.isEditing && (
        <AddorEditcategory
          isEditing={true}
          handleUpdateCategory={handleUpdateCategory}
          categoryData={{
            name: categoryModal.name,
            _id: categoryModal._id,
            image: categoryModal.image,
          }}
          handlevisibilty={() =>
            setCategoryModal({
              isEditing: false,
              show: false,
              name: null,
              image: null,
              _id: null,
            })
          }
        />
      )}

      {subCategoryModal.show && !subCategoryModal.isEditing && (
        <AddorEditSubcategory
          parentCategoryData={categories}
          handlevisibilty={() =>
            setSubCategoryModal((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      )}
      {subCategoryModal.show && subCategoryModal.isEditing && (
        <AddorEditSubcategory
          isEditing={true}
          parentCategoryData={categories}
          subCategoryData={{
            name: subCategoryModal.name,
            categoryId: subCategoryModal.categoryId,
            _id: subCategoryModal._id,
          }}
          handlevisibilty={() =>
            setSubCategoryModal({
              isEditing: false,
              _id: null,
              categoryId: null,
              name: null,
              show: false,
            })
          }
        />
      )}

      {subCategory.show && (
        <SubCategoryList
          parentCategory={{
            name: subCategory.parentCategory,
            _id: subCategory._id,
          }}
          handlevisibilty={() =>
            setSubCategory({ show: false, _id: null, parentCategory: null })
          }
          handleSubCategoryEdit={(_id, name, parentCategoryId) => {
            setSubCategoryModal({
              _id,
              name,
              show: true,
              isEditing: true,
              categoryId: parentCategoryId,
            });
            setSubCategory({ show: false, _id: null, parentCategory: null });
          }}
        />
      )}
      {/* Offer apply modal */}
      {offerListModal.show && (
        <AvailableOffers
          offerData={{ type: "category", objectId: offerListModal.categoryId }}
          offerStatus={offerListModal}
          handlevisibilty={handleOfferModalVisibility}
        />
      )}
    </div>
  );
};

export default CategoryList;
