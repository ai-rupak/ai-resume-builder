import {
  ArrowBigDown,
  Clock,
  Copy,
  Download,
  Edit3,
  Eye,
  Loader2Icon,
  MoreVertical,
  Notebook,
  Pen,
  Trash,
  Trash2,
} from "lucide-react";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ResumeApi from "./../../../service/GlobalApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
// import GlobalApi from "./../../../service/GlobalApi";

const ResumeCardItem = ({ resume, refreshData }) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    setLoading(true);
    ResumeApi.deleteResume(resume.resumeId).then(
      (resp) => {
        console.log(resp);
        toast.success("Resume Deleted Successfully");
        // refreshData();
        setLoading(false);
        setOpenAlert(false);
        // navigate("/dashboard");
      },
      (error) => {
        console.log(error);
        toast.error("Error while deleting resume");
        setLoading(false);
      }
    );
  };
  return (
    
    <div className="border-[#0A1F44] border-[1px] rounded-md p-6 ">
      <div className="flex justify-between items-center mb-4 hover:bg-gray-100 rounded-md p-2 transition-all duration-300">
        <div>
          <p className="text-purple-500 font-medium mb-1">RESUME #</p>
          <h3 className="text-xl font-medium mb-1">{resume.title}</h3>
          <p className="text-gray-500 text-sm">Edited 3 hours ago</p>
        </div>
        <div>
          <button className="text-gray-400 px-3 py-1 rounded-md border border-gray-200 text-sm">
            Add a label
          </button>
          <button className="ml-2">
            <Edit3 className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* <div className="mb-6">
        <img
          src="/cv.png"
          alt="Document preview"
          className="w-full border rounded-lg"
        />
      </div> */}

      <div className="space-y-4 hover:bg-slate-100 transition-all duration-300 p-4">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full" onClick={() => navigate("/dashboard/resume/" + resume.resumeId + "/edit")}>
          <Edit3 className="w-5 h-5 text-teal-500" />
          <span className="text-gray-600">Edit</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full" onClick={() => navigate("/my-resume/" + resume.resumeId + "/view")}>
          <Eye className="w-5 h-5 text-teal-500" />
          <span className="text-gray-600">View</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full" onClick={() => navigate("/my-resume/" + resume.resumeId + "/view")}>
          <Download className="w-5 h-5 text-teal-500" />
          <span className="text-gray-600">Download</span>
        </button>
        <button className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full" onClick={() => setOpenAlert(true)}>
          <Trash2 className="w-5 h-5" />
          <span>Delete</span>
        </button>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          Created on {new Date(resume.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",})}
        </div>
        {/* <button className="text-gray-500 text-sm flex items-center gap-1">
          <History className="w-4 h-4" />
          View old versions
        </button> */}
      </div>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    {/* </div> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate("/dashboard/resume/" + resume.resumeId + "/edit")
              }
            >
              <Pen />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate("/my-resume/" + resume.resumeId + "/view")
              }
            >
              <Eye />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate("/my-resume/" + resume.resumeId + "/view")
              }
            >
              <Download />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        
         */}


      
    </div>
  );
};

export default ResumeCardItem;
