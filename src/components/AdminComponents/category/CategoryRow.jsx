import React, { useState } from "react";
import { BadgePercent, Pencil } from "lucide-react";
import convertTodateString from "../../../utils/convertTodateString";
import axiosInstance from "../../../utils/api/axiosInstance";
import { ADMIN_URL } from "../../../constants";
import showToast from "../../../utils/showToast";

const CategoryRow = ({
  S_no,
  _id,
  name,
  createdAt,
  isOfferActive,
  isActive,
  handleEdit,
  handleViewSubcategory,
  handleApplyOfferClick,
}) => {
  const [isChecked, setIsChecked] = useState(isActive);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosInstance
      .delete(ADMIN_URL + `/category/${_id}`)
      .then(() => showToast("Category updated successfully"))
      .catch(({ response }) => showToast(response.data.message, "error"));
  };
  return (
    <tr className="text-center">
      <td className="relative py-2 px-4 border">
        {S_no}
        {isOfferActive && (
          <span
            className="absolute bg-green-500 top-1 right-1 p-0.5 rounded-full"
            title="offer-applied"
          >
            <BadgePercent className="text-white-A700 size-3.5" />
          </span>
        )}
      </td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{convertTodateString(createdAt)}</td>
      <td className="py-2 px-4 border">
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
      <td className="py-2 px-4 border">
        <button
          type="button"
          onClick={() => handleViewSubcategory(_id, name)}
          className="py-2 px-4 text-sm font-medium text-green-600 bg-green-100 rounded-md shadow hover:bg-green-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50"
        >
          View
        </button>
      </td>

      <td className="py-2 px-4 border">
        <button
          type="button"
          onClick={() => handleEdit(_id, name)}
          className="inline-flex items-center py-2 px-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md shadow hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <Pencil className="size-5 pr-1" /> Edit
        </button>
      </td>
      <td className="py-2 px-4 border">
        <button
          onClick={() => handleApplyOfferClick("_id")}
          className="px-4 py-2 bg-blue-600 text-white-A700 text-sm font-medium  rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Apply
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
