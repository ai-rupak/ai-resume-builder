export default{
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Software Engineer",
    address: "123 Main Street, Springfield, USA",
    phone: "+1 234 567 890",
    email: "john.doe@example.com",
    themeColor: "#1D63EC",
    summary:
      "A passionate and detail-oriented software engineer with 5+ years of experience in developing scalable web applications and working across the full stack. Skilled in JavaScript, React, and Node.js, with a strong foundation in problem-solving and teamwork.",
      experience: [
        {
          id: 1,
          title: "Senior Software Engineer",
          companyName: "Tech Solutions Inc.",
          city: "San Francisco",
          state: "CA",
          startDate: "January 2020",
          endDate: "Present",
          currentWorking: true,
          workSummary: [
            "Lead the development of a customer-facing dashboard for real-time data visualization.",
            "Mentored a team of junior developers, enhancing code quality and team productivity.",
            "Optimized application performance, reducing load times by 30%."
          ]
        },
        {
          id: 2,
          title: "Frontend Developer",
          companyName: "Web Innovators LLC",
          city: "New York",
          state: "NY",
          startDate: "June 2017",
          endDate: "December 2019",
          currentWorking: false,
          workSummary: [
            "Designed and implemented user interfaces using React and Redux.",
            "Collaborated with designers and backend developers to create seamless user experiences.",
            "Contributed to the migration of legacy codebases to modern frameworks."
          ]
        }
      ],
      education: [
        {
          id: 1,
          universityName: "Springfield University",
          startDate: "August 2013",
          endDate: "May 2017",
          degree: "Bachelor of Technology",
          major: "Computer Science",
          description: "Graduated with Honors. Consistently on the Dean's List for 3 consecutive years. Developed a final year project on AI-based data analysis."
        },
        {
          id: 2,
          universityName: "Springfield High School",
          startDate: "August 2011",
          endDate: "May 2013",
          degree: "High School Diploma",
          major: "Science",
          description: "Specialized in Physics, Chemistry, and Mathematics. Represented the school in a regional coding competition and secured first place."
        }
      ],
      skills: [
        { id: 1, name: "JavaScript", rating: 80 },
        { id: 2, name: "React", rating: 90 },
        { id: 3, name: "Node.js", rating: 100 },
        { id: 4, name: "HTML & CSS", rating: 80 },
        { id: 5, name: "RESTful APIs", rating: 90 },
        { id: 6, name: "Git & Version Control", rating: 85 }
      ],
      projects: [
        {
          id: 1,
          title: "E-Commerce Platform",
          description:
            "Developed a full-stack e-commerce application with features like user authentication, product listing, cart management, and payment integration.",
          technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
          link: "https://example-ecommerce.com"
        },
        {
          id: 2,
          title: "Portfolio Website",
          description:
            "Created a personal portfolio website to showcase projects and skills, optimized for SEO and responsiveness.",
          technologies: ["HTML", "CSS", "JavaScript"],
          link: "https://example-portfolio.com"
        },
        {
          id: 3,
          title: "Customer Feedback System",
          description:
            "Built a system to collect and analyze customer feedback using sentiment analysis and data visualization tools.",
          technologies: ["Python", "Django", "Matplotlib"],
          link: "https://example-feedback.com"
        }
    ]
  };
  
  