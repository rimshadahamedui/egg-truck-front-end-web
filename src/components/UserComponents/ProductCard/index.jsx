import React, { useState } from "react";
import { Text, Heading, Img } from "../../UserComponents";
import { FullHeartSVG, HeartOutlineSVG } from "../../UserComponents/svg";
import { useNavigate } from "react-router-dom";
import showToast from "../../../utils/showToast";
import { useSelector , useDispatch } from "react-redux";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../utils/api/product";
import { getTruncated } from "../../../utils";
import { Eye, Heart, HeartOff, ShoppingCartIcon } from "lucide-react";
import { addToCart } from "../../../redux/slices/CartSlice";
import axiosInstance, {
  axiosPublicInstance,
} from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";
import QuickViewProduct from "./quickviewproduct";



export default function ProductCard({

                                      _id,
                                      name,
                                      thumbnail,
                                      price,
                                      averageRating,
                                      actualPrice,
                                      isProductInWishlist,
                                      showWishlistIcon = true,
                                      stock,
                                      qwModalOpenState,
                                      showQuick,
                                      ...props
                                    }) {
  const [wishlistStatus, setWishlistStatus] = useState(isProductInWishlist);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [quickViewOpen, SetQuickViewOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleWishlistChange = () => {
    setIsSubmitting(true);
    // If wishliststatus is true, then remove the item from wishlist or add to wishlist
    if (wishlistStatus) {
      removeItemFromWishlist(_id)
          .then(() => {
            showToast("Item removed from wishlist");
            setWishlistStatus(!wishlistStatus);
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      return;
    }

    addItemToWishlist(_id)
        .then(() => {
          showToast("Item Added to wishlist");
          setWishlistStatus(!wishlistStatus);
        })
        .catch((e) => showToast(e.message, "error"))
        .finally(() => setIsSubmitting(false));
  };

  const handleAddtoCart = () => {
    if (!user?.isAuthenticated) {
      navigate(`/login?redirect=/product/${_id}`);
      return;
    }

    const payload = {
      _id: _id,
      name: name,
      thumbnail: thumbnail,
      stock: stock,
      quantity: 1,
      price: price,
    };
    setIsSubmitting(true);
    axiosInstance
        .post(USER_URL + "/cart", { productId: _id })
        .then(() => {
          dispatch(addToCart(payload));
          showToast("Item added to cart successfully");
        })
        .catch((e) => showToast(e.message, "error"))
        .finally(() => setIsSubmitting(false));
  };

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  const OpenProductModal = (pid) => {
    qwModalOpenState(true , pid);
  }
  return (
      <div {...props} className={`${props.className} flex flex-col gap-5 mx-2  mb-4 prod-item ${isHovering ?  'hovering-eff' : ''}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => {setIsHovering(false)}}>
        <div className="relative h-[270px] w-full  self-center rounded-[16px] bg-gray-50 overflow-hidden">
          <div className="flex thumb-h h-full w-[200%] max-w-full min-w-full  rounded-xl object-cover  hover:cursor-pointer image-scale">
            <Img src={thumbnail} alt={`${name} Image`} className="w-full object-cover max-w-full min-w-full" onClick={() => handleClick}/>
            <Img src={thumbnail} alt={`${name} Image`} className="w-full object-cover max-w-full min-w-full" onClick={() => handleClick}/>
          </div>
          {
            isHovering ?
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-slate-200 bg-opacity-50 rounded-xl">

                  <div className="m-auto">

                    <button onClick={handleWishlistChange} disabled={isSubmitting} className="mx-1 p-2 bg-thlight rounded-full disabled:cursor-not-allowed disabled:opacity-50" >
                      {wishlistStatus ? (
                          <Heart color="white" fill="white" />
                      ) : (
                          <Heart color="white" />
                      )}
                    </button>


                    <button onClick={handleAddtoCart} disabled={isSubmitting} className="mx-1 p-2 bg-thlight rounded-full disabled:cursor-not-allowed disabled:opacity-50" >
                      <ShoppingCartIcon color="white" />
                    </button>

                    {
                      showQuick ? (
                          <button onClick={() => OpenProductModal(_id)} className="mx-1 p-2 bg-thlight rounded-full disabled:cursor-not-allowed disabled:opacity-50" >
                            <Eye color="white" />
                          </button>
                      ) : <></>
                    }



                  </div>

                </div> : <></>
          }
        </div>
        <div className="flex items-start  gap-3 self-stretch">
          <div className="flex flex-col items-start gap-1 px-5 pb-6">
            <div className="flex gap-1">
              <Img  src="/images/star.svg" alt="rating image" className="h-[20px] w-[20px]" />
              <div className="flex">
                <Text size="s" as="p" className="font-semibold">{averageRating > 0 ? averageRating.toFixed(1) : 4.5}</Text>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex hover:cursor-pointer" onClick={handleClick}>
                <Heading as="h6" className="font-light text-s min-h-12 max-w-[200px]">{name?.length > 32 ? getTruncated(name, 32) : name}</Heading>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex self-start">
                <Heading as="h6" className="text-lg font-bold">${price}</Heading>
                {price !== actualPrice && (
                    <Text size="s" as="p" className="line-through">
                      {actualPrice}
                    </Text>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
  );
}
