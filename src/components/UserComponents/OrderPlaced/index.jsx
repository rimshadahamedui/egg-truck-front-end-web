import React, { useState, useEffect } from "react";

const OrderPlacedMessage = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Hide the message after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [show]);

  return (
    <div
      className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md flex items-center ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      } transition-opacity duration-300 ease-in-out`}
    >
      <svg
        className="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <p>The order has been placed</p>
    </div>
  );
};

export default OrderPlacedMessage;
