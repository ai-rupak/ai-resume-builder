import React, { useState } from "react";
import { PlusSquare, Loader2 } from "lucide-react";
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

const AddResume = () => {
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
    <div>
      {/* Clickable card to open dialog */}
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <div className="bg-black bg-opacity-10 hover:bg-black hover:text-white p-5 rounded-full">
          <PlusSquare />
        </div>
      </div>

      {/* Dialog for adding a new resume */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
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
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
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
