import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../../utils/validations";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import { setItem } from "../../../utils/localStorageUtil";
import showToast from "../../../utils/showToast";
import { Text } from "../../../components/UserComponents";
import { ADMIN_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/UserSlice";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axiosPublicInstance
        .post(ADMIN_URL + "/login", values)
        .then(({ data }) => {
          setItem("accessToken", data?.token);
          // setItem("refreshToken", data?.refreshToken);
          const { id, role } = jwtDecode(data?.token);
          dispatch(
            setUser({ _id: id, role, name: "Admin", isAuthenticated: true })
          );
          showToast("Login Success, Welcome back Admin!");
          navigate("/admin");
        })
        .catch(({ response }) => {
          const message = response.data.message;
          const statusCode = response.request.status;
          if (statusCode === 400) {
            showToast("Invalid credentials", "error");
          } else {
            showToast(message, "error");
          }
        })
        .finally(() => setIsSubmitting(false));
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="border w-full p-1 rounded-md">
              <input
                type="email"
                placeholder="john@example.com"
                className="bg-gray-50 focus:outline-none focus:ring-0 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <Text className="text-red-500" size="s">
                {formik.errors.email}
              </Text>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="border w-full p-1 rounded-md">
              <input
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                className="bg-gray-50 focus:outline-none focus:ring-0 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <Text className="text-red-500" size="s">
                {formik.errors.password}
              </Text>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
