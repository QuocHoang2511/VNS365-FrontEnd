"use client";

import React from "react";
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

interface Props {
  children: React.ReactNode;
}

const initialOptions: ReactPayPalScriptOptions = {
  clientId: process.env.PAYPAL_CLIENT_ID || "sb",
  enableFunding: "paylater,venmo",
  dataSdkIntegrationSource: "integrationbuilder_sc",
};

const PayPalProvider = ({ children }: Props) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
