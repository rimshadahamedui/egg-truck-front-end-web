import React, { useState } from "react";
import Header from "../../../components/UserComponents/Header";
import Footer from "../../../components/UserComponents/Footer";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import { LoaderCircle } from "lucide-react";
import * as Yup from "yup";
import { Text } from "../../../components/UserComponents";
import showToast from "../../../utils/showToast";
import { USER_URL } from "../../../constants";

const SetNewPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(/[a-z]/, "Password must contain lowercase letters.")
        .matches(/[A-Z]/, "Password must contain uppercase letters.")
        .matches(/\d/, "Password must contain at least one digit.")
        .min(8, "Password must contain at least 8 characters")
        .max(15, "Password must be less than or equal to 15 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Password is not matching"),
    }),
    onSubmit: ({ password }) => {
      setIsSubmitting(true);
      axiosPublicInstance
        .patch(
          USER_URL + `/forgot-password`,
          { newPassword: password },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => {
          showToast("Password is reseted, Please login");
          navigate("/login");
        })
        .catch((e) => {
          const { status, response } = e;
          if (status == 401) {
            showToast(
              "The reset token has expired. Please request a new one by clicking the Resend Button.",
              "error",
              {
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnFocusLoss: false,
              }
            );
            return;
          }
          showToast(response.data.message, "error");
        })
        .finally(() => setIsSubmitting(false));
    },
  });

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto border border-gray-100 shadow-md rounded-lg py-6 p-4 mt-5">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-xl font-semibold text-gray-800 mb-3">
            Set your Password
          </h1>
          <form
            className="flex flex-col gap-6 w-full pb-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col items-start space-y-1 w-full">
              <label
                htmlFor="Password"
                className="text-sm font-medium text-gray-800"
              >
                Password
              </label>
              <div className="border w-full p-1 rounded-md px-2 flex">
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="bg-gray-50 flex-grow focus:outline-none focus:ring-0 text-sm pr-20 rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 "
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <Text className="text-red-500" size="s">
                  {formik.errors.password}
                </Text>
              )}
            </div>
            <div className="flex flex-col items-start space-y-1">
              <label
                htmlFor="Confirm Password"
                className="text-sm font-medium text-gray-800"
              >
                Confirm Password
              </label>
              <div className="border w-full p-1 rounded-md">
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="bg-gray-50 focus:outline-none focus:ring-0 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                  {...formik.getFieldProps("confirmPassword")}
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.confirmPassword}
                  </Text>
                )}
            </div>

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
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 font-medium"
            >
              Resend ?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetNewPassword;
