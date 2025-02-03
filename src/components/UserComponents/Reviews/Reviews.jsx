import FeedbackCard from "../../AdminComponents/Feedback/FeedbackCard.jsx";
import RatingOverview from "./RatingOverview.jsx";

const UserReviews = ({ reviews, rating }) => {
  return reviews.length ? (
    <div className="flex flex-col justify-center gap-5 mt-4" id="reviews">
      <h2 className="text-2xl text-gray-800 font-semibold ">
        Reviews & Ratings
      </h2>
      <RatingOverview rating={rating} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {reviews.map((review, index) => (
          <FeedbackCard key={index} {...review} isUser={true} />
        ))}
      </div>
    </div>
  ) : null;
};

export default UserReviews;
