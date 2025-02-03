import React, { useEffect, useState } from "react";
import { getDay_month_yearFormated } from "../../../../utils/convertTodateString";
import Loader from "../../../UserComponents/Loader";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { ADMIN_URL } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import OrderItem from "./OrderItem";
const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axiosInstance(ADMIN_URL + `/order/${orderId}`)
      .then(({ data }) => setOrder(data.data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    navigate(-1);
    return;
  }

  return (
    <div className={`p-5 w-full bg-gray-50  dark:bg-dark`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-1/3 py-3 px-5 shadow rounded-md space-y-1 bg-white-A700 dark:bg-dark-card">
              <h2 className="text-xl font-semibold">Summary</h2>
              <div className="flex items-center gap-5">
                <span className="font-normal text-base  text-gray-400">
                  OrderId:
                </span>
                <p className="text-sm">{order?.orderId}</p>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-normal text-base  text-gray-400">
                  Date:
                </span>
                <time className="text-sm">
                  {getDay_month_yearFormated(order?.createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-normal text-base  text-gray-400">
                  Total:
                </span>
                <p className="text-sm">${order?.totalAmount}</p>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-normal text-base  text-gray-400">
                  Payment Method
                </span>
                <p className="text-sm uppercase">{order?.paymentMethod}</p>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-normal text-base  text-gray-400">
                  Payment Status
                </span>
                <p className="text-sm">{order?.checkoutId?.status}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 ">
              <div className="bg-white-A700 py-3 px-3 w-full shadow rounded-md max-w-2xl space-y-2 dark:bg-dark-card">
                <h1 className="text-lg font-medium">Shipping Address</h1>
                <p>{order?.address?.name}</p>
                <p>
                  {order?.address?.address}, pin: {order?.address?.pin}
                </p>
                <p>{order?.address?.phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 ">
            <h1 className="text-lg font-medium">Products</h1>
            <div className="flex flex-col gap-4 ">
              {order?.products.map((item) => (
                <OrderItem {...item} key={item._id} orderId={order?._id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
