import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Pencil, Redo, Undo } from 'lucide-react'
import React from 'react'

const Download_Header = () => {
  return (
    <div>
        <header className="bg-white border-b">
                <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-blue-600 font-medium flex items-center gap-2">
                    BRIGHT_LIFE_Resume
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    </h1>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                        More options
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Save as PDF</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Redo className="h-4 w-4" />
                    </Button>
                    </div>
                    <div className="flex items-center gap-2 border-l border-r px-4">
                    <span className="text-sm">100%</span>
                    <Button variant="ghost" size="sm" className="h-8">
                        −
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                        +
                    </Button>
                    </div>
                </div>
                </div>
            </header>
    </div>
  )
}

export default Download_Header