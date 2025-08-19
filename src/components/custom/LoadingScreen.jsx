import { Brain, BrainIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ 
  message = "Loading...", 
  showProgress = false, 
  progress = 0,
  // tips = [
  //   "Did you know? You can use keyboard shortcuts to navigate faster!",
  //   "Tip: Try using dark mode for a better viewing experience.",
  //   "Fun fact: Our servers process thousands of requests per second.",
  //   "Tip: You can bookmark your favorite pages for quick access.",
  //   "Did you know? We're constantly improving our performance."
  // ]
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [dots, setDots] = useState(0);

  // Cycle through loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // // Cycle through tips
  // useEffect(() => {
  //   if (tips.length > 1) {
  //     const interval = setInterval(() => {
  //       setCurrentTip(prev => (prev + 1) % tips.length);
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [tips.length]);

  const renderLoadingDots = () => {
    return '.'.repeat(dots);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 z-50">
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto p-8">
        {/* Logo/Brand Area */}
        {/* <BrainIcon className="w-16 h-16 text-blue-600 mb-4 " /> */}
        {/* <div className="mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-10 h-10 bg-white rounded-lg opacity-90"></div>
          </div>
        </div> */}

        {/* Main Loading Animation */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Inner pulsing dot */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div> */}
        </div>

        {/* Loading Message */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {message}
            <span className="inline-block w-8 text-left text-blue-500">
              {renderLoadingDots()}
            </span>
          </h2>
          
          {/* Progress Bar */}
          {showProgress && (
            <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          )}

          {/* Progress Percentage */}
          {showProgress && (
            <p className="text-sm text-gray-600 mb-4">
              {Math.round(progress)}% Complete
            </p>
          )}
        </div>

        {/* Loading Tips */}
        {/* {tips.length > 0 && (
          <div className="text-center min-h-[3rem] flex items-center">
            <p className="text-sm text-gray-500 italic transition-opacity duration-500">
              {tips[currentTip]}
            </p>
          </div>
        )} */}

        {/* Decorative Elements */}
        <div className="flex gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;