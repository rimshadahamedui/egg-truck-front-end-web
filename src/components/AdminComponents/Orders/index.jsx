import React from "react";
import OrderRow from "./OrderRow";
import Loader from "../../UserComponents/Loader";
import { ADMIN_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import useFetchApi from "../../../Hooks/useFetchApi";

const OrdersList = () => {
  const {
    data: orders,
    isLoading,
    setData,
  } = useFetchApi({ url: ADMIN_URL + "/orders" });
  const navigate = useNavigate();

  return (
    <div className="p-5 w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto border bg-white-A700 rounded-2xl">
          <table className="min-w-full dark:bg-dark">
            <thead>
              <tr>
                <th className="py-2 px-4 border">S:no</th>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Payment Method</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orders.length ? (
                <>
                  {orders.map((order, i) => (
                    <OrderRow
                      {...order}
                      key={order._id}
                      sNo={i + 1}
                      handleClick={() => navigate(`/admin/orders/${order._id}`)}
                    />
                  ))}
                </>
              ) : (
                <tr>
                  <td className="text-lg font-medium ">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
