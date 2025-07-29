import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{color:resumeInfo?.themeColor}}>Proffesional Experience </h2>

      <hr style={{borderColor:resumeInfo?.themeColor}} />

      {resumeInfo?.experience?.map((experience,index)=>{
        const formatDate = (dateString) => {
          if (!dateString) return "Present"; // Handle cases where the date might be null or ongoing
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", {
            month: "long",
            // day: "numeric",
            year: "numeric",
          });
        };
        return (
        <div key={index} className='my-5' >
          <h2 className='text-sm font-bold'>{experience?.jobTitle}</h2>
          <h2 className='text-xs flex justify-between'>{experience?.company}
            <span>{formatDate(experience?.startDate)} - {experience?.currentlyWorking? 'Present' : formatDate(experience?.endDate)} </span> 
            </h2>
            {/* <p className='text-xs my-2'>{experience?.workSummary} </p> */}
            <div 
              className="text-xs my-2 list-disc pl-1.5" 
              dangerouslySetInnerHTML={{ __html: experience?.description }} 
            />

        </div>
     );
    })}
    </div>
  )
}

export default ExperiencePreview