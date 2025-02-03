import React, { useState } from "react";
import { Text } from "..";
import { Minus, Plus } from "lucide-react";

function Quantity({ quantity, handleUpdateQuantity }) {
  return (
    <div
      className={`flex justify-between items-center gap-4 p-2  bg-gray-50 rounded-[20px]`}
    >
      <button
        type="button"
        className=" rounded-md border border-solid border-gray-200 bg-white-A700_87  opacity-0.5 cursor-pointer "
        onClick={() => handleUpdateQuantity(quantity, "DECREMENT")}
      >
        <Minus />
      </button>
      <div className="flex flex-col pt-px">
        <Text as="p" className="!font-medium">
          {quantity}
        </Text>
      </div>
      <button
        type="button"
        className="  rounded-md border border-solid border-gray-200 bg-white-A700_87  opacity-0.5 cursor-pointer "
        onClick={() => handleUpdateQuantity(quantity, "INCREMENT")}
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
}
export default React.memo(Quantity);
