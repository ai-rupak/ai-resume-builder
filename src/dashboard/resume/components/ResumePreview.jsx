import { ResumeInfoContext } from "@/context/ResumeinfoContext";
import React, { useContext, useState } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectsPreview from "./preview/ProjectsPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeIcon, X } from "lucide-react";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <>
      <div className="lg:pl-8 flex flex-col h-full">
        <div id="no-print">
          <div className="bg-white p-4 rounded-lg border mb-4">
            <div className="text-sm text-gray-600 mb-2 text-center">
              Our Resume Builder delivers results ¹
            </div>
            <div className="flex items-center text-emerald-600 font-medium justify-center">
              <span className="mr-2">50%</span>
              <span>Increase in dream job prospects</span>
            </div>
            </div>
          </div>
        <div className="relative aspect-[5/5] border-black border-[1px] rounded-none overflow-y-auto flex-1 ">
          <div
            className="h-full p-4 "
            style={{ borderColor: resumeInfo?.themeColor }}
          >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <ProjectsPreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <SkillsPreview resumeInfo={resumeInfo} />
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}
            className='rounded-none border-[#0A1F44]'>
            Preview <EyeIcon/>
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-none">
            Next: Education
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsPreviewOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="shadow-lg h-full p-4 border-t-[20px]"
              style={{ borderColor: resumeInfo?.themeColor }}
            >
              <PersonalDetailPreview resumeInfo={resumeInfo} />
              <SummaryPreview resumeInfo={resumeInfo} />
              <ExperiencePreview resumeInfo={resumeInfo} />
              <ProjectsPreview resumeInfo={resumeInfo} />
              <EducationalPreview resumeInfo={resumeInfo} />
              <SkillsPreview resumeInfo={resumeInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumePreview;
