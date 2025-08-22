import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleFreeSubscriptionAPI } from "../../apis/stripePayment/stripePayment";
import StatusMessage from "../Alert/StatusMessage";

// Floating particles for background effect
const FloatingParticles = () => {
  const particles = React.useMemo(() => 
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

const FreePlanSignup = () => {
  const planDetails = {
    name: "Free",
    price: "$0.00/month",
    features: [
      "5 Credits",
      "1 User",
      "Basic Support",
    ],
  };

  //mutation
  const mutation = useMutation({
    mutationFn: handleFreeSubscriptionAPI,
  });
  //Handle confirm payment
  const handleConfirmClick = () => {
    mutation.mutate();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden pt-20 pb-8 px-4 sm:pt-24 sm:pb-12">
      {/* Floating Particles */}
      <FloatingParticles />
      {/* Blurred Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: "1s" }} />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="w-full mx-auto my-4 p-8 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-400 via-slate-400 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent mb-8 animate-gradient-wave text-center">
            Confirm Your {planDetails.name} Plan
          </h2>
          {/*isError */}
          {mutation?.isError && (
            <StatusMessage type="error" message={mutation?.error?.response?.data?.message} />
          )}
          {/* isLoading */}
          {mutation?.isPending && (
            <StatusMessage type="loading" message="Loading please wait..." />
          )}
          {/* isSuccess */}
          {mutation?.isSuccess && (
            <StatusMessage type="success" message="Plan has been upgraded" />
          )}
          <p className="text-center text-gray-300 mb-4">
            Enjoy our free plan with no costs involved. Get started now and upgrade anytime to access more features.
          </p>
          <ul className="mb-6 w-full">
            {planDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-200 mb-2">
                <span className="inline-block w-2 h-2 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="text-center text-green-400 font-bold mb-6">
            {planDetails.price} - No Payment Required
          </div>
          <button
            onClick={handleConfirmClick}
            className="w-full py-3 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 transition-all duration-300 shadow-lg mt-2"
          >
            Confirm Free Plan : $0.00/month
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreePlanSignup;
