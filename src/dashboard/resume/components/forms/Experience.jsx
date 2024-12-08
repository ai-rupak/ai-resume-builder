import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'

const formField ={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}
const Experience = () => {
    const [experienceList , setExperienceList] = useState([formField])
    const handleChange=(index,event)=>{
         
    }
    const AddNewExperience=()=>{
        setExperienceList([...experienceList,formField])
    }
    const RemoveExperience =()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

  return (
    <div  className='p-5 shadow-lg rounded-sm border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Professional Experience</h2>
      <p>Add your previous job experience</p>
        <div>
            {experienceList.map((item,index)=>(
                <div >
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-sm'>Position Title</label>
                            <Input onChange={(event)=>handleChange()} name="title" />
                        </div>
                        <div>
                            <label className='text-sm'>Company Name</label>
                            <Input onChange={(event)=>handleChange()} name="companyName" />
                        </div>
                        <div>
                            <label className='text-sm'>City</label>
                            <Input onChange={(event)=>handleChange()} name="city"/>
                        </div>
                        <div>
                            <label className='text-sm'>State</label>
                            <Input onChange={(event)=>handleChange()} name="state" />
                        </div>
                        <div>
                            <label className='text-sm'>Start Date</label>
                            <Input onChange={(event)=>handleChange()} name="startDate" type="date" />
                        </div>
                        <div>
                            <label className='text-sm'>End Date</label>
                            <Input onChange={(event)=>handleChange()} name="endDate" type="date"/>
                        </div>
                        <div className='col-span-2'>
                            <RichTextEditor/>

                        </div>
                    </div>    
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>

                <Button variant="outline" onClick={AddNewExperience}>+ Add More Experience</Button>
                <Button variant="outline" onClick={RemoveExperience}>- Remove</Button>

            </div>
            <Button>Save</Button>
        </div>
    </div>
  )
}

export default Experience