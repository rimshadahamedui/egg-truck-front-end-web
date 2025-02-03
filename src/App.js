import React, { useEffect } from "react";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useScrollToTop from "./Hooks/useScrollToTop";
import axiosInstance from "./utils/api/axiosInstance";
import { USER_URL } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromServer } from "./redux/slices/CartSlice";
import useSyncDarkMode from "./Hooks/useSyncDarkMode";

function App({ isAdmin = false }) {
  const { user } = useSelector((state) => state.user);
  useScrollToTop();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.role !== "admin" && user.isAuthenticated) {
      axiosInstance
        .get(USER_URL + "/cart")
        .then(({ data }) => {
          dispatch(loadCartFromServer(data.data));
        })
        .catch((e) => "");
    }
  }, [user]);
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
}
export default App;
