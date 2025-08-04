import React, { useContext, useState } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectsPreview from "./preview/ProjectsPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, X } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <>
      <div className="lg:pl-8 flex flex-col h-full">
        <div id="no-print">
          <div className="bg-white p-3 sm:p-4 rounded-lg border mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-gray-600 mb-2 text-center">
              Our Resume Builder delivers results ¹
            </div>
            <div className="flex items-center text-emerald-600 font-medium justify-center">
              <span className="mr-2 text-sm sm:text-base">50%</span>
              <span className="text-sm sm:text-base">Increase in dream job prospects</span>
            </div>
            </div>
          </div>
        <div className="relative aspect-[4/5] sm:aspect-[5/5] border-black border-[1px] rounded-none overflow-y-auto flex-1">
          <div
            className="h-full p-2 sm:p-3 md:p-4"
            style={{ borderColor: resumeInfo?.themeColor }}
          >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <ProjectsPreview resumeInfo={resumeInfo} />
            <SkillsPreview resumeInfo={resumeInfo} />
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 sm:mt-6 md:mt-8">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}
            className='rounded-none border-[#0A1F44] text-sm sm:text-base px-3 sm:px-4 py-2'>
            Preview <Eye className="w-4 h-4 ml-1 sm:ml-2"/>
          </Button>
          {/* <Button className="bg-teal-600 hover:bg-teal-700 rounded-none">
            Next: Education
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button> */}
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg relative w-full max-w-xs sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 z-10"
              onClick={() => setIsPreviewOpen(false)}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div
              className="shadow-lg h-full p-2 sm:p-3 md:p-4 border"
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