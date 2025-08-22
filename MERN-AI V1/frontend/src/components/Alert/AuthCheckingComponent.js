import React from "react";

const AuthCheckingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
      <p className="mt-6 text-lg text-gray-200 animate-pulse">
        Authenticating... Please hold on!
      </p>
    </div>
  );
};

export default AuthCheckingComponent;
