import { jwtDecode } from "jwt-decode";
import React, { useCallback } from "react";
import { axiosPublicInstance } from "../utils/api/axiosInstance";
import { setItem } from "../utils/localStorageUtil";
import showToast from "../utils/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/UserSlice";

const useLoginWithGoogle = () => {
  const dispatch = useDispatch();
  const handleLoginWithGoogle = useCallback((res) => {
    const decodedCredentials = jwtDecode(res.credential);
    const { email, picture, name } = decodedCredentials;
    axiosPublicInstance
      .post("/user/e-com/login", {
        name,
        email,
        photo: picture,
      })
      .then(({ data }) => {
        const { token, refreshToken, user } = data;
        setItem("accessToken", token);
        setItem("refreshToken", refreshToken);
        const { _id, name } = user;
        dispatch(setUser({ _id, name, role: "user", isAuthenticated: true }));
        showToast("Login Success, Happy shopping 🛒😃");
      })
      .catch(({ response }) => {
        const { message } = response.data;
        showToast(message, "error");
      });
  }, []);

  return { handleLoginWithGoogle };
};

export default useLoginWithGoogle;
