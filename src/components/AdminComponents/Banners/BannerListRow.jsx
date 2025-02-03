import { Pencil } from "lucide-react";
import React, { useState } from "react";

const BannerListRow = ({
  Sno,
  _id,
  image,
  name,
  isActive,
  startDate,
  endDate,
  handleEdit,
}) => {
  const [isChecked, setIsChecked] = useState(isActive);

  const handleCheckboxChange = () => {
    const checkedStatus = !isChecked;
    setIsChecked(checkedStatus);
    //   axiosInstance
    //     .patch(ADMIN_URL + `/offer/${_id}`, { isActive: checkedStatus })
    //     .catch(({ reponse }) => showToast(reponse.data.message, "error"));
  };
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{Sno}</td>

      <td className="py-2 px-4 border size-28">
        <img
          src={image}
          alt={name + " banner"}
          className="w-full h-16 rounded-md object-cover"
        />
      </td>
      <td className="py-2 px-4 border">{name}</td>
      {/* <td className="py-2 px-4 border">{startDate || "N/A"}</td>
      <td className="py-2 px-4 border">{endDate || "N/A"}</td> */}
      {/* <td className="py-2 px-4 border">
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
            />
            <div
              className={`absolute left-1 top-1 flex size-5 pr-0 items-center justify-center rounded-full bg-white-A700 transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </td> */}

      <td className="py-2 px-4 border">
        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center py-2 px-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md shadow hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <Pencil className="size-5 pr-1" /> Edit
        </button>
      </td>
    </tr>
  );
};

export default BannerListRow;
