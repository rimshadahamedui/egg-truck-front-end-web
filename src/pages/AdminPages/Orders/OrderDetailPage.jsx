import React from "react";
import Header from "../../../components/AdminComponents/Header";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import OrderDetail from "../../../components/AdminComponents/Orders/OrderDetails/";

const OrderDetailPage = () => {
  return (
    <div className="flex h-full">
      <OrderDetail />
    </div>
  );
};

export default OrderDetailPage;
