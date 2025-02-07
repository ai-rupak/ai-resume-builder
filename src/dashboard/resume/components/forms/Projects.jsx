import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeinfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResumeApi from "./../../../../../service/GlobalApi";

const defaultProjectsField = {
  projectTitle: "",
  description: "",
  technologies: "",
  link: "",
};

const Projects = () => {
  const params = useParams();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projectsList, setProjectsList] = useState([defaultProjectsField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (params?.resumeId) {
          setInitialLoading(true);
          const response = await ResumeApi.getResumeById(params.resumeId);
          const resumeData = response.data?.data || response.data || {};
          
          if (resumeData?.projects && resumeData.projects.length > 0) {
            setProjectsList(resumeData.projects);
          } else {
            setProjectsList([defaultProjectsField]);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch project data.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProjects();
  }, [params?.resumeId]);

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      projects: projectsList,
    }));
  }, [projectsList, setResumeInfo]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...projectsList];
    updatedList[index][name] = value;
    setProjectsList(updatedList);
  };

  const addNewProject = () => {
    setProjectsList((prev) => [...prev, defaultProjectsField]);
  };

  const removeProject = () => {
    if (projectsList.length > 1) {
      setProjectsList((prev) => prev.slice(0, -1));
    }
  };

  const validateProject = (project) => {
    return (
      project.projectTitle &&
      project.description &&
      project.technologies 
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const isValid = projectsList.every(validateProject);
      if (!isValid) {
        toast.error(
          "Please fill in all required fields (Project Title, Description, Technologies)"
        );
        setLoading(false);
        return;
      }

      const formattedProjects = projectsList.map((project) => ({
        projectTitle: project.projectTitle,
        description: project.description,
        technologies: project.technologies,
        link: project.link || undefined,
      }));

      const payload = {
        projects: formattedProjects,
      };

      await ResumeApi.updateResume(params.resumeId, payload);
      toast.success("Projects updated successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Error updating project details");
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
      <h2 className="text-2xl font-bold text-[#0A1F44] mb-4">PROJECTS</h2>
      <p className='text-gray-600 mb-6'>Add your project details</p>
      <div>
        {projectsList.map((item, index) => (
          <div key={index} className="space-y-3 border p-2">
            <div className="grid grid-cols-2 mt-5 gap-4">
              <div className="col-span-1 space-y-2">
                <label className="block">PROJECT TITLE <span className='text-red-500'>*</span></label>
                <Input
                  name="projectTitle"
                  value={item.projectTitle || ""}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">DESCRIPTION <span className='text-red-500'>*</span></label>
                <Textarea
                  name="description"
                  value={item.description || ""}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">TECHNOLOGIES <span className='text-red-500'>*</span></label>
                <Input
                  name="technologies"
                  value={item.technologies || ""}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="rounded-none shadow-none border-[#0A1F44]"
                />
              </div>
              <div className="space-y-2">
                <label className="block">LINK</label>
                <Input
                  name="link"
                  value={item.link || ""}
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
            onClick={addNewProject}
            className="text-black border-[#0A1F44] rounded-none"
            type="button"
          >
            + Add More Projects
          </Button>
          <Button
            variant="outline"
            onClick={removeProject}
            className="text-black border-[#0A1F44] rounded-none"
            type="button"
            disabled={projectsList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={handleSave} disabled={loading}
        className='bg-[#092347ee] rounded-none hover:bg-[#092347ee]'>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Projects;