import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/UserComponents";
import { successCheck } from "../../../assets/images";
import ConfettiExplosion from "react-confetti-explosion";
import axiosInstance from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slices/CartSlice";
const PaymentSuccess = ({ orderId, isCod = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isCod) {
      axiosInstance
        .post(USER_URL + `/complete-order/${orderId}?success=true`)
        .catch((e) => console.log(e.message));
    }
    dispatch(clearCart());
  }, [orderId]);
  return (
    <div className="relative max-w-md bg-white-A700 p-6  mx-auto shadow-md rounded-md mt-5">
      <ConfettiExplosion duration={3000} width={2000} particleCount={200} />
      <div className="flex justify-center pb-2">
        <img src={successCheck} alt="Order placed" className="size-20" />
      </div>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Order Placed!
        </h3>
        <p className="text-gray-600 my-2">Thank you for purchasing with us.</p>
        <p> Have a great day!</p>
        <div className="flex items-center justify-center gap-2 py-5 text-center">
          <Button
            shape="round"
            color="gray_900"
            className="px-4 py-2 sm:py-6  text-white-A700 font-medium"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </Button>
          <button
            className="px-4 py-2 sm:py-6 bg-indigo-600 hover:bg-indigo-500 text-white-A700 font-medium rounded-[26px]"
            onClick={() => navigate("/orders")}
          >
            Track order
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
    </div>
  );
};

export default PaymentSuccess;
