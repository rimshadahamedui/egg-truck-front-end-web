import { useState } from "react";
import AddReplyModal from "./dialogue/AddReplyModal";
import { getDay_month_yearFormated } from "../../../utils/convertTodateString";
import Stars from "../../UserComponents/Star";

const FeedbackCard = ({
  feedbackId,
  name,
  createdAt,
  rating,
  comment,
  replies = [],
  isUser = false,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  return (
    <div
      className={`border w-full rounded-lg p-4 shadow-sm sm:col-span-3 space-y-2 ${
        showReply && "self-start"
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <span className="bg-gray-800 text-white-A700 text-xs px-2 py-1 rounded">
          Verified
        </span>
      </div>
      {createdAt && (
        <div className="flex justify-end">
          <p className="text-sm text-gray-500">
            {getDay_month_yearFormated(createdAt)}
          </p>
        </div>
      )}
      <div className="flex justify-between gap-2">
        <div className="flex gap-1">
          <Stars selected={rating} className="size-5" />
        </div>
        {replies.length ? (
          <button
            onClick={() => setShowReply(!showReply)}
            className="text-sm text-blue-500 font-medium"
          >
            {showReply ? "Hide" : "Show"}
          </button>
        ) : !isUser ? (
          <button
            onClick={() => setShowReplyModal(true)}
            className="text-sm text-blue-500 font-medium"
          >
            Reply
          </button>
        ) : null}
      </div>

      <p className="text-sm text-gray-700 break-words">{comment}</p>
      {replies.length && showReply ? (
        <div className="space-y-2">
          <span className="text-sm bg-gray-400 text-white-A700 p-[2px] rounded-sm font-normal">
            Admin
          </span>
          <p className="break-words text-sm text-gray-600">
            {replies[0].comment}
          </p>
        </div>
      ) : null}
      {showReplyModal && (
        <AddReplyModal
          feedbackId={feedbackId}
          handlevisibilty={() => setShowReplyModal(false)}
        />
      )}
    </div>
  );
};

export default FeedbackCard;
