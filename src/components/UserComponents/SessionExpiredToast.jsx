import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { logout } from "../../utils";
import { toast } from "react-toastify";

const SessionExpiredToast = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    toast.dismiss();
    logout();
    navigate(pathname.includes("/admin") ? "/admin/login" : "/login");
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 p-4 bg-white  rounded-lg max-w-xs mx-auto">
      <p className="font-semibold text-gray-600 text-center">
        Your session has expired. Please log in again.
      </p>
      <button
        onClick={handleLoginRedirect}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white-A700 font-medium rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Go to Login
      </button>
    </div>
  );
};

export default SessionExpiredToast;
