import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-indigo-600 mb-2 animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Requested path: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{location.pathname}</code>
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoHome}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Homepage
          </button>
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>

        {/* Auto-redirect countdown */}
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p>
            Redirecting to homepage in{" "}
            <span className="font-semibold text-indigo-600">{countdown}</span>{" "}
            seconds...
          </p>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Need help? Try these:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a 
              
              navigate="/"
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              About
            </a>
            <a 
              href="/contact" 
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;