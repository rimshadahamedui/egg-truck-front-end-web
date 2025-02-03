import React, { useState } from "react";
import { useRange } from "react-instantsearch";
const PriceRangeInput = () => {
  const { start, range, canRefine, precision, refine } = useRange({
    attribute: "price",
  });

  const step = 1 / Math.pow(10, precision || 0);

  // Initialize the slider value, if start is valid, otherwise use the range
  const initialValue = start[1] !== Infinity ? start[1] : range.max;

  const [priceRange, setPriceRange] = useState(initialValue);

  const handleSliderChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleSliderRelease = () => {
    refine([range.min, Number(priceRange)]);
  };

  return (
    <div className="relative mb-6">
      <label htmlFor="labels-range-input" className="sr-only">
        Price range
      </label>
      <input
        id="labels-range-input"
        type="range"
        value={priceRange}
        min={range.min}
        max={range.max}
        step={step}
        onChange={handleSliderChange}
        onMouseUp={handleSliderRelease}
        onTouchEnd={handleSliderRelease}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        disabled={!canRefine}
      />

      <div className=" mt-2 flex justify-around gap-4 w-full ">
        <span className="text-sm text-gray-500 dark:text-gray-400 ">
          Min (${range.min})
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-12 -translate-x-1/2 rtl:translate-x-1/2 ">
          ${priceRange}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400  ">
          Max (${range.max})
        </span>
      </div>
    </div>
  );
};
export default PriceRangeInput;
