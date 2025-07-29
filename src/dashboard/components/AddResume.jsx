import React, { useState } from "react";
import { PlusSquare, Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResumeApi from "../../../service/GlobalApi.js";
// import GlobalApi from "../../../service/GlobalApi.js";

const AddResume = ({type,tip}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    if (!resumeTitle.trim()) {
      toast.error("Resume title is required!");
      return;
    }

    setLoading(true);
    const resumeId = uuidv4();

    const payload = {
      title: resumeTitle,
      resumeId: resumeId,
    };

    try {
      // Call API to create a new resume
      const response = await ResumeApi.createResume(payload);

      if (response?.data?.data?.resumeId) {
        toast.success("Resume created successfully!");

        // Navigate to the resume edit page
        navigate(`/dashboard/resume/${response.data.data.resumeId}/edit`);
      } else {
        toast.error("Unexpected API response. Please try again.");
        console.error("API Response:", response.data);
      }
    } catch (error) {
      toast.error("Failed to create resume. Please try again.");
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-[#092347ee] border rounded-lg p-4 sm:p-6 cursor-pointer group">
      {/* Clickable card to open dialog */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="w-full sm:w-48 md:w-56 lg:w-64 h-24 sm:h-28 md:h-32 border-[#00C8A0] border bg-[#E8F9F6] rounded-lg flex items-center justify-center group-hover:bg-[#d7f5f0] transition-colors duration-200 flex-shrink-0"
         onClick={() => setOpenDialog(true)}>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-md" >
            <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-medium mb-2">New  {type === "resume" ? "resume" : "cover letter"}</h3>
          
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-medium">TIP: {tip} </span> 
            
          </p>
        </div>
      </div>

      {/* Dialog for adding a new resume */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Developer"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-5">
              <Button
                variant="ghost"
                className="w-full sm:w-auto"
                onClick={() => {
                  setResumeTitle("");
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle.trim() || loading}
                onClick={handleCreateResume}
                className="w-full sm:w-auto"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;