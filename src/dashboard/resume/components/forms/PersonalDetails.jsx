import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const PersonalDetails = ({enabledNext}) => {

  const params = useParams();
  const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    console.log(params)
  },[])

  const handleInputChange = (e) =>{
    enabledNext(false);
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
    setResumeInfo({
      ...resumeInfo , [name]:value
    })
  }
  const onSave = (e)=>{
    e.preventDefault();
    setLoading(true);
    
    const data = {
      data:formData
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Details Updated")

    },(error)=>{
      setLoading(false);
    })
  }

  return (
    <div  className='p-5 shadow-lg rounded-sm border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get started with the basic information </p>

      <form  onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input name="firstName" onChange={handleInputChange} defaultValue={resumeInfo?.firstName} required/>
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input name="lastName" onChange={handleInputChange} defaultValue={resumeInfo?.lastName} required/>
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input name="jobTitle" onChange={handleInputChange} defaultValue={resumeInfo?.jobTitle} required/>
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input name="address" onChange={handleInputChange} defaultValue={resumeInfo?.address} required/>
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input name="phone" onChange={handleInputChange} defaultValue={resumeInfo?.phone} required/>
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input name="email" onChange={handleInputChange} defaultValue={resumeInfo?.email} required/>
          </div>
        </div>
          <div className='mt-3 flex justify-end'>
            <Button disabled={loading} 
            type="submit">{loading?<LoaderCircle className='animate-spin'/>:"Save"}</Button>
          </div>
      </form>
    </div>
  )
}

export default PersonalDetails