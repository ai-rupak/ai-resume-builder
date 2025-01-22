import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResumeApi from './../../service/GlobalApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
      return <div className="p-10 md:px-20 lg:px-32">Loading...</div>;
  }

  return (
      <div className="p-10 md:px-20 lg:px-32">
          <h2 className="font-bold text-3xl">My Resume</h2>
          <p>Start Creating AI resume to your next Job role</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
              <AddResume />
              {resumeList.length > 0 ? (
                  resumeList.map((resume, index) => (
                      <ResumeCardItem resume={resume} key={resume._id || index} refreshData={resumeList} />
                  ))
              ) : (
                  <p>No resumes found. Create your first resume!</p>
              )}
          </div>
      </div>
  );
};
export default Dashboard;
