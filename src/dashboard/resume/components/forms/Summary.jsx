import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeinfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const Summary = ({enabledNext}) => {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();


    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        },[summary])
    })
    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);
    
    const data = {
      data:{
        summary:summary
      }
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

      <form className='mt-7'onSubmit={onSave} >
        <div className='flex justify-between items-end'>
            <label >Add Summary</label>
            <Button variant="outline" size="sm" className="border-primary text-primary"><Brain className='h-4 w-4' />Generate from AI</Button>
            
        </div>
        <Textarea className ="mt-5" required onChange={(e)=>setSummary(e.target.value)}/>
        <div className='mt-2 flex justify-end'>
        <Button disabled={loading} 
            type="submit">{loading?<LoaderCircle className='animate-spin'/>:"Save"}</Button>
        </div>
      </form>

    </div>
  )
}

export default Summary