import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Edit2,
  Home,
  LayoutGrid,
} from "lucide-react";
import PersonalDetail from "./forms/PersonalDetail";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import ResumeApi from "./../../../../service/GlobalApi";
import { toast } from "react-toastify";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import Projects from "./forms/Projects";

const FormSection = ({
  activeFormIndex,
  setActiveFormIndex,
  enabledNext,
  setEnabledNext,
  resumeId,
}) => {
  // const [activeFormIndex, setActiveFormIndex] = useState(1);
  // const [enabledNext, setEnabledNext] = useState(false);
  // const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  if (!resumeId) {
    return (
      <div>Error: Resume ID not found. Please go back to the dashboard.</div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="mb-4 flex flex-row justify-between items-center">
        <Link
          to="/dashboard"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Go Back
        </Link>
        {/* <Button
          className="bg-white text-black hover:bg-black hover:text-white rounded-none shadow-none border border-black" 
          size="sm"
        >
          Title: {resumeInfo.title} {" "} <Edit2/>
        </Button> */}
        <ThemeColor />
        <div></div>
      </div>
      <div className="flex flex-row justify-between">
        {activeFormIndex > 1 && (
          <Button
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 rounded-none"
          >
            <ArrowLeft />
            Prev
          </Button>
        )}
        <Button
          disabled={!enabledNext}
          onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 rounded-none flex gap-2"
        >
          Next <ArrowRight />{" "}
        </Button>
      </div>
      <div className="mt-8 overflow-auto max-h-[calc(100vh-200px)]">
        {activeFormIndex == 1 ? (
          <PersonalDetail enabledNext={(v) => setEnabledNext(v)} />
        ) : activeFormIndex == 2 ? (
          <Summary enabledNext={(v) => setEnabledNext(v)} />
        ) : activeFormIndex == 3 ? (
          <Experience />
        ) : activeFormIndex == 4 ? (
          <Education />
        ) : activeFormIndex == 5 ? (
          <Projects />
        ) : activeFormIndex == 6 ? (
          <Skills />
        ) : activeFormIndex == 7 ? (
          <Navigate to={`${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`} />
        ) : (
          <div>Form not found</div>
        )}
      </div>
    </div>
  );
};

export default FormSection;
