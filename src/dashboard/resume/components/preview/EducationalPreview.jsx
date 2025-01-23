import React from 'react'

const EducationalPreview = ({resumeInfo}) => {
  
  
  // console.log(formatDate("2025-01-21T15:40:19.067Z")); // Output: "21 January, 2025"
  
  
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{color:resumeInfo?.themeColor}}>Education </h2>

      <hr style={{borderColor:resumeInfo?.themeColor}} />
      {resumeInfo?.education?.map((education, index) => {
      // Format startDate and endDate
      const formatDate = (dateString) => {
        if (!dateString) return "Present"; // Handle cases where the date might be null or ongoing
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      };

      return (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">{education?.universityName}</h2>
          <h2 className="text-xs flex justify-between">
            {education?.degree}
            <span>
              {formatDate(education?.startDate)} - {formatDate(education?.endDate)}
            </span>
          </h2>
          <p className="text-xs my-2">{education?.description}</p>
        </div>
      );
    })}
    </div>
  )
}

export default EducationalPreview