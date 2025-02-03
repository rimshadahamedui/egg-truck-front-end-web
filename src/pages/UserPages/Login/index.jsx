import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../../components/UserComponents";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "../../../utils/validations";
import LoginWithGoogle from "../../../components/UserComponents/Button/LoginWithGoogle";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import useLoginWithGoogle from "../../../Hooks/useLoginWithGoogle";
import { setItem } from "../../../utils/localStorageUtil";
import { USER_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/UserSlice";
import Header from "../../../components/UserComponents/Header";
import Footer from "../../../components/UserComponents/Footer";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axiosPublicInstance
          .post(USER_URL + "/password-login", values)
          .then(({ data }) => {
            const { token, refreshToken, user } = data;
            setItem("accessToken", token);
            setItem("refreshToken", refreshToken);
            const { _id, name } = user;
            dispatch(setUser({ _id, name, role: "user", isAuthenticated: true }));
            showToast("Login Success, Happy shopping 🛒😃");
            navigate("/");
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

  const { handleLoginWithGoogle } = useLoginWithGoogle();
  return (
      <>
        <Helmet>
          <title>Secure Login - Access Your Elite Digitals Account</title>
          <meta
              name="description"
              content="Log in to your Elite Digitals account to continue shopping the latest products. New user? Create an account with us for a personalized shopping experience."
          />
        </Helmet>
        <Header/>
        {/* main content section */}

        <div className="bg-light-f6">
          <div className="container py-10 mx-auto">
            <div className="bg-slate-50 rounded-2xl shadow-lg p-8 w-2/4 md:w-full mx-auto">
              <div className="flex flex-col items-center gap-0">
                <h1 className="text-4xl font-bold mb-10">Login</h1>
                <div className="flex flex-col items-center w-full">
                  <form
                      className="flex flex-col gap-6 w-full pb-2"
                      onSubmit={formik.handleSubmit}
                  >
                    <div className="flex flex-col items-start space-y-1 w-full">
                      <Heading as="h2">Email</Heading>
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
                    <div className="flex flex-col items-start space-y-1 w-full">
                      <Heading as="h2">Password</Heading>
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
                        className="text-white-A700 bg-thdark hover:bg-thlight focus:outline-none disabled:opacity-50 focus:ring-4 focus:ring-gray-300 text-lg font-bold rounded-lg px-5 py-2.5 me-2 mb-2"
                    >
                      Login
                    </button>
                  </form>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex bg-white px-4 py-1 rounded-md shadow-inner">
                      <Text size="s" as="p" className="font-medium">
                        OR
                      </Text>
                    </div>
                    <LoginWithGoogle
                        handleLoginWithGoogle={handleLoginWithGoogle}
                    />
                    <Link to="/register" className="text-light_blue-600 mt-1">
                      <span className="text-blue_gray-700">New user?&nbsp;</span>
                      Create an account
                    </Link>
                    <div className="flex justify-end">
                      <Link
                          to="/forgot-password"
                          className="text-sm text-gray-400 font-medium"
                      >
                        Forgot password ?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
  );
}
