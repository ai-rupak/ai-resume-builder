import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useContext } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import ResumeApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const defaultExperienceField = {
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  description: ""
};

function Experience({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([defaultExperienceField]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (params?.resumeId) {
        setInitialLoading(true);
        try {
          const response = await ResumeApi.getResumeById(params.resumeId);
          const resumeData = response.data?.data || response.data || {};
          
          if (resumeData?.experience && resumeData.experience.length > 0) {
            // Format dates from ISO to YYYY-MM-DD for input fields
            const formattedExperience = resumeData.experience.map(exp => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
              endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''
            }));
            setExperienceList(formattedExperience);
            setResumeInfo((prev) => ({
              ...prev,
              experience: formattedExperience,
            }));
          } else {
            setExperienceList([defaultExperienceField]);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          toast.error("Error loading experience data");
        } finally {
          setInitialLoading(false);
        }
      }
    };
  
    fetchData();
  }, [params?.resumeId, setResumeInfo]);

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experienceList,
    }));
    enabledNext?.(experienceList.length > 0);
  }, [experienceList, setResumeInfo, enabledNext]);
  
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: value
      };
      return updated;
    });
  };

  const handleRichTextEditor = (value, name, index) => {
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: value
      };
      return updated;
    });
  };

  const handleAddExperience = () => {
    setExperienceList(prev => [...prev, defaultExperienceField]);
  };

  const handleRemoveExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(prev => prev.slice(0, -1));
    }
  };

  const validateExperience = (experience) => {
    return experience.jobTitle && 
           experience.company && 
           experience.startDate;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate required fields
      const isValid = experienceList.every(validateExperience);
      if (!isValid) {
        toast.error("Please fill in all required fields (Job Title, Company, and Start Date)");
        return;
      }

      // Format the experience data to match the schema
      const formattedExperience = experienceList.map(exp => ({
        jobTitle: exp.jobTitle,
        company: exp.company,
        startDate: new Date(exp.startDate).toISOString(),
        endDate: exp.endDate ? new Date(exp.endDate).toISOString() : undefined,
        description: exp.description || ''
      }));

      const payload = {
        experience: formattedExperience
      };

      console.log('Saving payload:', payload);
      const response = await ResumeApi.updateResume(params?.resumeId, payload);
      console.log('Save response:', response);
      toast.success("Experience details updated successfully");
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Error updating experience details");
    } finally {
      setLoading(false);
    }
  };
  
  if (initialLoading) {
    return (
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10 flex justify-center items-center">
        <LoaderCircle className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className=" mt-10">
      <h2 className="text-2xl font-bold text-[#0A1F44] mb-4">PROFESSIONAL EXPERIENCE</h2>
      <p className="text-gray-600 mb-6">Add your previous job experience</p>

      <div className="space-y-6">
        {experienceList.map((experience, index) => (
          <div key={index} className="border p-2 ">
            <div className="grid grid-cols-2 mt-5 gap-4">
              <div className="space-y-2">
                <label className="block">POSITION TITLE <span className='text-red-500'>*</span></label>
                <Input
                  name="jobTitle"
                  value={experience.jobTitle || ''}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">Company Name <span className='text-red-500'>*</span></label>
                <Input
                  name="company"
                  value={experience.company || ''}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">START DATE<span className='text-red-500'>*</span></label>
                <Input
                  name="startDate"
                  type="date"
                  value={experience.startDate || ''}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2"> 
                <label className="block">END DATE</label>
                <Input
                  name="endDate"
                  type="date"
                  value={experience.endDate || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="col-span-2" >
                <RichTextEditor
                  index={index}
                  value={experience.description || ''}
                  onRichTextEditorChange={handleRichTextEditor}
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleAddExperience}
            className="text-black border-[#0A1F44] rounded-none"
            type="button"
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            onClick={handleRemoveExperience}
            className="text-black border-[#0A1F44] rounded-none"
            type="button"
            disabled={experienceList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={handleSave} disabled={loading}
        className='bg-[#092347ee] hover:[#092347ee] rounded-none'>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Experience;