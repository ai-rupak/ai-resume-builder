import React, { useContext, useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResumeApi from './../../service/GlobalApi';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchBar from './components/SearchBar';
import {  useAuth } from '@/context/AuthContext';
import { Header } from '@/components/landing/Header';

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
      return <div className="p-10 md:px-20 lg:px-32">Loading...</div>;
  }

  return (
    <div>
        <Header />
      <div className="container mx-auto px-4 py-20">
        <div className='flex items-center justify-between mb-4'>
            <div>

                <h2 className="font-bold text-3xl">My Resume</h2>
                <p> Welcome {user.name} , Start Creating AI resume to your next Job role</p>
            </div>
        </div>
        <div className="flex justify-end gap-4 mb-8">
          <div className="relative">
            <Input type="text" placeholder="Search" className="pl-10 w-64  hover:border-teal-600 " />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
            <SearchBar />
        </div>
        <div className='grid md:grid-cols-2 gap-8 mb-8'>

            <AddResume type="resume" tip="Create with ease relax"/>
            <AddResume type="cover" tip="Create with ease relax"/>
        </div>
        {/* <AddResume /> */}
        <div className="grid md:grid-cols-3 gap-8 ">
              {resumeList.length > 0 ? (
                  resumeList.map((resume, index) => (
                      <ResumeCardItem resume={resume} key={resume._id || index} refreshData={resumeList} />
                  ))
              ) : (
                  <p>No resumes found. Create your first resume!</p>
              )}
          
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
