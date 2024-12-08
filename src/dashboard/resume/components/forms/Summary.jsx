import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeinfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi.js'
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AiModel'

const prompt = "Job Title - {jobTitle},Depends on job title give me a summary for my resume within 4-5 lines in JSON format with field 'experienceLevel' and 'summary' with different Experience Level for fresher , Mid-Level , Experienced , please maintain field in json format - 'experienceLevel' , 'summary'";
const Summary = ({enabledNext}) => {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList,setAiGeneratedSummaryList] = useState();


    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])

    const GenerateSummaryFromAI = async()=>{
        setLoading(true);
        const PROMT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
        console.log(PROMT);
        const result = await AIChatSession.sendMessage(PROMT);
        console.log(result.response.text());
        setAiGeneratedSummaryList(JSON.parse([result.response.text()]))
        setLoading(false);

    }

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

      <form className='mt-7' onSubmit={onSave} >
        <div className='flex justify-between items-end'>
            <label >Add Summary</label>
            <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} type="button" size="sm" className="border-primary text-primary"><Brain className='h-4 w-4' />Generate from AI</Button>
            
        </div>
        <Textarea className ="mt-5" required onChange={(e)=>setSummary(e.target.value)}/>
        <div className='mt-2 flex justify-end'>
        <Button disabled={loading} 
            type="submit">{loading?<LoaderCircle className='animate-spin'/>:"Save"}</Button>
        </div>
      </form>

        {aiGeneratedSummaryList && <div>
            <h2 className='font-bold text-lg'>Suggestions </h2>
            {aiGeneratedSummaryList.map((item,index)=>(
                <div key={index}>
                    <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>
  )
}
 
export default Summary