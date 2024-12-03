import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'

const FormSection = () => {

  const [activeFormIndex , setActiveFormIndex] = useState(1);
  const [enabledNext, setEnabledNext ] = useState(false);
  return (

    <div>
      <div className='flex justify-between items-center'>
        <Button className='flex gap-2'variant="outline" size="sm"><LayoutGrid/> Theme</Button>
          <div className='flex gap-2'>
            {activeFormIndex>1 && <Button onClick={()=>setActiveFormIndex(activeFormIndex-1)} size="sm" ><ArrowLeft/></Button>}
            <Button disabled={!enabledNext} onClick={()=>setActiveFormIndex(activeFormIndex+1)} className='flex gap-2' size="sm" >Next <ArrowRight/> </Button>
          </div>
      </div>
      
      {activeFormIndex==1 ? < PersonalDetails enabledNext={(v)=>setEnabledNext(v)} /> :null}
    </div>
  )
}

export default FormSection