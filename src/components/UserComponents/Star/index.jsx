import { Star } from "lucide-react";
import React, { useState } from "react";

const Stars = ({
  selected = 0,
  isEditing = false,
  handleSelection,
  className = "size-6",
}) => {
  const [selectedStars, setSelectedStars] = useState(selected);
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleStarSelection = (i) => {
    if (!isEditing) return;
    setSelectedStars(i);
    handleSelection && handleSelection(i);
  };
  const handleHoveredStars = (i) => {
    if (!isEditing) return;
    setHoveredStars(i);
  };

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          onMouseEnter={() => handleHoveredStars(i + 1)}
          onMouseLeave={() => handleHoveredStars(0)}
          onClick={() => handleStarSelection(i + 1)}
          className={`${className} ${
            !isEditing ? "cursor-default" : "cursor-pointer"
          } ${
            i < selectedStars || i < hoveredStars
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </>
  );
};

export default Stars;
