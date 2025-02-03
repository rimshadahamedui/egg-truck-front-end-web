import React, { useState } from "react";
import axiosInstance from "../../../utils/api/axiosInstance";
import { ADMIN_URL } from "../../../constants";
import showToast from "../../../utils/showToast";
import convertTodateString, {
  getDay_month_yearFormated,
} from "../../../utils/convertTodateString";
import { Link } from "react-router-dom";
import { getTruncated } from "../../../utils";
import { BadgePercent } from "lucide-react";

const ProductRow = ({
  _id,
  name,
  category,
  price,
  stock,
  createdAt,
  isOfferActive,
  isActive,
  thumbnail,
  handleApplyOfferClick,
  handleEditProduct,
}) => {
  const [isChecked, setIsChecked] = useState(isActive);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosInstance
      .delete(ADMIN_URL + `/product/${_id}`)
      .then(() => showToast("Product updated successfully"))
      .catch(({ response }) => showToast(response.data.message, "error"));
  };
  return (
    <tr className="text-center">
      <td className=" py-1 px-4 border">
        <div className="relative">
          <img
            src={thumbnail}
            alt={"Image of " + name}
            className="w-full h-16 rounded-md object-cover"
          />
          {isOfferActive && (
            <span
              className="absolute bg-green-500 top-0 -right-3 p-0.5 rounded-full"
              title="offer-applied"
            >
              <BadgePercent className="text-white-A700 size-3.5" />
            </span>
          )}
        </div>
      </td>
      <td className="py-1 px-4 border">
        {name.length > 25 ? getTruncated(name, 25) : name}
      </td>
      {/* <td className="py-1 px-4 border">{category ?? "N/A"}</td> */}
      <td className="py-1 px-4 border">{price}</td>
      <td className="py-1 px-4 border" style={{ color: !stock && "red" }}>
        {stock || "Out of Stock!"}
      </td>
      <td className="py-1 px-4 border">
        {getDay_month_yearFormated(createdAt)}
      </td>
      <td className="py-1 px-4 border">
        <label className="flex cursor-pointer select-none items-center justify-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`box block h-7 w-12 rounded-full ${
                isChecked ? "bg-blue-500" : "bg-red-600"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex size-5 pr-0 items-center justify-center rounded-full bg-white-A700 transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </td>
      <td className="py-1 px-4 border">
        <button
          onClick={handleEditProduct}
          className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-4 py-1 text-sm font-medium rounded-md shadow transition duration-100"
        >
          Edit
        </button>
      </td>
      <td className="py-1 px-4 border">
        <button
          onClick={handleApplyOfferClick}
          className="px-4 py-1 bg-blue-600 text-white-A700 text-sm font-medium  rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Apply
        </button>
      </td>
      <td className="px-4 border">
        <Link to={`/admin/reviews/${_id}`}>
          {" "}
          <button className="px-4 py-1 bg-slate-600 text-white-A700 text-sm font-medium rounded-md shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
            Show
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ProductRow;
