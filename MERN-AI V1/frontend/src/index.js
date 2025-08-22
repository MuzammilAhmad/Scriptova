import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Stripe configuration
const stripePromise = loadStripe(
  process.env
    .REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const options = {
  mode: "payment",
  currency: "usd",
  amount: 2025,
};

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

//React Query Client Provider
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider
      client={queryClient}>
      <AuthProvider>
        {/* Main App Component */}
        {/* This is the main component that will be rendered */}
        <Elements
          stripe={stripePromise}
          options={options}>
          {/* Stripe Wrapper */}
          {/* This is a wrapper component for Stripe */}
          {/* It provides the Stripe instance and options to the child components */}
          <App />
        </Elements>
      </AuthProvider>
      {/* React Query Devtools for debugging */}
      {/* This is used to debug the queries in the application */}
      <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
