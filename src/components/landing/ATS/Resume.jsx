import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Building2, 
  Briefcase, 
  Share,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react';
import Details from './Details';
import ATS from './ATS';
import Summary from './Summary';

const Resume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    imageUrl: '',
    feedback: null,
    resumeText: '',
    meta: { companyName: '', jobTitle: '', jobDescription: '' },
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Initialize data from location state
    const initializeData = () => {
      if (!location.state) {
        setData(prev => ({
          ...prev,
          error: 'No resume data found',
          isLoading: false
        }));
        return;
      }

      const { 
        previewImage = '', 
        feedback = null, 
        resumeText = '', 
        companyName = '', 
        jobTitle = '', 
        jobDescription = '' 
      } = location.state;

      setData({
        imageUrl: previewImage,
        feedback,
        resumeText,
        meta: { companyName, jobTitle, jobDescription },
        isLoading: false,
        error: null
      });
    };

    // Add slight delay for better UX
    const timer = setTimeout(initializeData, 500);
    return () => clearTimeout(timer);
  }, [location.state]);

  const handleRetry = () => {
    navigate('/upload');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume Analysis',
          text: `Check out my resume analysis for ${data.meta.jobTitle} at ${data.meta.companyName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Your Analysis</h3>
        <p className="text-gray-600 text-sm">Please wait while we prepare your resume review...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-red-200 shadow-lg max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-xl flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 text-sm mb-6">{data.error}</p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );

  const ResumePreview = () => (
    <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {data.imageUrl ? (
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <img
                src={data.imageUrl}
                className="w-full h-auto object-contain"
                title="Resume Preview"
                alt="Your resume preview"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Preview Actions */}
          <div className="flex items-center justify-center space-x-3 mt-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-3 py-2 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white/90 transition-all duration-200"
            >
              <Share className="w-4 h-4 mr-1" />
              Share
            </button>
           
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No preview available</p>
        </div>
      )}
    </div>
  );

  const FeedbackHeader = () => (
    <div className="mb-6 sm:mb-8 lg:mb-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Resume Analysis
          </h1>
          {data.meta.companyName && (
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-gray-600">
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="font-semibold">{data.meta.jobTitle}</span>
              </div>
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{data.meta.companyName}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons - Desktop */}
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </button>
          <Link
            to="/upload"
            className="inline-flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            New Analysis
          </Link>
        </div>
      </div>

      {/* Action Buttons - Mobile */}
      <div className="flex sm:hidden items-center space-x-2 mt-4">
        <button
          onClick={handleShare}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Share className="w-4 h-4 mr-1" />
          Share
        </button>
        <Link
          to="/upload"
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          New Analysis
        </Link>
      </div>
    </div>
  );

  if (data.error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <NavigationBar />
        <ErrorState />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavigationBar />
      
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Resume Preview - Left Side */}
        <aside className="w-full lg:w-2/5 xl:w-1/3 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] bg-gradient-to-br from-purple-50 to-blue-50 border-b lg:border-b-0 lg:border-r border-gray-200">
          <ResumePreview />
        </aside>

        {/* Feedback Content - Right Side */}
        <section className="flex-1 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <FeedbackHeader />
            
            {data.isLoading ? (
              <LoadingState />
            ) : data.feedback ? (
              <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-in fade-in duration-1000">
                <Summary feedback={data.feedback} />
                <ATS 
                  score={data.feedback.ATS?.score || 0} 
                  suggestions={data.feedback.ATS?.tips || []} 
                />
                <Details feedback={data.feedback} />
              </div>
            ) : (
              <LoadingState />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

// Navigation Bar Component
const NavigationBar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 sm:h-20">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
        >
          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm sm:text-base">Back to Homepage</span>
        </Link>
        
        <div className="text-xs sm:text-sm text-gray-500">
          Resume Analysis Results
        </div>
      </div>
    </div>
  </nav>
);

export default Resume;