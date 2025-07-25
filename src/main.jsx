import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SigninPage from './auth/sign-in'
import Home from './home'
import Dashboard from './dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit'
import ViewResume from './my-resume/[resumeId]/download'
// import GoogleCallback from './auth/GoogleCallback'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// const router = createBrowserRouter([
//   {
    
//     element: <App />,
//     children: [
      
//       {
//         path: '/dashboard',
//         element: <Dashboard/>,
//       },
//       {
//         path: '/dashboard/resume/:resumeId/edit',
//         element: <EditResume/>,
//       }

//     ]
//   },
//   {
//     path: '/google/callback',
//     element: <GoogleCallback/>,
//   },
//   {
//     path: '/',
//     element: <Home/>,
//   },
//   {
//     path:'/auth/sign-in',
//     element: <SigninPage/>
//   },
//   {
//     path: '/my-resume/:resumeId/view',
//     element: <ViewResume/>,
//   }
// ])

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
      {/* <RouterProvider router={router}/> */}
      <App/>
    
  </BrowserRouter>,
)
