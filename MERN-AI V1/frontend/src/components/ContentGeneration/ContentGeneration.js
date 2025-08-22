import React, {
  useState,
  useEffect,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getUserProfileAPI } from "../../apis/user/userAPI";
import StatusMessage from "../Alert/StatusMessage";
import { generateContentAPI } from "../../apis/chatGPT/chatGPT";
import FloatingParticles from "../FloatingParticles";

// Floating particles component
<FloatingParticles />;

const BlogPostAIAssistant = () => {
  const [
    generatedContent,
    setGeneratedContent,
  ] = useState("");
  const [isVisible, setIsVisible] =
    useState(false);
  const [isCopied, setIsCopied] =
    useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get the user profile
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  // Mutation for content generation
  const mutation = useMutation({
    mutationFn: generateContentAPI,
    onSuccess: (data) => {
      setGeneratedContent(
        data?.content ||
          JSON.stringify(data)
      );
    },
  });

  // Formik setup for handling form data
  const formik = useFormik({
    initialValues: {
      prompt: "",
      tone: "",
      category: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required(
        "A prompt is required"
      ),
      tone: Yup.string().required(
        "Selecting a tone is required"
      ),
      category: Yup.string().required(
        "Selecting a category is required"
      ),
    }),
    onSubmit: (values) => {
      const prompt = `Generate a blog post based on the following prompt and requirements:
        ${values.prompt}, 
        Tone: ${values.tone}
        Category: ${values.category}`;
      mutation.mutate(prompt);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center pt-24">
        <StatusMessage
          type="loading"
          message="Initializing... Please stand by"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center pt-24">
        <StatusMessage
          type="error"
          message={
            error?.response?.data
              ?.message
          }
        />
      </div>
    );
  }

  const remainingCredits =
    data?.user?.monthlyRequestCount -
    data?.user?.apiRequestCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden pt-24 pb-12">
      {/* Background Elements */}
      <FloatingParticles />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div
          className={`relative text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}>
          {/* History Link - Top Right */}
          <div className="absolute top-0 right-0 group">
            <Link
              to="/history"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105">
              <svg
                className="w-5 h-5"
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
              <span className="hidden sm:inline">
                History
              </span>
            </Link>

            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
              View Generation History
              <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
            </div>
          </div>
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent mb-4">
            AI Content Generator
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transform your ideas into
            engaging content with the
            power of AI
          </p>
        </div>

        {/* User Stats */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-6 py-3 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
            <div>
              <span className="text-white font-semibold">
                {
                  data?.user
                    ?.subscriptionPlan
                }
              </span>
              <span className="text-gray-300 text-sm ml-1">
                Plan
              </span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-6 py-3 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
            <div>
              <span className="text-white font-semibold">
                {remainingCredits}
              </span>
              <span className="text-gray-300 text-sm ml-1">
                Credits Left
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div
          className={`mb-8 transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}>
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 hover:bg-white/25 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Create Content
            </h2>

            {/* Status Messages */}
            <div className="mb-6">
              {mutation.isPending && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                    <span className="text-blue-300 font-medium">
                      Crafting your
                      content...
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
                          ?.response
                          ?.data
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
                      Content generated
                      successfully!
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={
                formik.handleSubmit
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Prompt Field */}
              <div className="md:col-span-3 space-y-2">
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium text-gray-300">
                  Topic or Idea
                </label>
                <textarea
                  id="prompt"
                  rows={3}
                  {...formik.getFieldProps(
                    "prompt"
                  )}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Describe what you want to write about..."
                />
                {formik.touched
                  .prompt &&
                  formik.errors
                    .prompt && (
                    <p className="text-red-400 text-sm flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {
                          formik.errors
                            .prompt
                        }
                      </span>
                    </p>
                  )}
              </div>

              {/* Tone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="tone"
                  className="text-sm font-medium text-gray-300">
                  Tone
                </label>
                <select
                  id="tone"
                  {...formik.getFieldProps(
                    "tone"
                  )}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300">
                  <option
                    value=""
                    className="bg-gray-800">
                    Choose a tone...
                  </option>
                  <option
                    value="formal"
                    className="bg-gray-800">
                    Formal
                  </option>
                  <option
                    value="informal"
                    className="bg-gray-800">
                    Informal
                  </option>
                  <option
                    value="humorous"
                    className="bg-gray-800">
                    Humorous
                  </option>
                  <option
                    value="professional"
                    className="bg-gray-800">
                    Professional
                  </option>
                  <option
                    value="conversational"
                    className="bg-gray-800">
                    Conversational
                  </option>
                </select>
                {formik.touched.tone &&
                  formik.errors
                    .tone && (
                    <p className="text-red-400 text-sm flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {
                          formik.errors
                            .tone
                        }
                      </span>
                    </p>
                  )}
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  id="category"
                  {...formik.getFieldProps(
                    "category"
                  )}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300">
                  <option
                    value=""
                    className="bg-gray-800">
                    Choose a category...
                  </option>
                  <option
                    value="technology"
                    className="bg-gray-800">
                    Technology
                  </option>
                  <option
                    value="health"
                    className="bg-gray-800">
                    Health & Wellness
                  </option>
                  <option
                    value="business"
                    className="bg-gray-800">
                    Business
                  </option>
                  <option
                    value="lifestyle"
                    className="bg-gray-800">
                    Lifestyle
                  </option>
                  <option
                    value="education"
                    className="bg-gray-800">
                    Education
                  </option>
                  <option
                    value="travel"
                    className="bg-gray-800">
                    Travel
                  </option>
                  <option
                    value="sports"
                    className="bg-gray-800">
                    Sports
                  </option>
                  <option
                    value="other"
                    className="bg-gray-800">
                    Other
                  </option>
                </select>
                {formik.touched
                  .category &&
                  formik.errors
                    .category && (
                    <p className="text-red-400 text-sm flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {
                          formik.errors
                            .category
                        }
                      </span>
                    </p>
                  )}
              </div>

              {/* Generate Button */}
              <div className="space-y-2 mt-8">
                {/* <label className="text-sm font-medium text-gray-300 block mb-2">
                  Action
                </label> */}
                <button
                  type="submit"
                  disabled={
                    mutation.isPending ||
                    remainingCredits <=
                      0
                  }
                  className="group relative w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:hover:scale-100 disabled:hover:shadow-none">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {mutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>
                          Generating...
                        </span>
                      </>
                    ) : remainingCredits <=
                      0 ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={
                              2
                            }
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span>
                          No Credits
                          Left
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 group-hover:rotate-12 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={
                              2
                            }
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>
                          Generate
                          Content
                        </span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Generated Content Section */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}>
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 hover:bg-white/25 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generated Content
              </h2>
              {generatedContent && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        generatedContent
                      );
                      setIsCopied(true);
                      setTimeout(
                        () =>
                          setIsCopied(
                            false
                          ),
                        2000
                      );
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 hover:text-blue-200 transition-all duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          isCopied
                            ? "M5 13l4 4L19 7"
                            : "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        }
                      />
                    </svg>
                    <span>
                      {isCopied
                        ? "Copied!"
                        : "Copy"}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const blob =
                        new Blob(
                          [
                            generatedContent,
                          ],
                          {
                            type: "text/plain",
                          }
                        );
                      const url =
                        URL.createObjectURL(
                          blob
                        );
                      const a =
                        document.createElement(
                          "a"
                        );
                      a.href = url;
                      a.download =
                        "generated-content.txt";
                      a.click();
                      URL.revokeObjectURL(
                        url
                      );
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-green-200 transition-all duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>
                      Download
                    </span>
                  </button>
                </div>
              )}
            </div>

            {generatedContent ? (
              <div className="bg-white/5 rounded-xl border border-white/10 min-h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-base font-normal">
                      {generatedContent}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 p-4 bg-white/5 rounded-b-xl">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      {
                        generatedContent.length
                      }{" "}
                      characters •{" "}
                      {
                        generatedContent.split(
                          " "
                        ).length
                      }{" "}
                      words
                    </span>
                    <span className="text-green-400">
                      ✓ Content ready
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] min-h-[500px] text-center bg-white/5 rounded-xl border border-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-gray-300 text-xl font-semibold mb-3">
                  Ready to Generate
                  Amazing Content
                </h3>
                <p className="text-gray-400 text-base mb-6 max-w-md">
                  Fill out the form
                  above with your topic,
                  tone, and category
                  preferences, then
                  click generate to
                  create engaging
                  content.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>
                      AI-Powered
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>
                      High Quality
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span>
                      Instant Results
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostAIAssistant;
