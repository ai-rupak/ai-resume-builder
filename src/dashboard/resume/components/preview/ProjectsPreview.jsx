import dummy from "@/data/dummy";
import React from "react";

const ProjectsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects{" "}
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="mb-2">
          <h2 className="text-sm font-bold flex items-center">
            {project?.projectTitle}
            {project?.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-500 underline"
                title={project.link} // Displays the link as a tooltip on hover
              >
                (Link)
              </a>
            )}
          </h2>
          <h2 className="text-xs">{project?.description}</h2>
          <h2 className="text-xs">
            <span className="font-bold">Tech Stack - </span>
            {project?.technologies}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ProjectsPreview;
