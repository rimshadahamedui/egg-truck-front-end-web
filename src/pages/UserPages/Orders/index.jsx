import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/UserComponents/Header";
import Footer from "../../../components/UserComponents/Footer";
import { USER_URL } from "../../../constants";
import OrderList from "../../../components/UserComponents/orders/OrderList";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import Loader from "../../../components/UserComponents/Loader";
import {ChevronLeft} from "lucide-react";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axiosInstance(USER_URL + "/orders")
            .then(({ data }) => setOrders(data?.data))
            .catch((e) => showToast(e.message, "error"))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto justify-center items-center min-h-[500px] mb-40">
                <div className="w-3/4 md:w-full mx-auto">
                    <nav className="flex items-center text-sm my-6">
                        <a href="/" className="text-gray-500 hover:text-gray-700">
                            Home
                        </a>
                        <ChevronLeft className="mx-2 h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">Orders</span>
                    </nav>
                    <h1 className="text-4xl font-semibold  my-10">
                        Manage your orders
                    </h1>
                    {orders?.length ? (
                        // Mapping products in each order to show as seperated
                        <div className="space-y-3">
                            {orders.map((order) => (
                                <div className="space-y-3" key={order?._id}>
                                    {order?.products.map((product) => (
                                        <OrderList
                                            {...product}
                                            key={product._id}
                                            orderId={order._id}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : isLoading ? (
                        <Loader />
                    ) : (
                        <h3 className="py-5 font-medium text-lg px-3 text-gray-400">
                            No orders found
                        </h3>
                    )}
                </div>
            </div>
            {/* <div className="relative sm:hidden overflow-x-auto sm:rounded-lg  mx-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-t-[1px] border-b-2  dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {orderHeaders.map(({ header }, i) => (
                <th scope="col" className="px-6 py-3" key={i}>
                  {header}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <OrdersList handleViewAction={handleViewAction} />
            <OrdersList handleViewAction={handleViewAction} />
            <OrdersList handleViewAction={handleViewAction} />
          </tbody>
        </table>
      </div> */}
            {/* {singleOrder.show && (
        <SingleOrder
          handlevisibilty={() =>
            setSingleOrder({ show: false, orderDetails: {} })
          }
        />
      )} */}
            <Footer />
        </>
    );
};

export default OrdersPage;
