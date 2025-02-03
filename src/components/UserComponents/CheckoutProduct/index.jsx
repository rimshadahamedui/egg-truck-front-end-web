import React, { useCallback, useEffect, useRef, useState } from "react";
import { Heading, Img } from "./..";
import QuantityButton from "../QuantityButton";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/slices/CartSlice";
import axiosInstance from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";
import showToast from "../../../utils/showToast";
import { Trash } from "lucide-react";
import { removeItemFromCart } from "../../../utils/api/cart";
import { Link } from "react-router-dom";

export default function CheckoutProduct({
                                          _id,
                                          name,
                                          stock,
                                          quantity,
                                          price,
                                          thumbnail,
                                          handleRemoveFromCart,
                                          isDisabled = false,
                                        }) {
  const dispatch = useDispatch();
  const handleQuantityChange = useCallback((quantity, action) => {
    let newQuantity = quantity; // Quantity from input field
    if (action === "INCREMENT") {
      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }
    // If new quantity is 0 or less, remove the item from cart
    if (newQuantity <= 0) {
      removeItemFromCart(_id)
          .then(() => {
            showToast("Product removed from cart successfully");
            dispatch(removeFromCart({ _id }));
          })
          .catch((e) => showToast(e.message, "error"));
    } else {
      if (newQuantity > stock) {
        showToast(
            "We apologize, but there is not enough stock available.",
            "dark"
        );
        return;
      }
      if (newQuantity > 5) {
        showToast(
            "Oops! You've reached the maximum limit of 5 units for this product.",
            "dark"
        );
        return;
      }

      axiosInstance
          .patch(USER_URL + `/cart`, { productId: _id, count: newQuantity })
          .then(() => {
            dispatch(updateQuantity({ _id, quantity: newQuantity }));
            showToast("Quantity updated successfully");
          })
          .catch((e) => showToast(e.message, "error"));
    }
  }, []);

  return (
      <div className={`flex border-gray-200 mb-2 border-b border-solid last:border-none`}>
        <div className=" rounded-[12px] p-3">
          <Link to={`/product/${_id}`}>
            <img
                src={thumbnail}
                alt={`${name} thumbnail`}
                className="min-h-[130px] max-h-[130px]  min-w-[130px] max-w-[130px] md:min-w-[80px] md:min-h-[80px] md:max-h-[80px] md:max-w-[80px] rounded-[12px] object-cover md:h-auto"
                key={Date.now()}
            />
          </Link>
        </div>

        <div className="flex md:flex-wrap w-full">
          <div className="p-3 me-auto">
            <h6 className="text-md self-center py-3 md:text-sm md:w-full">{name}</h6>
          </div>

          <div className="p-3 my-auto ms-auto">
            <h6 className="text-xl text-center self-center ms-auto font-bold mb-4">${price}</h6>

            {isDisabled ? <>Qty : <b>{quantity}</b> </> :   <QuantityButton quantity={quantity} handleUpdateQuantity={handleQuantityChange} />}

          </div>

          {!isDisabled && (
              <button
                  onClick={() => handleRemoveFromCart(_id)}
                  className="text-red-400 bg-red-100 hover:bg-red-200 p-2 text-sm mx-4 font-medium rounded-md shadow transition duration-100 w-fit h-fit my-auto"
              >
                <Trash className="size-3" />
              </button>
          )}
        </div>
      </div>
  );
}
