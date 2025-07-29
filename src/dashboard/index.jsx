import React, { useContext, useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { useNavigate } from 'react-router-dom';
import ResumeApi from './../../service/GlobalApi';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchBar from './components/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/landing/Header';
import { toast } from 'sonner';
import LoadingScreen from '@/components/custom/LoadingScreen';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserResumes = async () => {
      setIsLoading(true);
      try {
        const response = await ResumeApi.getUserResumes();
        if (response.data.success) {
          setResumeList(response.data.data);
        } else {
          toast.error(response.data.message || 'Failed to fetch resumes');
        }
      } catch (error) {
        toast.error('Failed to load resumes.');
        console.error('Error details:', error.response || error);
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('You need to log in to access the dashboard.');
      navigate('/auth/sign-in');
    } else {
      fetchUserResumes();
    }
  }, [navigate]);

  if (isLoading) {
    return <LoadingScreen message="Loading your resumes..." showProgress={true} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-800">
              My Resume
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-md">
              Welcome {user?.name || 'User'}, Start Creating AI resume for your next Job role
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="relative w-full sm:w-auto">
            <Input 
              type="text" 
              placeholder="Search resumes..." 
              className="pl-10 w-full sm:w-64 lg:w-72 hover:border-teal-600 focus:border-teal-600 transition-colors" 
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="w-full sm:w-auto">
            <SearchBar />
          </div>
        </div>

        {/* Create Resume/Cover Letter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <AddResume type="resume" tip="Create with ease, relax" />
          <AddResume type="cover" tip="Create with ease, relax" />
        </div>

        {/* Resume List Section */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Your Resumes ({resumeList.length})
          </h3>
          
          {resumeList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {resumeList.map((resume, index) => (
                <div key={resume._id || index} className="w-full">
                  <ResumeCardItem 
                    resumeList={resumeList}
                    setResumeList={setResumeList}
                    resume={resume} 
                    refreshData={resumeList} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <svg 
                    className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                  No resumes yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-6">
                  Get started by creating your first AI-powered resume!
                </p>
                <button 
                  onClick={() => navigate('/dashboard/resume/create')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                  Create Your First Resume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer space for mobile navigation */}
        <div className="h-16 sm:h-0"></div>
      </div>
    </div>
  );
};

export default Dashboard;