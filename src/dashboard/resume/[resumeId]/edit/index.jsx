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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResumeApi from "../../../../../service/GlobalApi.js";
import FormSection from "../../components/FormSection.jsx";
import ResumePreview from "../../components/ResumePreview.jsx";
import { ResumeInfoContext } from "@/context/ResumeinfoContext.jsx";

const ResumeEdit = () => {
  const { resumeId } = useParams(); // Get the resumeId from the URL
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection/>
        <ResumePreview/>
     </div>
    </ResumeInfoContext.Provider>
    
  );
};

export default ResumeEdit;
