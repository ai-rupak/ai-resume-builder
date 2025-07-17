import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Header from './components/custom'
import GoogleCallback from './auth/GoogleCallback';
import Dashboard from './dashboard';
import SigninPage from './auth/sign-in';
import Home from './home';
import ResumeEdit from './dashboard/resume/[resumeId]/edit';
import ViewResume from './my-resume/[resumeId]/download';
import { AuthProvider, useAuth } from './context/AuthContext';
import NotFound from './pages/NotFound';
import Index from './pages';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/auth/sign-in" />;
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      {/*    */}
      <Routes>
        <Route path="/auth/sign-in" element={<SigninPage/>} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/resume/:resumeId/edit" element={
          <ProtectedRoute>
            <ResumeEdit />
          </ProtectedRoute>
        } />
        <Route path="/my-resume/:resumeId/view" element={<ViewResume />} />
        <Route path='/' element={<Index/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet/>
    </AuthProvider>
  );
}

export default App