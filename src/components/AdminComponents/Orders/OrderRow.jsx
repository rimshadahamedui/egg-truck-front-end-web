import React, { useMemo } from "react";
import convertTodateString, {
  getDay_month_yearFormated,
} from "../../../utils/convertTodateString";
import { getLastOrderStatus } from "../../../utils";
import { darkColor } from "../../../constants";

const OrderRow = ({
  orderId,
  totalAmount,
  paymentMethod,
  createdAt,
  products,
  handleClick,
  sNo,
}) => {
  const [deliveredItemsCount, totalItems] = useMemo(() => {
    let deliveredCount = 0;
    products.forEach(
      (item) =>
        getLastOrderStatus(item.status).name === "delivered" && deliveredCount++
    );
    return [deliveredCount, products.length];
  }, []);
  return (
    <tr
      onClick={handleClick}
      className={`bg-white-A700 border-b  dark:border-gray-700 hover:cursor-pointer font-medium  dark:bg-dark `}
    >
      <td className="py-2 px-4 border">{sNo}</td>
      <td className="py-2 px-4 border">{orderId}</td>
      <td className="py-2 px-4 border">{paymentMethod.toUpperCase()}</td>
      <td className="py-2 px-4 border">{totalAmount}</td>
      <td className="py-2 px-4 border">
        {getDay_month_yearFormated(createdAt)}
      </td>
      <td className="py-2 px-4 border">{`${deliveredItemsCount}/${totalItems} Delivered`}</td>
    </tr>
  );
};

export default OrderRow;
