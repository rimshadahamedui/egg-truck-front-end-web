import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import Header from "../../../components/UserComponents/Header";
import Footer from "../../../components/UserComponents/Footer";
import {
  Heading,
  Input,
  Button,
  Text,
} from "../../../components/UserComponents";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem, setItem } from "../../../utils/localStorageUtil";
import axios from "axios";
import { validateOtp } from "../../../utils/validations";
import { axiosPublicInstance } from "../../../utils/api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import showToast from "../../../utils/showToast";

function OTP() {
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(59);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // OTP resend timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOtpTimer((prev) => (prev === 0 ? prev : prev - 1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [otpTimer]);

  const handleVerify = () => {
    const token = getItem("otpToken");
    if (!token) {
      navigate("/login");
      return;
    }
    const isValidOtp = validateOtp(otp);
    if (!isValidOtp) {
      setError("Invalid OTP ");
      return;
    } else {
      setError(null);
      setIsSubmitting(true);
      axiosPublicInstance
        .post(
          "/user/e-com/otp",
          { otp },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => {
          showToast("Email verified, Please login");
          navigate("/login");
          removeItem("otpToken");
        })
        .catch(({ response }) => {
          const { message } = response.data;
          if (response.request.status === 401) {
            showToast("Otp timed out, please try resend OTP", "error");
          } else {
            showToast(message, "error");
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };
  const handleResendOtp = () => {
    const token = getItem("otpToken");
    const decodedToken = jwtDecode(token);

    axiosPublicInstance
      .patch("/user/e-com/otp", { email: decodedToken?.email })
      .then(({ data }) => {
        setItem("otpToken", data.token);
        showToast("Otp sent to email");
        setOtp("");
        setOtpTimer(59);
      })
      .catch(({ response }) => {
        showToast(response.data.message, "error");
      })
      .finally(() => setIsSubmitting(false));
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "3px",
    width: "100%",
  };
  const inputStyle = {
    width: "3rem", // Adjust as needed for size
    height: "3rem", // Adjust as needed for size
    border: "1px solid #d1d5db", // Equivalent to Tailwind's border-gray-300
    borderRadius: "0.25rem", // Equivalent to Tailwind's rounded
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", // Equivalent to Tailwind's shadow-md
    textAlign: "center",
  };

  return (
    <>
      <Helmet>
        <title>Secure Login - Access Your 369 eCommerce Account</title>
        <meta
          name="description"
          content="Log in to your 369 eCommerce account to continue shopping the latest products. New user? Create an account with us for a personalized shopping experience."
        />
      </Helmet>
      <div className="flex w-full flex-col items-center bg-white-A700">
        {/* header section */}
        <Header className="self-stretch" />
        {/* main content section */}
        <div className="container-xs mt-9 px-5 md:px-5 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md ">
            <div className="flex flex-col items-center gap-12">
              <a href="Login" target="_blank" rel="noreferrer">
                <Heading size="lg" as="h1">
                  Enter OTP
                </Heading>
              </a>

              <div className="flex flex-col items-center gap-2 w-full px-4 sm:px-10">
                <div className="flex flex-col gap-6 w-full pb-2">
                  <div className="flex flex-col gap-2 items-center">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      containerStyle={containerStyle}
                      inputStyle={inputStyle}
                      inputType="number"
                      renderInput={(props) => <input {...props} />}
                    />
                    {error && (
                      <Text className="text-red-500" size="s">
                        {error}
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      className="w-full font-medium py-2 rounded-md cursor-pointer bg-gray-900 text-white-A700"
                      onClick={handleVerify}
                      disble={isSubmitting}
                    >
                      Verify
                    </button>
                    <button
                      className="outline-none"
                      type="button"
                      // disabled={otpTimer !== 0}
                      onClick={handleResendOtp}
                    >
                      Resend OTP {otpTimer > 0 && <span>in {otpTimer}</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer bottom section */}
        <Footer />
      </div>
    </>
  );
}

export default OTP;
