import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyPaymentAPI } from "../../apis/stripePayment/stripePayment";

// Floating particles for background effect
const FloatingParticles = () => {
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
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

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentIntentID = searchParams.get("payment_intent");

  const { isLoading, isError, data } = useQuery({
    queryFn: () => verifyPaymentAPI(paymentIntentID),
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden px-4">
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Blurred Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold text-white mb-4">Verifying Payment</h2>
              <p className="text-gray-300">
                Please wait while we confirm your payment...
              </p>
            </div>
          ) : isError ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Verification Failed</h2>
              <p className="text-gray-300 mb-6">We couldn't verify your payment. Please contact support.</p>
              <Link
                to="/"
                className="inline-block py-3 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                Go Home
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Payment Successful!
              </h1>
              <p className="text-gray-300 mb-2">
                Thank you for your payment.
              </p>
              <p className="text-sm text-gray-400 mb-8 font-mono bg-white/5 rounded-lg p-3 border border-white/10">
                Transaction ID: {paymentIntentID}
              </p>
              <div className="space-y-4">
                <Link
                  to="/generate-content"
                  className="block w-full py-3 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                >
                  Start Using AI
                </Link>
                <Link
                  to="/dashboard"
                  className="block w-full py-3 px-6 rounded-xl text-base font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
