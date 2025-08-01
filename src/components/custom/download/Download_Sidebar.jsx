import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Download, Link } from 'lucide-react';
// import { RWebShare } from 'react-web-share';

const Download_Sidebar = ({resumeId, resumeInfo}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null); // Start with null to prevent flash

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Automatically close sidebar when switching to mobile
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.querySelector('.sidebar');
        const toggleButton = document.querySelector('.sidebar-toggle');
        
        if (
          sidebar && 
          !sidebar.contains(event.target) && 
          toggleButton && 
          !toggleButton.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    if (isMobile && isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isMobile, isSidebarOpen]);

  // Don't render until we know if it's mobile or not
  if (isMobile === null) {
    return null;
  }

  return (
    <div className="relative">
      {/* Sidebar Toggle Button for Mobile */}
      {isMobile && (
        <Button
          variant="ghost"
          className="sidebar-toggle fixed top-20 right-4 z-50 rounded-lg border bg-[#0A1F44] 
            text-white p-2 shadow-lg"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`
          sidebar 
          w-64 
          bg-[#0A1F44] 
          text-white 
          p-6 
          flex 
          flex-col 
          justify-between 
          transition-transform 
          duration-300 
          ease-in-out
          ${isMobile 
            ? `fixed top-16 left-0 bottom-0 z-50 ${
                isSidebarOpen 
                  ? 'translate-x-0' 
                  : '-translate-x-full'
              }` 
            : 'relative h-full'
          }
        `}
      >
        <div className="p-2 space-y-1 flex-1">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 4h-9M14 20H5M19 4v16M5 4v16"
              />
            </svg>
            Templates
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <svg 
              className="mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
            Design & formatting
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <svg 
              className="mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Add section
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <svg 
              className="mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
            Spell check
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <svg 
              className="mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
            ATS Check
          </Button>
          {/* <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
      <Link/>
      Share
    </Button>
      </RWebShare> */}
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <Download className="mr-2 h-5 w-5"/>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Download_Sidebar;