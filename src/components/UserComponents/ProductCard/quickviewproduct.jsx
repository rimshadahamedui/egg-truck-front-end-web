import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addItemToWishlist, getProduct, removeItemFromWishlist} from "../../../utils/api/product";
import {getProducts, getProductsWithWishlistStatus} from "../../../utils/api/products";
import axiosInstance, {axiosPublicInstance} from "../../../utils/api/axiosInstance";
import {USER_URL} from "../../../constants";
import {getTruncated} from "../../../utils";
import showToast from "../../../utils/showToast";
import {addToCart} from "../../../redux/slices/CartSlice";
import {Img} from "../Img";
import {Heading} from "../Heading";
import {Text} from "../Text";
import {FullHeartSVG, HeartOutlineSVG} from "../svg";
import QuantityButton from "../QuantityButton";
import {ShoppingCart, X} from "lucide-react";
import Loader from "../Loader";



export default function QuickViewProduct({pid , closeHandle}) {


    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [hasProductInCart, setHasProductInCart] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [wishlistStatus, setWishlistStatus] = useState(false);
    const [qty, setQty] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [description, setDescription] = useState({
        readMore: false,
        text: null,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);


    const handleQuantityChange = useCallback((quantity, action) => {
        if (action === "INCREMENT") {
            setQty(qty + 1);
        } else {
            if(qty  !== 1){
                setQty(qty - 1);
            }
        }
    })

    useEffect(() => {
        if (cart && product) {
            const isProductAlreadyInCart = cart.length
                ? cart.find((p) => p?._id === product?._id)
                : null;
            setHasProductInCart(isProductAlreadyInCart ? true : false);
        }
    }, [cart, product]);
    useEffect(() => {
        const getProductData = async () => {
            try {
                const { data } = await getProduct(pid);
                const { data: recommendedProducts } = await getProducts({
                    limit: 4,
                    category: data.categoryId,
                });
                const { data: reviews } = await axiosPublicInstance(
                    USER_URL + `/feedback?productId=${pid}`
                );
                setReviews(reviews.data);
                setRecommendedProducts(
                    recommendedProducts.filter((p) => p._id !== pid)
                );
                if (user.isAuthenticated && user.role !== "admin") {
                    const [wishlistUpdatedProduct] = await getProductsWithWishlistStatus([
                        data,
                    ]);
                    setWishlistStatus(wishlistUpdatedProduct.isProductInWishlist);
                }
                setDescription({
                    readMore: false,
                    text: getTruncated(data?.description, 300),
                });
                setProduct(data);
                setSelectedImage(data?.images[0]);
            } catch (error) {
                setError(error);
                showToast(error.message, "dark");
            }
        };
        getProductData();
    }, [pid]);

    const handleSelectImage = (image) => setSelectedImage(image);

    const handleWishlistChange = () => {
        const updateWishlist = !wishlistStatus;
        setWishlistStatus(updateWishlist);
        if (updateWishlist) {
            addItemToWishlist(product?._id)
                .then(() => showToast("Added to your wishlist"))
                .catch((e) => showToast(e.message, "error"));
        } else {
            removeItemFromWishlist(product?._id)
                .then(() => showToast("Removed from your wishlist"))
                .catch((e) => showToast(e.message, "error"));
        }
    };

    const handleAddtoCart = () => {
        if (!user?.isAuthenticated) {
            navigate(`/login?redirect=/product/${product?._id}`);
            return;
        }
        if (hasProductInCart) {
            navigate("/cart");
            return;
        }
        if (cart.length >= 10) {
            showToast(
                "Sorry, you can only add up to 10 product to your cart.",
                "dark"
            );
            return;
        }
        const payload = {
            _id: product?._id,
            name: product?.name,
            thumbnail: product?.images[0],
            stock: product?.stock,
            quantity: qty,
            price: product?.price,
        };
        setIsSubmitting(true);
        axiosInstance
            .post(USER_URL + "/cart", { productId: product?._id })
            .then(() => {
                dispatch(addToCart(payload));
                showToast("Item added to cart successfully");
            })
            .catch((e) => showToast(e.message, "error"))
            .finally(() => setIsSubmitting(false));
    };
    if (error) {
        return null;
    }






    return (
      <div className="flex bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0  h-screen p-10">
          {
              !product ? <Loader/> :

                  <div className="relative  w-full max-w-5xl max-h-full bg-slate-50 rounded-[16px] overflow-auto ">
                      <div class="d-flex sticky w-full justify-end top-0 right-0 bg-slate-50 z-[9999]">
                          <a className="cursor-pointer ms-auto p-5 max-w-[50px]" onClick={() => closeHandle(false)}> <X /></a>
                      </div>
                      <div className="grid grid-cols-8 md:grid-cols-1 gap-10 px-5  md:px-2">
                          <div className="flex col-span-4 gap-2">
                              <div className="flex flex-col gap-2 md:w-full  md:h-auto h-[450px]  overflow-y-auto scrollbar-hide ">
                                  {product?.images?.length ? (
                                      <>
                                          {product?.images?.map((image, index) => (
                                              <Img
                                                  key={"imageList" + index}
                                                  src={image}
                                                  alt="product image"
                                                  onClick={() => handleSelectImage(image)}
                                                  onMouseEnter={() => handleSelectImage(image)}
                                                  loading="eager"
                                                  className={`size-20 ${
                                                      product?.images.length > 3 && "flex-1"
                                                  }  
                              rounded-md object-cover hover:cursor-pointer hover:border-2 border-gray-300`}
                                              />
                                          ))}
                                      </>
                                  ) : null}
                              </div>
                              <div className="sm:order-1 relative lg:h-[450px]  rounded-xl md:h-auto md:w-full md:flex-none border border-gray-200">
                                  {selectedImage && (
                                      <Img
                                          src={selectedImage}
                                          alt="Main Image"
                                          loading="eager"
                                          className="lg:h-[450px] w-full rounded-xl object-contain"
                                      />
                                  )}
                              </div>
                          </div>

                          <div className="col-span-4">


                              <div className="flex">

                                  <div className="flex self-center me-auto">
                                      {
                                          product?.averageRating ? (
                                              <div className="flex pt-px self-center">
                                                  <Img src="/images/star.svg" alt="signal image" className="h-[25px] w-[25px] self-center" />
                                                  <Heading as="h5" className="!text-blue_gray-700 ms-3"> {product?.averageRating.toFixed(1)}</Heading>
                                                  {reviews?.length ? (
                                                      <a href="#reviews">
                                                          <Text as="p" className="!font-medium underline ms-3"> {" "} {reviews?.length} review </Text>
                                                      </a>
                                                  ) : null}
                                              </div>
                                          ) : <></>
                                      }

                                  </div>


                                  {product?.stock > 0 && (
                                      <p className={`text-sm p-2 rounded-full px-3 text-white-A700 font-medium self-center
                          ${product?.stock >= 5 ? "bg-green-500": product?.stock >= 3 ? "bg-yellow-500": "bg-red-500"}`}
                                      >
                                          {product?.stock >= 5 ? "In stock"
                                              : product?.stock >= 3
                                                  ? `Hurry, only ${product?.stock} left!`
                                                  : `Hurry, only ${product?.stock} left!`}
                                      </p>
                                  )}

                                  {
                                      user?.isAuthenticated && user?.role !== "admin" && (
                                          <button onClick={handleWishlistChange} disabled={isSubmitting} className="p-1 ms-5 bg-white-A700 rounded-full disabled:cursor-not-allowed disabled:opacity-50">
                                              {wishlistStatus ? (<FullHeartSVG className="size-8" />) : (<HeartOutlineSVG className="size-8" />)}
                                          </button>
                                      )}

                              </div>

                              <div>
                                  <h1 className="mt-5 text-md font-bold">{product?.name}</h1>

                                  <div className="my-8">
                                      <p className="text-sm font-bold">Age Category</p>
                                      <div className="flex mt-3">
                                          <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">13 +</span>
                                      </div>
                                  </div>

                                  <div className="my-8">
                                      <p className="text-sm font-bold">Cover</p>
                                      <div className="flex mt-3">
                                          <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">Paperback</span>
                                          <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">Hardcover</span>
                                      </div>
                                  </div>



                                  {/* <div className="my-8">
                            <p className="text-sm font-bold">Color</p>
                            <div className="flex mt-3">
                              <span className="h-[30px] w-[30px] me-2 bg-black block border border-gray-200"></span>
                              <span className="h-[30px] w-[30px] me-2 bg-slate-100 block border border-gray-200"></span>
                              <span className="h-[30px] w-[30px] me-2 bg-gray-500 block border border-gray-200"></span>
                              <span className="h-[30px] w-[30px] me-2 bg-yellow-500 block border border-gray-200"></span>
                            </div>
                          </div>

                          <div className="my-8">
                            <p className="text-sm font-bold">Size</p>
                            <div className="flex mt-3">
                              <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">S</span>
                              <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">M</span>
                              <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">L</span>
                              <span className="py-2 p-2 me-2 bg-slate-100 block border border-gray-200 text-center">XL</span>
                            </div>
                          </div>*/}


                                  <div className="flex flex-1 my-10 ">
                                      <Heading size="md" as="h4">${product?.price.toFixed(2)}</Heading>
                                      {product?.price !== product?.actualPrice && (
                                          <Text size="s" as="p" className="!font-medium line-through">${product?.actualPrice.toFixed(2)}</Text>
                                      )}
                                  </div>

                                  <div className="flex my-10 gap-5">
                                      {
                                          !hasProductInCart ? <QuantityButton quantity={qty} handleUpdateQuantity={handleQuantityChange}  /> : <></>
                                      }



                                      {product?.stock < 1 ? (
                                          <button className="bg-gray-300 text-black font-semibold py-2 px-4  opacity-70 rounded-[26px]" disabled>
                                              Out of Stock!
                                          </button>
                                      ) : (
                                          <button onClick={handleAddtoCart} className="bg-thdark text-white-A700 gap-2 justify-center flex rounded-[26px] px-10 py-3 font-medium sm:px-5 disabled:opacity-50">
                                              {
                                                  !user?.isAuthenticated ? ( <span className="self-center px-5"> Login </span>) :
                                                      <>
                                                          <ShoppingCart className="h-6 w-6 text-white-A700 self-center" />
                                                          <span className="self-center">
                                      {
                                          hasProductInCart
                                              ? "Go to cart"
                                              : isSubmitting
                                              ? "Adding"
                                              : "Add to cart"
                                      }
                                  </span>
                                                      </>
                                              }
                                          </button>
                                      )}
                                  </div>


                              </div>













                          </div>
                      </div>




                      <div className="p-5  md:p-2" >
                          <h3 className=" font-bold text-3xl">Overview</h3>

                          <div className="grid grid-cols-8 md:grid-cols-1">
                              <div className="col-span-8">
                                  {
                                      product?.description ? (
                                          <div className="grid grid-cols-2 md:grid-cols-1 mt-10 gap-6">
                                              <div className="col-span-1">
                                                  <p className="text-sm leading-6">{ product?.description}</p>
                                              </div>

                                              <div className="grid grid-cols-2 text-sm">

                                                  <div className="flex py-2 px-5 border-gray-200 self-center font-bold bg-slate-100"> Product Weight</div>
                                                  <div className="flex py-2 px-5 self-center bg-slate-100">1Kg</div>

                                                  <div className="flex py-2 px-5 border-gray-200 self-center font-bold"> Author(s)</div>
                                                  <div className="flex py-2 px-5">Author Name</div>

                                                  <div className="flex py-2 px-5 border-gray-200 self-center font-bold bg-slate-100"> ISBN </div>
                                                  <div className="flex py-2 px-5 self-center bg-slate-100">MOD123X1000002</div>

                                                  <div className="flex py-2 px-5 border-gray-200 self-center font-bold"> Pages </div>
                                                  <div className="flex py-2 px-5 self-center">234</div>

                                                  <div className="flex py-2 px-5 border-gray-200 self-center font-bold bg-slate-100"> Publisher</div>
                                                  <div className="flex py-2 px-5 border-b self-center bg-slate-100">Publisher Namer</div>


                                              </div>
                                          </div>
                                      ) : <></>
                                  }



                              </div>
                          </div>
                      </div>
                  </div>
          }

      </div>
  );
}
