import { Link } from "react-router-dom";
import { getUserProfileAPI } from "../../apis/user/userAPI";
import { useQuery } from "@tanstack/react-query";
import StatusMessage from "../Alert/StatusMessage";

// Icon components
const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CreditIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const PlanIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const HistoryIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Progress Circle Component
const ProgressCircle = ({
  percentage,
  size = 120,
  strokeWidth = 8,
}) => {
  const radius =
    (size - strokeWidth) / 2;
  const circumference =
    radius * 2 * Math.PI;
  const offset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <stop
              offset="0%"
              stopColor="#3b82f6"
            />
            <stop
              offset="100%"
              stopColor="#64748b"
            />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

// Get the user profile
const Dashboard = () => {
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  //If the user is not logged in, redirect to the login page
  if (isLoading) {
    return (
      <StatusMessage
        type="loading"
        message="Initializing... Please stand by"
      />
    );
  }

  if (isError) {
    return (
      <StatusMessage
        type="error"
        message={
          error?.response?.data?.message
        }
      />
    );
  }

  const creditUsagePercentage =
    (data?.user?.apiRequestCount /
      data?.user?.monthlyRequestCount) *
      100 || 0;
  const remainingCredits =
    data?.user?.monthlyRequestCount -
    data?.user?.apiRequestCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome back,{" "}
            {data?.user?.username}!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl text-white mr-4">
                <UserIcon />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Profile
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <label className="text-gray-300 text-sm font-medium">
                  Name
                </label>
                <p className="text-white text-lg font-semibold">
                  {data?.user?.username}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <label className="text-gray-300 text-sm font-medium">
                  Email
                </label>
                <p className="text-white text-lg font-semibold">
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Credit Usage Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white mr-4">
                <CreditIcon />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Credits
              </h2>
            </div>
            <div className="flex flex-col items-center mb-6">
              <ProgressCircle
                percentage={
                  creditUsagePercentage
                }
              />
              <p className="text-gray-300 mt-4 text-center">
                {
                  data?.user
                    ?.apiRequestCount
                }{" "}
                of{" "}
                {
                  data?.user
                    ?.monthlyRequestCount
                }{" "}
                credits used
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-400">
                  {remainingCredits}
                </p>
                <p className="text-gray-300 text-sm">
                  Remaining
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {
                    data?.user
                      ?.apiRequestCount
                  }
                </p>
                <p className="text-gray-300 text-sm">
                  Used
                </p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <span className="text-gray-300 text-sm">
                Next Billing Date
              </span>
              <p className="text-white text-lg font-semibold">
                {data?.user
                  ?.nextBillingDate
                  ? new Date(
                      data?.user?.nextBillingDate
                    ).toDateString()
                  : "No billing info available"}
              </p>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-slate-600 to-cyan-600 rounded-xl text-white mr-4">
                <PlanIcon />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Current Plan
              </h2>
            </div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-600 to-cyan-600 rounded-full mb-4">
                <span className="text-2xl font-bold text-white">
                  {data?.user?.subscriptionPlan?.charAt(
                    0
                  )}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {
                  data?.user
                    ?.subscriptionPlan
                }
              </h3>
              <p className="text-gray-300">
                {data?.user
                  ?.subscriptionPlan ===
                  "Trial" &&
                  "5 Credits per month"}
                {data?.user
                  ?.subscriptionPlan ===
                  "Free" &&
                  "3 Credits per month"}
                {data?.user
                  ?.subscriptionPlan ===
                  "Basic" &&
                  "10 Credits per month"}
                {data?.user
                  ?.subscriptionPlan ===
                  "Premium" &&
                  "50 Credits per month"}
              </p>
            </div>
            <Link
              to="/plans"
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-center block">
              Upgrade Plan
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Trial Information Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white mr-4">
                <HistoryIcon />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Trial Status
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                <span className="text-gray-300">
                  Status
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    data?.user
                      ?.trialActive
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}>
                  {data?.user
                    ?.trialActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <span className="text-gray-300 text-sm">
                  Expires on
                </span>
                <p className="text-white text-lg font-semibold">
                  {new Date(
                    data?.user?.trialExpires
                  ).toDateString()}
                </p>
              </div>
              <Link
                to="/plans"
                className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-center block">
                Upgrade to Premium
              </Link>
            </div>
          </div>

          {/* Payment History Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl text-white mr-4">
                <HistoryIcon />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Payment History
              </h2>
            </div>
            {data?.user?.payments
              ?.length > 0 ? (
              <div className="max-h-80 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-white/10">
                {data?.user?.payments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((payment, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <p className="text-white font-semibold">
                            {
                              payment?.subscriptionPlan
                            }
                          </p>
                          <p className="text-gray-300 text-sm">
                            {new Date(
                              payment?.createdAt
                            ).toDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              payment?.status ===
                              "succeeded"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            }`}>
                            {
                              payment?.status
                            }
                          </span>
                          <span className="text-white font-bold text-lg">
                            $
                            {
                              payment?.amount
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-300">
                  No payment history
                  available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
