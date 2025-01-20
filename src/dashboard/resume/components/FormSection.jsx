import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import PersonalDetail from './forms/PersonalDetail';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

const FormSection = () => {

  const [activeFormIndex , setActiveFormIndex] = useState(1);
  const [enabledNext, setEnabledNext ] = useState(false);
  const {resumeId} = useParams();
  return (

    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
        <Link to={"/dashboard"}><Button size="sm"><Home/></Button></Link>
        <ThemeColor/>
        {/* <Button className='flex gap-2'variant="outline" size="sm"><LayoutGrid/> Theme</Button> */}
        
        </div>
          <div className='flex gap-2'>
            {activeFormIndex>1 && <Button onClick={()=>setActiveFormIndex(activeFormIndex-1)} size="sm" ><ArrowLeft/>Prev</Button>}
            <Button disabled={!enabledNext} onClick={()=>setActiveFormIndex(activeFormIndex+1)} className='flex gap-2' size="sm" >Next <ArrowRight/> </Button>
          </div>
      </div>
      
      {activeFormIndex==1 ? < PersonalDetail enabledNext={(v)=>setEnabledNext(v)} /> :activeFormIndex==2
      ? <Summary enabledNext={(v)=>setEnabledNext(v)} />:
      activeFormIndex == 3 ? 
      <Experience/>
      :activeFormIndex== 4 ?
      <Education/>: 
      activeFormIndex==5 ?
      <Skills/>:
      activeFormIndex==6 ?
      <Navigate to={"/my-resume/"+resumeId +"/view"}/>:null  
    }

    </div>

  )
}

export default FormSection