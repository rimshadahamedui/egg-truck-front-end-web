import React from "react";
import { useClearRefinements } from "react-instantsearch";
import { Button } from "../Button";

const ClearFilters = () => {
  const { canRefine, refine } = useClearRefinements({
    includedAttributes: ["category.name", "subcategory.name", "price"],
  });

  return (
    <Button
      shape="round"
      color="gray_900"
      className="font-medium"
      disabled={!canRefine}
      onClick={refine}
    >
      Clear Filters
    </Button>
  );
};

export default ClearFilters;
