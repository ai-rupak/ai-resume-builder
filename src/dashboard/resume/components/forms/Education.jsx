import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeApi from "./../../../../../service/GlobalApi";
import { toast } from "react-toastify";

const defaultEducationField = {
  universityName: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: ""
};

const Education = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const params = useParams();
  const [educationList, setEducationList] = useState([defaultEducationField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      if (params?.resumeId) {
        setInitialLoading(true);
        try {
          const response = await ResumeApi.getResumeById(params.resumeId);
          const resumeData = response.data?.data || response.data || {};
          
          if (resumeData?.education && resumeData.education.length > 0) {
            // Format dates from ISO to YYYY-MM-DD for input fields
            const formattedEducation = resumeData.education.map(edu => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
              endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : ''
            }));
            setEducationList(formattedEducation);
          } else {
            setEducationList([defaultEducationField]);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          toast.error("Error loading education data");
        } finally {
          setInitialLoading(false);
        }
      }
    };

    fetchData();
  }, [params?.resumeId]);

  // Update context when education list changes
  useEffect(() => {
    setResumeInfo(prev => ({
      ...prev,
      education: educationList
    }));
  }, [educationList, setResumeInfo]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setEducationList(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: value
      };
      return updated;
    });
  };

  const addNewEducation = () => {
    setEducationList(prev => [...prev, defaultEducationField]);
  };

  const removeEducation = () => {
    if (educationList.length > 1) {
      setEducationList(prev => prev.slice(0, -1));
    }
  };

  const validateEducation = (education) => {
    return education.universityName && 
           education.degree && 
           education.startDate;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate required fields
      const isValid = educationList.every(validateEducation);
      if (!isValid) {
        toast.error("Please fill in all required fields (University Name, Degree, and Start Date)");
        setLoading(false);
        return;
      }

      // Format the education data to match the schema
      const formattedEducation = educationList.map(edu => ({
        universityName: edu.universityName,
        degree: edu.degree,
        startDate: new Date(edu.startDate).toISOString(),
        endDate: edu.endDate ? new Date(edu.endDate).toISOString() : undefined,
        description: edu.description || ''
      }));

      const payload = {
        education: formattedEducation
      };

      console.log('Saving payload:', payload);
      await ResumeApi.updateResume(params.resumeId, payload);
      toast.success("Education details updated successfully");
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Error updating education details");
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
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-[#0A1F44] mb-4">EDUCATION</h2>
      <p className="text-gray-600 mb-6">Add your educational details</p>
      <div>
        {educationList.map((item, index) => (
          <div key={index} className="space-y-6 border p-2">
            <div className="grid grid-cols-2 mt-5 gap-4 ">
              <div className="space-y-2">
                <label className="block">UNIVERSITY NAME <span className='text-red-500'>*</span></label>
                <Input
                  name="universityName"
                  value={item.universityName || ''}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">DEGREE <span className='text-red-500'>*</span></label>
                <Input 
                  name="degree" 
                  value={item.degree || ''}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">START DATE <span className='text-red-500'>*</span></label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate || ''}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">END DATE</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="block">DESCRIPTION</label>
                <Textarea
                  name="description"
                  value={item.description || ''}
                  onChange={(e) => handleChange(e, index)}
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
            onClick={addNewEducation}
            className="text-black border-[#0A1F44] rounded-none"
            type="button"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={removeEducation}
            className="text-black border-[#0A1F44] rounded-none"
            type="button"
            disabled={educationList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={handleSave} disabled={loading}
        className='bg-[#092347ee] hover:bg-[#0A1F44] rounded-none'>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Education;