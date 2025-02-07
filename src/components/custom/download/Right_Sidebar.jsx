import { Button } from "@/components/ui/button";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import { Download, Mail, Printer } from "lucide-react";
import React from "react";

const Right_Sidebar = () => {
  return (
    <div className="flex-1 flex flex-col">
     <div>
       <h2 className="text-center text-2xl font-medium">Congratulations!</h2>
       <p className="text-center text-gray-400">Your Ultimate AI generates Resume is ready!</p>
     </div>
     <ResumePreview className="overflow-y-auto flex-1" />
     <div className="absolute right-6 top-[170px] space-y-2 w-1/6">
       <Button className="w-full" variant="outline">
         <Download className="mr-2 h-4 w-" />
         Download
       </Button>
       <Button className="w-full" variant="outline">
         <Printer className="mr-2 h-4 w-4" />
         Print
       </Button>
       <Button className="w-full" variant="outline">
         <Mail className="mr-2 h-4 w-4" />
         Email
       </Button>
       <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
         Finish resume
       </Button>
     </div>
   </div>
  );
};

export default Right_Sidebar;
