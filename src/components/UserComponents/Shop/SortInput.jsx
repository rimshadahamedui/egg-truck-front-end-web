import React from "react";
import { useSortBy } from "react-instantsearch";
import { RadioGroup } from "../RadioGroup";
import { Radio } from "../Radio";

const SortInput = () => {
  const { currentRefinement, options, refine } = useSortBy({
    items: [
      { label: "Low - High", value: "products_price_asc" },
      { label: "High - Low", value: "products_price_desc" },
      { label: "Default", value: undefined },
    ],
  });
  return (
    <RadioGroup
      name="sortoptions"
      className="flex flex-col gap-2"
      onChange={(value) => refine(value)}
      value={currentRefinement}
    >
      {options.map((item) => (
        <Radio
          key={item.label}
          value={item.value}
          label={item.label}
          className="mr-[26px] flex-1 gap-3 p-px text-sm text-blue_gray-700 md:mr-0"
        />
      ))}
    </RadioGroup>
  );
};

export default SortInput;
