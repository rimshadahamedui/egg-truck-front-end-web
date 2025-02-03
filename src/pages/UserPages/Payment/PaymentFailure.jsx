import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/UserComponents";
import axiosInstance from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";

const PaymentFailure = ({ orderId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .post(USER_URL + `/complete-order/${orderId}?success=false`)
      .catch((e) => console.log(e.message));
  }, [orderId]);
  return (
    <div className="relative max-w-md bg-white-A700 p-6 mx-auto shadow-md rounded-md mt-5">
      <svg
        fill="#dc2626"
        viewBox="0 -8 528 528"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#dc2626"
        className="w-16 h-16 mx-auto my-6"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <title>fail</title>
          <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z" />
        </g>
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Failed
        </h3>
        <p className="text-gray-600 my-2">
          Unfortunately, your payment could not be processed.
        </p>
        <p className="text-gray-600 my-2">
          Don't worry, your order is still safe. You can try again or track your
          order for more details.
        </p>
        <div className="flex items-center justify-center gap-2 py-5 text-center">
          <button
            shape="round"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white-A700 font-medium rounded-[26px]"
            onClick={() => navigate("/orders")}
          >
            Track Order
          </button>
          {/* <Button
            shape="round"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white-A700 font-medium"
            onClick={() => navigate("/payment-retry")}
          >
            Try Again
          </Button> */}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>
    </div>
  );
};

export default PaymentFailure;
