import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import convertTodateString from "../../../utils/convertTodateString";
import {
  capitalizeInitial,
  getLastOrderStatus,
  getStatusColor,
  getTruncated,
} from "../../../utils";

const OrderList = ({
                     _id,
                     productId,
                     productName,
                     quantity,
                     price,
                     status,
                     thumbnail,
                     orderId,
                   }) => {
  const navigate = useNavigate();
  const lastOrderStatus = getLastOrderStatus(status);
  const handleClick = () =>
      navigate(`/orders/${orderId}?productId=${productId}`, { replace: true });
  return (
      <div
          key={_id}
          className="flex sm:flex-col justify-between lg:items-center gap-4 lg:gap-5 bg-transparent hover:cursor-pointer
        rounded-lg p-4 border border-gray-200 "
          onClick={handleClick}
      >
        <div  className="flex sm:flex-col gap-2 w-full">
          <div className="flex">
            <img src={thumbnail}
                 alt={productName}
                 className="h-24 w-24 object-contain rounded-md"
                 onClick={(e) => {
                   e.stopPropagation();
                   navigate(`/product/${productId}`);
                 }}
            />

            <div className="mx-2 flex flex-col">
              <p className="text-black font-semibold text-md md:self-start md:text-sm">
                {productName?.length > 35
                    ? getTruncated(productName, 35)
                    : productName}
              </p>
              <span className="md:text-sm md:w-full mt-2">Qty: <span className="font-bold"> {quantity} </span></span>
              <span className="md:w-full md:text-sm">Price: <span className="font-bold">${price}</span>  </span>
              <p className="md:text-sm text-gray-500 w-full ">Purchased: {convertTodateString(status?.initiated?.time)}</p>

            </div>


          </div>


        </div>
        <div className=" flex flex-col gap-2 w-full lg:w-1/2 ms-auto">

          <p
              className="font-semibold md:mx-auto ms-auto text-center px-5"
              style={{ color: getStatusColor(lastOrderStatus?.name) }}
          >
            {capitalizeInitial(lastOrderStatus?.name) +
            lastOrderStatus?.name.slice(1)}
          </p>
          {status?.delivered?.status && (
              <button
                  className="inline-flex gap-2 items-center rounded-[12px] py-2 font-medium md:mx-auto ms-auto border-thdark border-[2px] px-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/orders/${orderId}?productId=${productId}#rating`, {
                      replace: true,
                    });
                  }}
              >
                Rate & Review Product <Star stroke="0" className="size-5 fill-blue-500" />
              </button>
          )}
        </div>
      </div>
  );
};

export default memo(OrderList);
