import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaRegEdit,
  FaTrashAlt,
  FaEye,
  FaPlusSquare,
} from "react-icons/fa";
import { getUserProfileAPI } from "../../apis/user/userAPI";
import StatusMessage from "../Alert/StatusMessage";
import { Link } from "react-router-dom";

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

const ContentGenerationHistory = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  
  //get the user profile
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });
  //  Display loading
  if (isLoading) {
    return (
      <StatusMessage
        type="loading"
        message="Loading please wait"
      />
    );
  }
  //  Display error
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
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden pt-20 pb-8 px-4 sm:pt-24 sm:pb-12">
      {/* Floating Particles */}
      <FloatingParticles />
      {/* Blurred Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse z-0"
        style={{ animationDelay: "1s" }}
      />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-12 ">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-400 via-slate-400 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent mb-4 animate-gradient-wave">
            Content Generation History
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8 gap-4">
          <Link
            to="/generate-content"
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            <FaPlusSquare className="mr-2" />
            <span>
              Create New Content
            </span>
          </Link>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-0 sm:p-4">
          {data?.user?.history
            ?.filter(content => content?.type === 'content')
            ?.length <= 0 ? (
            <div className="text-center py-12 text-gray-300 text-lg">
              No history found
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {data?.user?.history
                ?.filter(content => content?.type === 'content')
                ?.map((content, idx) => (
                  <li
                    key={
                      content._id || idx
                    }
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-6 hover:bg-white/5 transition-all duration-300 group">
                    <div className="flex-1 min-w-0 mb-4 sm:mb-0 pr-4">
                      <p className="text-lg font-semibold text-white truncate">
                        {
                          content?.content?.length > 100 
                            ? content.content.substring(0, 100) + '...' 
                            : content?.content
                        }
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(
                          content?.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FaEye 
                        onClick={() => setSelectedContent(content)}
                        className="text-green-400 hover:text-green-300 cursor-pointer w-5 h-5 transition-colors duration-300" 
                      />
                      <FaRegEdit className="text-blue-400 hover:text-blue-300 cursor-pointer w-5 h-5 transition-colors duration-300" />
                      <FaTrashAlt className="text-red-400 hover:text-red-300 cursor-pointer w-5 h-5 transition-colors duration-300" />
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
      
      {/* Modal for viewing full content */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent">Generated Content</h3>
              <button
                onClick={() => setSelectedContent(null)}
                className="text-gray-300 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[70vh]">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedContent.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerationHistory;
