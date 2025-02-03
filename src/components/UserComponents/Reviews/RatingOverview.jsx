import React, { useMemo } from "react";
import Stars from "../Star";
import { calculateAverageRating, getRatingColor } from "../../../utils";
import { Star } from "lucide-react";

const RatingOverview = ({ rating }) => {
  const { totalRatings, averageRating } = useMemo(() => {
    const totalRatings = Object.values(rating).reduce(
      (sum, value) => sum + value,
      0
    );
    const averageRating = calculateAverageRating(rating);
    return { totalRatings, averageRating };
  }, [rating]);

  const getPercentage = (starCount) => {
    return totalRatings > 0 ? (starCount / totalRatings) * 100 : 0;
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <p className="text-2xl font-medium text-gray-500 dark:text-gray-400">
          {averageRating}
        </p>
        <Star className="size-7 fill-yellow-400 text-yellow-400" />
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {totalRatings} global ratings
      </p>

      <div className="flex flex-col gap-2">
        {Object.keys(rating)
          .map((key, i) => (
            <div className="flex items-start gap-1" key={key + i}>
              <p className=" inline-flex gap-2 text-sm font-medium text-blue-600 dark:text-blue-500">
                {i + 1} <Star className="size-4 text-black fill-black" />
              </p>
              <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-3 rounded-full "
                  style={{
                    width: `${getPercentage(rating[key])}%`,
                    backgroundColor: getRatingColor(key),
                  }}
                />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {rating[key]}
              </p>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default RatingOverview;
