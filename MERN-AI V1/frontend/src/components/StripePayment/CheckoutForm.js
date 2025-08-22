import {
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { createStripePaymentIntentAPI } from "../../apis/stripePayment/stripePayment";
import StatusMessage from "../Alert/StatusMessage";

// Floating particles for background effect
const FloatingParticles = () => {
  const particles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

const CheckoutForm = () => {
  //Get the payloads
  const params = useParams();
  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get("amount");

  // Mutation for creating stripe payment intent
  const mutation = useMutation({
    mutationFn: createStripePaymentIntentAPI,
  });

  //Stripe configuration
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements === null || isProcessing) {
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage(null);
    
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsProcessing(false);
      return;
    }
    try {
      //prepare our data for payment
      const data = { amount, plan };
      //Make the http request and wait for response
      const paymentIntentResponse = await createStripePaymentIntentAPI(data);

      if (paymentIntentResponse?.clientSecret) {
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret: paymentIntentResponse.clientSecret,
          confirmParams: {
            return_url: "http://localhost:3000/success",
          },
        });
        if (error) {
          setErrorMessage(error?.message);
        }
      }
    } catch (error) {
      setErrorMessage(error?.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden pt-20 pb-8 px-4 sm:pt-24 sm:pb-12">
      {/* Floating Particles */}
      <FloatingParticles />
      {/* Blurred Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: "1s" }} />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto my-4 p-8 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-400 via-slate-400 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent mb-8 animate-gradient-wave text-center">
            Checkout
          </h2>
          <div className="mb-6 w-full">
            <PaymentElement />
          </div>
          {/* Display loading */}
          {isProcessing && (
            <StatusMessage type="loading" message="Processing please wait..." />
          )}
          {/* Display error */}
          {mutation?.isError && (
            <StatusMessage type="error" message={mutation?.error?.response?.data?.error} />
          )}
          <button 
            disabled={isProcessing || !stripe || !elements}
            className="w-full py-3 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 transition-all duration-300 shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
          {errorMessage && (
            <div className="text-red-500 mt-4 text-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
