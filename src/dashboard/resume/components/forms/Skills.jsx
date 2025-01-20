import React, { useContext, useState,useEffect } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeinfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Skills = () => {
    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId} = useParams();
    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    useEffect(() => {
        resumeInfo&&setSkillsList(resumeInfo?.Skills);
      
        
      }, []);
    const handleChange=(index,key,value)=>{
        const newEntries=skillsList.slice();
        newEntries[index][key]=value;
        setSkillsList(newEntries)
    }
    const AddNewSkill=()=>{
        setSkillsList([...skillsList,{name:'',rating:0}])
    }
    const RemoveSkill=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                Skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast.success('Details updated !')
        },(error)=>{
            setLoading(false);
            toast.error('Server Error, Try again!')
        })
    }
    useEffect(() => {
      setResumeInfo({ ...resumeInfo, skills: skillsList });
    }, [skillsList])
    
  return (

    <div className="p-5 shadow-lg rounded-sm border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional skils</p>
      <div>
        {skillsList.map((item,index)=>(
            <div className='flex justify-between mb-2 border rounded-lg p-3 ' key={index}>
                <div>
                    <label className='text-sm'>Name</label>
                    <Input className="w-full"
                    defaultValue={item.name}
                    onChange={(e)=>handleChange(index,'name',e.target.value)} />
                </div>
                <Rating style={{ maxWidth: 120 }} value={item.rating} 
                onChange={(v)=>handleChange(index,'rating',v)}/>

            </div>
        ))}
    </div>
    <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkill}
            className="text-primary"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkill}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
        </Button>
      </div>
    </div>
    
  )
}

export default Skills