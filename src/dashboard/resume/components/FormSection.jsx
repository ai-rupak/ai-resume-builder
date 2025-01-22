import React, { useState , useEffect, useContext} from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import PersonalDetail from "./forms/PersonalDetail";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import ResumeApi from "./../../../../service/GlobalApi";
import { toast } from "react-toastify";
import { ResumeInfoContext } from "@/context/ResumeinfoContext";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enabledNext, setEnabledNext] = useState(false);
  const { resumeId } = useParams();
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

  if (!resumeId) {
    return <div>Error: Resume ID not found. Please go back to the dashboard.</div>;
  }
  

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button size="sm">
              <Home />
            </Button>
          </Link>

          <Button className="bg-white text-black hover:bg-black hover:text-white" size='sm'>Title: {resumeInfo.title}</Button>

          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              size="sm"
            >
              <ArrowLeft />
              Prev
            </Button>
          )}
          <Button
            disabled={!enabledNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            className="flex gap-2"
            size="sm"
          >
            Next <ArrowRight />{" "}
          </Button>
        </div>
      </div>

      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summary enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience />
      ) : activeFormIndex == 4 ? (
        <Education />
      ) : activeFormIndex == 5 ? (
        <Skills />
      ) : activeFormIndex == 6 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}
    </div>
  );
};

export default FormSection;
