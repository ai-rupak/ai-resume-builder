import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeinfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const params=useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  useEffect(() => {
    resumeInfo&&setEducationalList(resumeInfo?.education);
  
  }, []);
  
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name,value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList });
  
    
  }, [educationalList]);
  
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })

  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList.map(({ id, ...rest }) => rest)
    })
  },[educationalList])

  useEffect(()=>{
    setEducationalList(resumeInfo?.education)
  },[resumeInfo])
  return (
    <div className="p-5 shadow-lg rounded-sm border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-sm">University Name</label>
                <Input
                  name="universityName"
                  defaultValue={item?.universityName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-sm">Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} 
                defaultValue={item?.degree} />
              </div>
              <div>
                <label className="text-sm">Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)}
                defaultValue={item?.major} />
              </div>
              <div>
                <label className="text-sm">Start Date</label>
                <Input
                type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="text-sm">End Date</label>
                <Input
                type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                  
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
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
  );
};

export default Education;
