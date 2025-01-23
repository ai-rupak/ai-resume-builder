import { Search } from 'lucide-react'
import { Input } from 'postcss'
import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <div className="flex justify-end gap-4 mb-8">
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600">View:</span>
            <button className="p-2 bg-gray-100 rounded">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" />
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" />
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" />
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" />
              </svg>
            </button>
            <button className="p-2 rounded">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="2" width="14" height="2" rx="1" stroke="currentColor" />
                <rect x="1" y="7" width="14" height="2" rx="1" stroke="currentColor" />
                <rect x="1" y="12" width="14" height="2" rx="1" stroke="currentColor" />
              </svg>
            </button>
          </div>
        </div>
    </div>
  )
}

export default SearchBar