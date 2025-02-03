import { GoogleLogin } from "@react-oauth/google";
import React from "react";

const LoginWithGoogle = ({ handleLoginWithGoogle }) => {
  return <GoogleLogin onSuccess={handleLoginWithGoogle} />;
};

export default React.memo(LoginWithGoogle);
