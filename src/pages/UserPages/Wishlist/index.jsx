import React, { useEffect, useState } from "react";
import Header from "../../../components/UserComponents/Header";
import { ChevronLeft, Heart } from "lucide-react";
import axiosInstance from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";
import showToast from "../../../utils/showToast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/CartSlice";
import WishlistItem from "../../../components/UserComponents/Wishlist/WishlistItem";
import ConfirmationModal from "../../../components/UserComponents/dialogue/ConfirmationModal";
import { removeItemFromWishlist } from "../../../utils/api/product";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState({
    show: false,
    _id: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    axiosInstance(USER_URL + "/wishlist")
      .then(({ data }) => setWishlist(data.data))
      .catch((e) => showToast(e.message, "error"));
  }, []);

  const handleAddtoCart = (product) => {
    if (cart.length >= 10) {
      showToast(
        "Sorry, you can only add up to 10 product to your cart.",
        "dark"
      );
      return;
    }
    if (isSubmitting) return; // prevent double submission
    const payload = {
      _id: product._id,
      name: product?.name,
      thumbnail: product?.thumbnail,
      stock: product?.stock,
      quantity: 1,
      price: product?.price,
    };
    setIsSubmitting(true);

    axiosInstance
      .post(USER_URL + "/cart", { productId: product?._id })
      .then(() => {
        dispatch(addToCart(payload));
        showToast("Item added to cart successfully");
      })
      .catch((e) => showToast(e.message, "error"));
    removeFromWishlist(product._id, true);
  };

  const removeFromWishlist = (productId, isAddingTocart = false) => {
    removeItemFromWishlist(productId)
      .then(() => {
        setWishlist(wishlist.filter((product) => product._id !== productId));
        !isAddingTocart && showToast("Item removed from wishlist successfully");
      })
      .catch((e) => showToast(e.message, "error"))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <nav className="flex items-center text-sm mb-6">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <ChevronLeft className="mx-2 h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Wishlist</span>
        </nav>

        <div className="flex justify-between items-center mb-10 mt-10">
          <h1 className="text-3xl font-bold flex items-center">My Wishlist</h1>
          <span className="text-lg font-medium text-gray-600">
            {wishlist.length} items
          </span>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <WishlistItem
              {...item}
              key={item._id}
              handleAddtoCart={() => handleAddtoCart(item)}
              handleDeleteFromWishlist={() =>
                setConfirmation({ show: true, _id: item._id })
              }
            />
          ))}
        </div>

        {wishlist.length === 0 && (
          <div className="text-center py-12">
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-4">
              Add items you love to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <button
              className=" bg-gray-900 text-white-A700 px-4 rounded-[26px]  py-2 font-medium sm:px-5 cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
      {confirmation.show && (
        <ConfirmationModal
          handleDeleteFalse={() => setConfirmation({ show: false, _id: null })}
          handleDeleteTrue={() => {
            removeFromWishlist(confirmation._id);
            setConfirmation({ show: false, _id: null });
          }}
        />
      )}
    </>
  );
};

export default WishlistPage;
