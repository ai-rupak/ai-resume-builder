import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '/service/GlobalApi.js';

const EditResume = () => {
    const {resumeId} = useParams();
    const [resumeInfo, setResumeInfo] = useState();

    useEffect(()=>{
      // setResumeInfo(dummy);
      GetResumeInfo();
    },[])

    const GetResumeInfo = ()=>{
      GlobalApi.GetResumeById(resumeId).then((res)=>{
        setResumeInfo(res.data.data);
        console.log(res.data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection/>
        <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume