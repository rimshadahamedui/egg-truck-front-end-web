import React, { useState } from "react";
import Header from "../../../components/UserComponents/Header";
import Footer from "../../../components/UserComponents/Footer";
import { KeyRound, LoaderCircle } from "lucide-react";
import { useFormik } from "formik";
import { USER_URL } from "../../../constants";
import { Button, Text } from "../../../components/UserComponents";
import showToast from "../../../utils/showToast";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      axiosPublicInstance
        .post(USER_URL + `/forgot-password`, values)
        .then(() => {
          showToast("Reset link shared to your email");
        })
        .catch(({ response }) => showToast(response.data.message, "error"))
        .finally(() => setIsSubmitting(false));
    },
  });
  return (
    <>
      <Header />
      <div className="mx-auto max-w-md rounded-lg shadow-lg py-6 px-8 my-8 border border-gray-200 bg-white-A700 space-y-4">
        <div className="flex items-center gap-1">
          <h2 className="text-lg font-semibold text-gray-800 ">
            Forgot password
          </h2>
          <KeyRound className="size-5 " />
        </div>
        <p className="text-sm font-medium text-gray-500">
          Enter the email to recover password
        </p>
        <form className="space-y-2 mt-1" onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="text-sm font-medium text-gray-800">
            Email
          </label>
          <div className="border  rounded-md pl-2">
            <input
              type="text"
              className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl h-10 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 "
              placeholder="johndoe@gmail.com"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <Text className="text-red-500" size="s">
              {formik.errors.email}
            </Text>
          )}
          <div className="flex justify-center items-center pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-20 py-2  inline-flex gap-1 text-white-A700 font-medium bg-gray-700 hover:bg-gray-800 rounded-3xl  transition duration-75 "
            >
              {isSubmitting ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-end">
          <Link to="/login" className="text-sm text-gray-400 font-medium">
            Go back to login
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
