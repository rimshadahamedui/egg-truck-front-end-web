import React, { useEffect, useState } from "react";
import Header from "../../../components/UserComponents/Header";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";
import Loader from "../../../components/UserComponents/Loader";

const Payment = () => {
  const [isPaymentSucces, setIspaymentSucces] = useState(null);
  const [isCod, setIsCod] = useState(false);
  const { orderId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!params.get("success")) {
      navigate("/orders");
    }
    setIspaymentSucces(params.get("success") === "true" ? true : false);
    setIsCod(params.get("isCod") === "true" ? true : false);
  }, []);
  if (isPaymentSucces === null) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      {isPaymentSucces ? (
        <PaymentSuccess orderId={orderId} isCod={isCod} />
      ) : (
        <PaymentFailure orderId={orderId} />
      )}
    </>
  );
};

export default Payment;
