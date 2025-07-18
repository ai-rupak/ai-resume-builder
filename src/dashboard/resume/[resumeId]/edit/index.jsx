// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import FormSection from '../../components/FormSection';
// import ResumePreview from '../../components/ResumePreview';
// import { ResumeInfoContext } from '@/context/ResumeinfoContext';
// import dummy from '@/data/dummy';
// import GlobalApi from '/service/GlobalApi.js';

// const EditResume = () => {
//     const {resumeId} = useParams();
//     const [resumeInfo, setResumeInfo] = useState();

//     useEffect(()=>{
//       // setResumeInfo(dummy);
//       GetResumeInfo();
//     },[])

//     const GetResumeInfo = ()=>{
//       GlobalApi.GetResumeById(resumeId).then((res)=>{
//         setResumeInfo(res.data.data);
//         console.log(res.data.data);
//       }).catch((err)=>{
//         console.log(err);
//       })
//     }
//   return (
//     <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
//     <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
//         <FormSection/>
//         <ResumePreview/>
//     </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default EditResume

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResumeApi from "../../../../../service/GlobalApi.js";
import FormSection from "../../components/FormSection.jsx";
import ResumePreview from "../../components/ResumePreview.jsx";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext.jsx";
import Header from "@/components/custom/index.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { ChevronLeft, Menu, X } from "lucide-react";

const ResumeEdit = () => {
  const { resumeId } = useParams(); // Get the resumeId from the URL
  const [resumeInfo, setResumeInfo] = useState(null);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [enabledNext, setEnabledNext] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchResumeData();
  }, [resumeId]);

  const fetchResumeData = async () => {
    try {
      const response = await ResumeApi.getResumeById(resumeId);
      setResumeInfo(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch resume data.");
      console.error("Error fetching resume data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resumeInfo) {
    return <div>Resume not found.</div>;
  }

  return (
<ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen flex flex-col">
        <div className="bg-[#0A1F44] text-white p-4 flex justify-between items-center md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Go Back
          </Link>
        </div>
        <div className="flex-1 flex">
          <Sidebar
            activeIndex={activeFormIndex}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 p-6 md:p-10 gap-6 md:gap-10">
            <FormSection
              activeFormIndex={activeFormIndex}
              setActiveFormIndex={setActiveFormIndex}
              enabledNext={enabledNext}
              setEnabledNext={setEnabledNext}
              resumeId={resumeId}
            />
            <ResumePreview resumeInfo={resumeInfo} />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ResumeEdit;
