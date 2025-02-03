import { useState } from "react";
import {
  ADMIN_URL,
  orderStatusLabels,
  validTransitions,
} from "../../../../constants";
import { getLastOrderStatus, getTruncated } from "../../../../utils";
import showToast from "../../../../utils/showToast";
import axiosInstance from "../../../../utils/api/axiosInstance";

const OrderItem = ({
  _id,
  productId,
  productName,
  thumbnail,
  price,
  quantity,
  status,
  orderId,
}) => {
  const [currentStatus, setCurrentStatus] = useState(
    getLastOrderStatus(status).name
  );
  const [lastOrderStatus] = useState(getLastOrderStatus(status).name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (!validTransitions[lastOrderStatus].includes(newStatus)) {
      showToast(
        `Cannot change status from '${currentStatus}' to '${newStatus}'`,
        "info"
      );
      return;
    }
    setCurrentStatus(newStatus);
  };
  const handleUpdateStatus = () => {
    if (currentStatus === lastOrderStatus) {
      showToast("Please change the order status before updating.", "info");
      return;
    }
    setIsSubmitting(true);
    axiosInstance
      .patch(ADMIN_URL + "/order", {
        productId,
        status: currentStatus,
        orderId,
      })
      .then(() =>
        showToast(`Order status for the product ${productName} updated.`)
      )
      .catch((e) => showToast(e.message, "error"))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div
      className="flex sm:flex-col items-center justify-around  gap-8 shadow rounded-md dark:text-white-A700
     p-3 dark:bg-dark-card"
    >
      <div className="size-24 rounded-md ">
        <img
          src={thumbnail}
          alt={productName}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <p className="text-lg font-medium lg:-ml-16">
        {getTruncated(productName, 25)}
      </p>
      <div className="flex gap-5">
        <p>x {quantity}</p>
        <p className="text-gray-500 dark:text-white-A700">${price}</p>
      </div>
      <div className="flex sm:flex-row flex-col gap-5 ">
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          className="bg-gray-50 border p-2.5 pr-8  border-gray-300 text-gray-900 text-sm
    rounded-lg  focus:ring-primary-500 focus:border-primary-500 block  dark:bg-gray-600
    dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 dark:focus:ring-primary-500
  dark:focus:border-primary-500"
        >
          {Object.entries(orderStatusLabels).map(([key, value], i) => (
            <option value={key} key={i}>
              {value}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleUpdateStatus}
          className="flex items-center text-white-A700 bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isSubmitting ? "Submitting" : "Update"}
        </button>
      </div>
    </div>
  );
};
export default OrderItem;
