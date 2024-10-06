import { Login } from "@/components/features/auth";
import { redirectIfAuthenticated } from "@/libs/utils/authUtils";
import React from "react";

const LoginPage = async () => {
  await redirectIfAuthenticated();

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
