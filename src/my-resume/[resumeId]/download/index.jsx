import React, { useEffect, useState, Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Header } from '@/components/landing/Header'
import ResumeApi from '../../../../service/GlobalApi'

// Lazy load components to handle missing dependencies gracefully
const Download_Sidebar = lazy(() => 
  import('@/components/custom/download/Download_Sidebar').catch(() => ({
    default: () => <div className="text-red-500">Sidebar component failed to load</div>
  }))
)

const Download_ResumePreview = lazy(() => 
  import('@/components/custom/download/Download_ResumePreview').catch(() => ({
    default: () => <div className="text-red-500">Resume preview failed to load</div>
  }))
)

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2">Loading...</span>
  </div>
)

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold">Something went wrong</h3>
          <p className="text-red-600 text-sm mt-1">
            {this.props.fallbackMessage || 'This component failed to load properly.'}
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false, error: null })}
            variant="outline"
            className="mt-2 text-sm"
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { resumeId } = useParams()

  // Safe window access for mobile detection
  const [isMobile, setIsMobile] = useState(null) // Start with null

  useEffect(() => {
    // Safe window access after component mounts
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768)
      
      // Initial check
      checkMobile()
      
      const handleResize = () => checkMobile()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (resumeId) {
      GetResumeInfo()
    }
  }, [resumeId])

  const GetResumeInfo = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await ResumeApi.getResumeById(resumeId)
      console.log('Resume data:', response.data.data)
      setResumeInfo(response.data.data)
    } catch (err) {
      console.error('Failed to fetch resume:', err)
      setError('Failed to load resume data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={GetResumeInfo} className="mr-2">
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  // Don't render main content until we know if it's mobile
  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Fixed header with error boundary */}
        <ErrorBoundary fallbackMessage="Header failed to load">
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <Header />
          </div>
        </ErrorBoundary>
        
        {/* Main content container with top padding */}
        <div id="no-print" className="pt-16 flex-1">
          <div className="flex h-full">
            {/* Left Sidebar - Only show on desktop, with error boundary */}
            {!isMobile && (
              <ErrorBoundary fallbackMessage="Sidebar failed to load">
                <Suspense fallback={<div className="w-64 bg-gray-100 animate-pulse"></div>}>
                  <Download_Sidebar resumeId={resumeId} resumeInfo={resumeInfo} />
                </Suspense>
              </ErrorBoundary>
            )}
            
            {/* Main Content */}
            <div className="flex-1 flex justify-center items-start">
              <div className="p-4 w-full max-w-4xl">
                {/* Mobile header info */}
                {isMobile && resumeInfo && (
                  <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                    <h1 className="text-xl font-semibold text-gray-800">
                      {resumeInfo.personalDetail?.firstName} {resumeInfo.personalDetail?.lastName}
                    </h1>
                    <p className="text-gray-600">Resume Preview</p>
                  </div>
                )}

                {/* Resume Preview with error boundary */}
                <ErrorBoundary fallbackMessage="Resume preview failed to load">
                  <Suspense fallback={<LoadingSpinner />}>
                    <div className="bg-white rounded-lg shadow-sm">
                      <Download_ResumePreview />
                    </div>
                  </Suspense>
                </ErrorBoundary>

                {/* Mobile download button */}
                {/* {isMobile && (
                  <div className="mt-4 flex justify-center">
                    <Button 
                      onClick={handleDownload}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Download Resume
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar - render only on mobile */}
        {isMobile && (
          <ErrorBoundary fallbackMessage="Mobile sidebar failed to load">
            <Suspense fallback={null}>
              <Download_Sidebar resumeId={resumeId} resumeInfo={resumeInfo} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume