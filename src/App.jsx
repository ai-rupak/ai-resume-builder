
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './components/ui/button'
import { Navigate, Outlet, Route, Router, Routes } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom'
import GoogleCallback from './auth/GoogleCallback';
import Dashboard from './dashboard';
import SigninPage from './auth/sign-in';
import Home from './home';
import ResumeEdit from './dashboard/resume/[resumeId]/edit';
import ViewResume from './my-resume/[resumeId]/view';


const App = () => {
  // const {user,isLoaded,isSignedIn} = useUser();
  // if(!isSignedIn && isLoaded){
  //   return <Navigate to={'auth/sign-in'} />
  // }
  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
      <Header/>
      
        <Routes>
            <Route path="/auth/sign-in" element={<SigninPage/>} />
            <Route path="/google/callback" element={<GoogleCallback
             />} />  {/* New Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/resume/:resumeId/edit" element={<ResumeEdit />} />
            <Route path="/my-resume/:resumeId/view" element={<ViewResume />} />
             <Route path='/' element={<Home/>}/>
        </Routes>
    
      <Outlet/>
    </>
  )
}

export default App
