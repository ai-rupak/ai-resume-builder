import {
  ArrowBigDown,
  Download,
  Eye,
  Loader2Icon,
  MoreVertical,
  Notebook,
  Pen,
  Trash,
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
// import GlobalApi from "./../../../service/GlobalApi";


const ResumeCardItem = ({ resume ,refreshData}) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    setLoading(true);
    ResumeApi.deleteResume(resume.resumeId).then((resp) => {
      console.log(resp);
      toast.success("Resume Deleted Successfully");
      // refreshData();
      setLoading(false);
      setOpenAlert(false);
      // navigate("/dashboard");
    },(error)=>{
      console.log(error);
      toast.error("Error while deleting resume");
      setLoading(false);
    });
  }
  return (
    <div>
      <Link to={"/dashboard/resume/" + resume.resumeId + "/edit"}>
        <div>
          <div
            className="p-14 bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4"
            // style={{
            //   borderColor: resume?.themeColor,
            // }}
          >
            <div
              className="flex 
        items-center justify-center h-[180px] "
            >
              {/* <Notebook/> */}
              <img src="/cv.png" width={80} height={80} />
            </div>
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm text-black">{resume.title}</h2>
        <DropdownMenu>
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
            <DropdownMenuItem onClick={()=>setOpenAlert(true)}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
              <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>{loading?<Loader2Icon className="animate-spin"/>:'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

// export default ResumeCardItem;
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';

// const ResumeCardItem = ({ resume, onClick }) => {
//   return (
//     <div
//       className="p-5 border rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
//       onClick={onClick}
//     >
//       <h3 className="font-bold text-lg">{resume.title}</h3>
//       {/* <p className="text-sm text-gray-500">{resume.resumeId}</p> */}

//       <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
//       <Button variant="outline" className="mt-2">
//         Edit
//       </Button>
//       </Link>
//     </div>
//   );
// };

export default ResumeCardItem;
