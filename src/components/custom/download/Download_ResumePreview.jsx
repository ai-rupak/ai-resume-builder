import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye, EyeIcon, X } from "lucide-react";
import PersonalDetailPreview from "@/dashboard/resume/components/preview/PersonalDetailPreview";
import SummaryPreview from "@/dashboard/resume/components/preview/SummaryPreview";
import ExperiencePreview from "@/dashboard/resume/components/preview/ExperiencePreview";
import ProjectsPreview from "@/dashboard/resume/components/preview/ProjectsPreview";
import EducationalPreview from "@/dashboard/resume/components/preview/EducationalPreview";
import SkillsPreview from "@/dashboard/resume/components/preview/SkillsPreview";
import  html2pdf  from "html2pdf.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const Download_ResumePreview = () => {

    const resumeRef = useRef(null);

    const handleDownloadPDF = () => {
        const element = resumeRef.current;
        
        // Dynamically add page breaks
        const addPageBreaks = () => {
            const a4Height = 1123; // A4 height in pixels at 300 DPI
            const sections = element.children;
            
            let currentHeight = 0;
            for (let section of sections) {
                currentHeight += section.offsetHeight;
                
                if (currentHeight > a4Height) {
                    section.classList.add('page-break');
                    currentHeight = section.offsetHeight;
                }
            }
        };

        addPageBreaks();

        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${resumeInfo?.personalDetail?.firstName || 'Resume'}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            pagebreak: { mode: 'css', before: '.page-break' }
        };
        
        html2pdf().set(opt).from(element).save();
    };

      const handleDownloadWord = () => {
        // Use mammoth.js or docx library
        import('docx').then(({ Document, Packer, Paragraph, TextRun }) => {
          const doc = new Document({
            sections: [{
              children: [
                new Paragraph({
                  children: [
                    new TextRun(resumeInfo.personalDetail?.firstName),
                    // Add more content from resumeInfo
                  ]
                })
              ]
            }]
          });
      
          Packer.toBlob(doc).then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${resumeInfo.personalDetail?.firstName}_Resume.docx`;
            link.click();
          });
        });
      };


  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <>
      <div className="lg:pl-8 flex flex-col h-full ">
        {/* <div id="no-print">
          
          </div> */}
          <div id="resume-content">

          
        <div className="relative aspect-[5/5] border-black border-[1px] rounded-none overflow-y-auto flex-1 ">
            <div
                className="h-full p-4 "
                style={{ borderColor: resumeInfo?.themeColor }} 
            >
                <div ref={resumeRef} className="resume-content">
            <div className="resume-section">
                <PersonalDetailPreview resumeInfo={resumeInfo} />
                <SummaryPreview resumeInfo={resumeInfo} />
            </div>
            <div className="resume-section">
                <ExperiencePreview resumeInfo={resumeInfo} />
                <ProjectsPreview resumeInfo={resumeInfo} />
            </div>
            <div className="resume-section">
                <EducationalPreview resumeInfo={resumeInfo} />
                <SkillsPreview resumeInfo={resumeInfo} />
            </div>
        </div>
            </div>
            </div>
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}
            className='rounded-none border-[#0A1F44]'>
            Preview <EyeIcon/>
          </Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className="bg-teal-600 hover:bg-teal-700 rounded-none">
                <Download className="w-4 h-4 mr-2"/> Download
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDownloadPDF}>
                Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadWord}>
                Download Word
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> */}
                <Button 
        className="bg-teal-600 hover:bg-teal-700 rounded-none"
        onClick={handleDownloadPDF}
        >
        <Download className="w-4 h-4 mr-2"/> Download PDF
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

export default Download_ResumePreview;
