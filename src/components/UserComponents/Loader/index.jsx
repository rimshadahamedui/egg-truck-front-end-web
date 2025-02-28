import React from "react";

const Loader = ({ className }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        className ? className : "h-screen"
      }`}
    >
      <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
  );
};

export default Loader;
