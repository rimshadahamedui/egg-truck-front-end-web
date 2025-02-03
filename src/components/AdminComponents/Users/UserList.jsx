import React, { useState } from "react";
import { getDay_month_yearFormated } from "../../../utils/convertTodateString";
import { blockUser } from "../../../utils/api/admin";
import showToast from "../../../utils/showToast";

const UserList = ({
  Sno,
  _id,
  name,
  email,
  createdAt,
  isVerified,
  blocked,
  handleBlockUser,
}) => {
  const [isChecked, setIsChecked] = useState(blocked?.isBlocked);
  const handleCheckboxChange = () => {
    const status = !isChecked;
    if (status) {
      handleBlockUser({ _id, name });
    } else {
      blockUser(_id, "").catch((e) => showToast(e.message, "error"));
    }
    setIsChecked(status);
  };
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{Sno}</td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{email}</td>
      <td className="py-2 px-4 border">{isVerified ? "Yes" : "No"}</td>
      <td className="py-2 px-4 border">
        {getDay_month_yearFormated(createdAt)}
      </td>
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
                isChecked ? "bg-red-500" : "bg-blue-600"
              }`}
            />
            <div
              className={`absolute left-1 top-1 flex size-5 pr-0 items-center justify-center rounded-full bg-white-A700 transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </td>
    </tr>
  );
};

export default UserList;
