import { Button } from '@/components/ui/button'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'

import { RWebShare } from 'react-web-share'
import ResumeApi from '../../../../service/GlobalApi'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Download, Mail, Pencil, Printer, Redo, Undo } from 'lucide-react'
import { toast } from 'react-toastify'
import Download_Sidebar from '@/components/custom/download/Download_Sidebar'
import Right_Sidebar from '@/components/custom/download/Right_Sidebar'
import Download_Header from '@/components/custom/download/Download_Header'
import Download_ResumePreview from '@/components/custom/download/Download_ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Header } from '@/components/landing/Header'

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo=()=>{
        ResumeApi.getResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }

  
    return (
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
            <div className='min-h-screen bg-gray-50 flex flex-col'>
                {/* Fixed header */}
                <div className='fixed top-0 left-0 right-0 z-50'>
                    <Header/>
                </div>
                
                {/* Main content container with top padding */}
                <div id="no-print" className="pt-16 "> {/* Adjust pt-16 to match header height */}
                    <div className="flex grow">
                        {/* Left Sidebar */}
                        <Download_Sidebar resumeId={resumeId} resumeInfo={resumeInfo}/>
                        
                        {/* Main Content */}
                        <div className="flex-1 flex justify-center items-center">
                            <div className="p-3 w-full md:w-1/2 max-w-2xl overflow-y-auto ">
                                <Download_ResumePreview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )

}

export default ViewResume