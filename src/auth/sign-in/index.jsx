import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const { user, isLoading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center mt-20 gap-10'>
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <div>
        <Button onClick={googleLogin} className="google-login-button bg-black hover:bg-gray-800">
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default SigninPage;