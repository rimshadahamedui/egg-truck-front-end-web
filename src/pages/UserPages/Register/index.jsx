import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../../components/UserComponents";
import { NavLink, useNavigate } from "react-router-dom";
import LoginWithGoogle from "../../../components/UserComponents/Button/LoginWithGoogle";
import { useFormik } from "formik";
import { registerValidation } from "../../../utils/validations";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import { setItem } from "../../../utils/localStorageUtil";
import useLoginWithGoogle from "../../../Hooks/useLoginWithGoogle";
import { USER_URL } from "../../../constants";

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axiosPublicInstance
        .post(USER_URL + "/register", values)
        .then(({ data }) => {
          showToast("Registration Success, please check your email");
          setItem("otpToken", data.token);
          navigate("/otp");
        })
        .catch(({ response }) => {
          const message = response.data.message;
          showToast(message, "error");
        })
        .finally(() => setIsSubmitting(false));
    },
  });
  const { handleLoginWithGoogle } = useLoginWithGoogle();
  return (
    <>
      <Helmet>
        <title>Secure Register - Access Your Elite Digitals Account</title>
        <meta
          name="description"
          content="Log in to your Elite Digitals account to continue shopping the latest products. New user? Create an account with us for a personalized shopping experience."
        />
      </Helmet>
      <div className="flex w-full flex-col items-center bg-white-A700">
        {/* header section */}
        {/* <Header className="self-stretch" /> */}
        {/* main content section */}
        <div className="container-xs mt-9 px-5 md:px-5 flex justify-center ">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center gap-0">
              <Heading size="lg" as="h1">
                Register
              </Heading>
              <div className="flex flex-col items-center w-full">
                <form
                  className="flex flex-col space-y-3 w-full pb-2"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Heading as="h2">Name</Heading>
                    <div className="border w-full p-1 rounded-md">
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="bg-gray-50  focus:outline-none focus:ring-0 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                        {...formik.getFieldProps("name")}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <Text size="s" className="text-red-500">
                        {formik.errors.name}
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
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
                      <Text size="s" className="text-red-500">
                        {formik.errors.email}
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Heading as="h2">Password</Heading>
                    <div className="border w-full p-1 rounded-md">
                      <input
                        shape="round"
                        type="password"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                        className="bg-gray-50 focus:outline-none focus:ring-0 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                        {...formik.getFieldProps("password")}
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <Text size="s" className="text-red-500">
                        {formik.errors.password}
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Heading as="h2">Confirm Password</Heading>
                    <div className="border w-full p-1 rounded-md">
                      <input
                        shape="round"
                        type="password"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                        className="bg-gray-50 focus:outline-none focus:ring-0 text-sm rounded-xl h-10 block w-full p-2.5   dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                        {...formik.getFieldProps("confirmPassword")}
                      />
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <Text size="s" className="text-red-500">
                          {formik.errors.confirmPassword}
                        </Text>
                      )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    {isSubmitting ? "Submitting" : "Register"}
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
                  <NavLink to="/login" className="text-light_blue-600 mt-1">
                    <span className="text-blue_gray-700">
                      Already a user?&nbsp;
                    </span>
                    Login
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
