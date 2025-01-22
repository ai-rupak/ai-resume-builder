import { Button } from '@/components/ui/button';
import React from 'react';

const SigninPage = () => {
  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Backend Google OAuth login URL
  };
  return (
    <div className='flex flex-col justify-center items-center mt-20 gap-10'>
        <h1>Login</h1>
        <div>
          <Button onClick={googleLogin} className="google-login-button bg-black">
            Login with Google</Button>
        </div>
    
    </div>
  )
}

export default SigninPage