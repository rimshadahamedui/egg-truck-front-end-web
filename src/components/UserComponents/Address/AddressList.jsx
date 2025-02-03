import { Trash2 } from "lucide-react";
import React from "react";

const AddressList = ({
  _id,
  name,
  address,
  pin,
  phone,
  handleEditAddress,
  handleDeleteAddress,
}) => {
  return (
      <div
          key={_id}
          className={`bg-white rounded-lg shadow-sm p-4 border hover:border-blue-500 border-gray-200
               mb-2`}
      >
      <div className="flex items-start justify-between ">
        <p className="font-medium text-sm text-black p-1 px-2 bg-gray-200 rounded-md">
          {name}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleEditAddress}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteAddress}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 ">{address}</p>
      <div className="flex flex-col gap-px">
        <p className="text-sm text-gray-600 inline-flex items-center gap-1 md:px-1">
          <span className="font-medium text-black">Pin:</span>
          {pin}
        </p>
        <p className="text-sm text-gray-600 inline-flex items-center gap-1 md:px-1">
          <span className="font-medium text-black">Phone:</span>
          {phone}
        </p>
      </div>
    </div>
  );
};

export default AddressList;
