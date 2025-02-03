import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackCard from "../../../components/AdminComponents/Feedback/FeedbackCard";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";

const Index = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axiosPublicInstance(USER_URL + `/feedback?productId=${productId}`)
      .then(({ data }) => setReviews(data.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    navigate("*");
    return;
  }
  return (
    <>
      <div className="flex h-full">
        <div className={`p-8 ${reviews.length > 6 ? "h-full" : "h-screen"}`}>
          <h1 className="text-2xl font-semibold">Reviews</h1>

          <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mt-5 p-2 ">
            {reviews.length ? (
              <>
                {reviews.map((review, index) => (
                  <FeedbackCard key={index} {...review} />
                ))}
              </>
            ) : (
              <h2 className="text-lg text-gray-500 text-center">
                No reviews found
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
