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

const ResumeCardItem = ({ resume, refreshData ,resumeList,setResumeList}) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const onDelete = () => {
    setLoading(true);
    ResumeApi.deleteResume(resume.resumeId).then(
      (resp) => {
        console.log(resp);
        toast.success("Resume Deleted Successfully");
        setResumeList((prevList) =>
          prevList.filter((item) => item.resumeId !== resume.resumeId)
        );
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        console.log(error);
        toast.error("Error while deleting resume");
        setLoading(false);
      }
    );
  };

  return (
    <div className="border-[#0A1F44] border-[1px] rounded-lg p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3 sm:gap-4 hover:bg-gray-50 rounded-md p-2 sm:p-3 transition-all duration-300">
        <div className="flex-1 min-w-0">
          <p className="text-purple-500 font-medium mb-1 text-xs sm:text-sm uppercase tracking-wide">
            RESUME #
          </p>
          <h3 className="text-lg sm:text-xl font-medium mb-1 text-gray-900 truncate">
            {resume.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            Created At:{" "}
            {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        
        {/* Action buttons - Mobile: Stacked, Desktop: Horizontal */}
        {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
          <button className="text-gray-400 px-3 py-1.5 sm:py-1 rounded-md border border-gray-200 text-xs sm:text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto text-center">
            Add a label
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors self-end sm:self-auto">
            <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </button>
        </div> */}
      </div>

      {/* Action Buttons Section */}
      <div className="space-y-2 sm:space-y-3 hover:bg-slate-50 transition-all duration-300 p-3 sm:p-4 rounded-md">
        <button 
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full p-2 rounded-md hover:bg-white transition-all duration-200" 
          onClick={() => navigate("/dashboard/resume/" + resume.resumeId + "/edit")}
        >
          <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
          <span className="text-sm sm:text-base font-medium">Edit</span>
        </button>
        
        <button 
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full p-2 rounded-md hover:bg-white transition-all duration-200" 
          onClick={() => navigate("/my-resume/" + resume.resumeId + "/view")}
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
          <span className="text-sm sm:text-base font-medium">View</span>
        </button>
        
        <button 
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full p-2 rounded-md hover:bg-white transition-all duration-200" 
          onClick={() => navigate("/my-resume/" + resume.resumeId + "/view")}
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
          <span className="text-sm sm:text-base font-medium">Download</span>
        </button>
        
        <button 
          className="flex items-center gap-3 text-red-600 hover:text-red-700 w-full p-2 rounded-md hover:bg-red-50 transition-all duration-200" 
          onClick={() => setOpenAlert(true)}
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base font-medium">Delete</span>
        </button>
      </div>

      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="mx-4 sm:mx-0 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              This action cannot be undone. This will permanently delete your resume 
              "{resume.title}" and remove all its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel 
              onClick={() => setOpenAlert(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete} 
              disabled={loading}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Resume
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeCardItem;