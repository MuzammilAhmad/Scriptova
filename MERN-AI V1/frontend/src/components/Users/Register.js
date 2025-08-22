import React, {
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../apis/user/userAPI";
import { useAuth } from "../../AuthContext/AuthContext";
import FloatingParticles from '../FloatingParticles';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email(
      "Please enter a valid email."
    )
    .required("Email is required."),
  password: Yup.string()
    .min(
      6,
      "Password must be at least 6 characters"
    )
    .required("Password is required."),
  username: Yup.string()
    .min(
      2,
      "Username must be at least 2 characters"
    )
    .required("Username is required."),
});

const Registration = () => {
  const [isVisible, setIsVisible] =
    useState(false);
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Redirect if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Mutation for registration
  const mutation = useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Elements */}
      <FloatingParticles />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-slate-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Registration Card */}
      <div
        className={`relative z-10 w-full max-w-md transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-2xl hover:bg-white/25 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent mb-2">
              Join Scriptova
            </h1>
            <p className="text-gray-300">
              Get 3 days free access. No
              credit card required.
            </p>
          </div>

          {/* Status Messages */}
          <div className="mb-6">
            {mutation.isPending && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                  <span className="text-blue-300 font-medium">
                    Creating your
                    account...
                  </span>
                </div>
              </div>
            )}
            {mutation.isError && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-300 font-medium">
                    {
                      mutation?.error
                        ?.response?.data
                        ?.message
                    }
                  </span>
                </div>
              </div>
            )}
            {mutation.isSuccess && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-300 font-medium">
                    Account created!
                    Redirecting to
                    login...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={
              formik.handleSubmit
            }
            className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  {...formik.getFieldProps(
                    "username"
                  )}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="Your username"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                </div>
              </div>
              {formik.touched
                .username &&
                formik.errors
                  .username && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {
                        formik.errors
                          .username
                      }
                    </span>
                  </p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps(
                    "email"
                  )}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="you@example.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              {formik.touched.email &&
                formik.errors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {
                        formik.errors
                          .email
                      }
                    </span>
                  </p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  id="password"
                  {...formik.getFieldProps(
                    "password"
                  )}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-300">
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formik.touched
                .password &&
                formik.errors
                  .password && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {
                        formik.errors
                          .password
                      }
                    </span>
                  </p>
                )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={
                mutation.isPending
              }
              className="group relative w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:hover:scale-100 disabled:hover:shadow-none">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>
                      Creating
                      Account...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Create Account
                    </span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
