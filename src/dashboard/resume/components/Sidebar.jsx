import { Menu, X } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({activeIndex , isSidebarOpen , setIsSidebarOpen}) => {
  return (
    <div
      className={`w-64 bg-[#0A1F44] text-white p-6 flex flex-col justify-between h-screen md:h-auto fixed top-0 left-0 bottom-0 z-40 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:static md:translate-x-0`}
    >
      <div className="mb-8 flex items-center justify-between md:block">
        {/* <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20144550-BuOyBwfGsOGfvz6FWfP5bBAQY58rXB.png"
          alt="My Perfect Resume"
          width={180}
          height={40}
        /> */}
      </div>

      <nav className="space-y-4">
        {[
          { num: 1, text: "Heading", active: activeIndex === 1 },
          { num: 2, text: "Summary", active: activeIndex === 2 },
          { num: 3, text: "Professional\nExperience", active: activeIndex === 3 },
          { num: 4, text: "Education", active: activeIndex === 4 },
          { num: 5, text: "Projects", active: activeIndex === 5 },
          { num: 6, text: "Skills", active: activeIndex === 6 },
          { num: 6, text: "Finalize", active: activeIndex === 7 },

        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 ${
              item.active ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setActiveFormIndex(item.num)}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                item.active
                  ? 'border border-white text-white'
                  : 'border border-gray-500 text-gray-500'
              }`}
            >
              {item.num}
            </div>
            <span className="whitespace-pre-line">{item.text}</span>
          </div>
        ))}
      </nav>

      <div className="mt-4">
        <div className="h-2 bg-gray-700 rounded">
          <div
            className="h-full bg-green-500 rounded"
            style={{ width: `${(activeIndex / 7) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-300">RESUME COMPLETENESS</div>
      </div>

      <div className="text-sm mt-4">
        <Link href="#" className="block text-gray-300 hover:text-white">
          Terms & Conditions
        </Link>
        <Link href="#" className="block text-gray-300 hover:text-white">
          Privacy Policy
        </Link>
        <Link href="#" className="block text-gray-300 hover:text-white">
          Accessibility
        </Link>
        <Link href="#" className="block text-gray-300 hover:text-white">
          Contact Us
        </Link>
        <p className="text-gray-300 text-wrap">© 2025, AI Resume.</p>
      </div>
    </div>
  );
};

export default Sidebar