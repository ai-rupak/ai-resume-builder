import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeinfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeApi from "./../../../../../service/GlobalApi";
import { toast } from "react-toastify";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const defaultSkillField = {
  name: "",
  rating: 0
};

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const params = useParams();
  const [skillsList, setSkillsList] = useState([defaultSkillField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      if (params?.resumeId) {
        setInitialLoading(true);
        try {
          const response = await ResumeApi.getResumeById(params.resumeId);
          const resumeData = response.data?.data || response.data || {};
          
          if (resumeData?.skills && resumeData.skills.length > 0) {
            setSkillsList(resumeData.skills);
          } else {
            setSkillsList([defaultSkillField]);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          toast.error("Error loading skills data");
        } finally {
          setInitialLoading(false);
        }
      }
    };

    fetchData();
  }, [params?.resumeId]);

  // Update context when skills list changes
  useEffect(() => {
    setResumeInfo(prev => ({
      ...prev,
      skills: skillsList
    }));
  }, [skillsList, setResumeInfo]);

  const handleChange = (index, key, value) => {
    setSkillsList(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value
      };
      return updated;
    });
  };

  const addNewSkill = () => {
    setSkillsList(prev => [...prev, defaultSkillField]);
  };

  const removeSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList(prev => prev.slice(0, -1));
    }
  };

  const validateSkills = (skill) => {
    return skill.name && skill.rating > 0;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate required fields
      const isValid = skillsList.every(validateSkills);
      if (!isValid) {
        toast.error("Please fill in both skill name and rating");
        setLoading(false);
        return;
      }

      // Format the skills data to match the schema
      const formattedSkills = skillsList.map(skill => ({
        name: skill.name,
        rating: skill.rating
      }));

      const payload = {
        skills: formattedSkills
      };

      console.log('Saving payload:', payload);
      await ResumeApi.updateResume(params.resumeId, payload);
      toast.success("Skills updated successfully");
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Error updating skills");
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
    <div className="p-5 shadow-lg rounded-sm border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your professional skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg  flex gap-5 w-full">
            <div className="cols-span-1">
              <label className="text-sm">Skill Name *</label>
              <Input
                value={item?.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="Enter skill name"
                required
              />
            </div>
            <div className="cols-span-1">
              <label className="text-sm">Skill Rating *</label>
              <div className="w-48">
                <Rating
                  value={item?.rating}
                  onChange={(value) => handleChange(index, 'rating', value)}
                  style={{ maxWidth: 200 }}
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
            onClick={addNewSkill}
            className="text-primary"
            type="button"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={removeSkill}
            className="text-primary"
            type="button"
            disabled={skillsList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Skills;