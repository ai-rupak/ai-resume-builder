import FileUploader from "@/components/landing/ATS/FileUploader";
import { Header } from "@/components/landing/Header";
import { prepareInstructions } from "@/constant";
import { extractTextFromPdf } from "@/lib/pdf-utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AIChatSession } from "../../service/AiModel";
import { convertPdfToImage } from "@/lib/pdf2img";
import { 
  FileText, 
  Building2, 
  Briefcase, 
  ClipboardList, 
  Upload as UploadIcon,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Zap
} from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    setFile(file);
    setError("");
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }) => {
    try {
      setIsProcessing(true);
      setError("");
      
      // Step 1
      setCurrentStep(1);
      setStatusText("Reading your resume...");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Better UX with timing

      const resumeText = await extractTextFromPdf(file);

      // Step 2
      setCurrentStep(2);
      setStatusText("Converting resume to preview...");
      await new Promise(resolve => setTimeout(resolve, 800));
      const imageFile = await convertPdfToImage(file);

      // Step 3
      setCurrentStep(3);
      setStatusText("Analyzing with AI...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      const instructions = prepareInstructions({ jobTitle, jobDescription });

      // Step 4
      setCurrentStep(4);
      setStatusText("Generating personalized feedback...");
      const result = await AIChatSession.sendMessage(
        `${instructions}\n\nResume:\n${resumeText}`
      );

      const response = await result.response;
      const text = response.text();

      let feedback;
      try {
        feedback = JSON.parse(text);
      } catch (e) {
        console.error("AI returned invalid JSON:", text);
        throw new Error("AI returned invalid feedback format");
      }

      const uuid = crypto.randomUUID();
      const data = {
        id: uuid,
        companyName,
        jobTitle,
        jobDescription,
        resumeText,
        feedback,
        previewImage: imageFile?.imageUrl || "",
      };

      setCurrentStep(5);
      setStatusText("Analysis complete! Redirecting...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate(`/resume/${uuid}`, { state: data });
    } catch (err) {
      console.error("Error analyzing resume:", err);
      setError(err.message || "Error analyzing resume. Please try again.");
      setIsProcessing(false);
      setCurrentStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");

    // Validation
    if (!companyName?.trim()) {
      setError("Please enter a company name");
      return;
    }
    if (!jobTitle?.trim()) {
      setError("Please enter a job title");
      return;
    }
    if (!jobDescription?.trim()) {
      setError("Please enter a job description");
      return;
    }
    if (!file) {
      setError("Please upload your resume");
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const processingSteps = [
    { id: 1, text: "Reading your resume...", icon: <FileText className="w-4 h-4" /> },
    { id: 2, text: "Converting to preview...", icon: <UploadIcon className="w-4 h-4" /> },
    { id: 3, text: "Analyzing with AI...", icon: <Sparkles className="w-4 h-4" /> },
    { id: 4, text: "Generating feedback...", icon: <Zap className="w-4 h-4" /> },
    { id: 5, text: "Complete!", icon: <CheckCircle className="w-4 h-4" /> }
  ];

  if (isProcessing) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <section className="main-section flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 animate-pulse" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Analyzing Your Resume</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">{statusText}</p>
              
              <div className="space-y-3 sm:space-y-4">
                {processingSteps.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-500 ${
                      currentStep >= step.id 
                        ? 'bg-green-50 border-green-200 border' 
                        : currentStep === step.id 
                          ? 'bg-blue-50 border-blue-200 border' 
                          : 'bg-gray-50 border-gray-200 border'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        currentStep > step.id 
                          ? 'bg-green-500 text-white' 
                          : currentStep === step.id 
                            ? 'bg-blue-500 text-white animate-pulse' 
                            : 'bg-gray-300 text-gray-500'
                      }`}>
                        {currentStep > step.id ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : 
                          React.cloneElement(step.icon, { className: "w-3 h-3 sm:w-4 sm:h-4" })}
                      </div>
                      <span className={`text-sm sm:text-base font-medium ${
                        currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8">
                <img 
                  src="/images/resume-scan.gif" 
                  alt="Processing animation" 
                  className="w-32 h-24 sm:w-48 sm:h-32 mx-auto object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <section className="main-section py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 mt-5">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">AI-Powered Resume Analysis</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight mb-3 sm:mb-4 px-2">
              Smart Feedback for Your Dream Job
            </h1>
            
            <h2 className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Upload your resume and get personalized ATS score with actionable improvement tips
            </h2>
          </div>

          {/* Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-red-700">{error}</span>
                </div>
              )}

              <form id="upload-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700" htmlFor="company-name">
                      <Building2 className="w-4 h-4 mr-2" />
                      Company Name
                    </label>
                    <input
                      className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      type="text"
                      name="company-name"
                      placeholder="e.g., Google, Microsoft, Apple"
                      id="company-name"
                      required
                    />
                  </div>

                  {/* Job Title */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700" htmlFor="job-title">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Job Title
                    </label>
                    <input
                      className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      type="text"
                      name="job-title"
                      placeholder="e.g., Software Engineer, Product Manager"
                      id="job-title"
                      required
                    />
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700" htmlFor="job-description">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Job Description
                  </label>
                  <textarea
                    className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    rows={4}
                    name="job-description"
                    placeholder="Paste the full job description here for the most accurate analysis..."
                    id="job-description"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    💡 Tip: Include the complete job description for better matching accuracy
                  </p>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700" htmlFor="uploader">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Resume
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                  {file && (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{file.name} uploaded successfully</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-4">
                  <button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                    type="submit"
                    disabled={isProcessing}
                  >
                    <span className="flex items-center justify-center">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Analyze Resume with AI
                    </span>
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-2 sm:mt-3 px-2">
                    Your resume will be analyzed using advanced AI to provide personalized feedback
                  </p>
                </div>
              </form>
            </div>

            {/* Bottom Banner */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant Analysis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Upload;