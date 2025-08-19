import { ArrowRight,  FileText, BarChart3, CheckCircle, Upload, Zap } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const ATS = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Analysis",
      description: "AI-powered resume scanning with detailed feedback"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "ATS Score",
      description: "Get compatibility scores for applicant tracking systems"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Monitor your application status across multiple platforms"
    }
  ];

  return (
    <main className="pb-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      <section id='ats' className="main-section relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="page-heading py-5 text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Resume Analysis</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight mb-3 sm:mb-4 px-2">
              Track Your Applications
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight mb-3 sm:mb-4 px-2">& Resume Ratings</span>
            </h1>
            
            <h2 className="text-base lg:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed  sm:text-lg md:text-xl   px-4">
              Get instant AI-powered feedback on your resume, track application status, 
              and optimize your job search with intelligent insights.
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 px-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center justify-center gap-6 px-4">
            <Link to={"/upload"} className="w-full sm:w-auto">
              <Button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white text-lg px-12 py-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Upload className="w-6 h-6 mr-3" />
                  Upload Resume Now
                  <ArrowRight className={`w-5 h-5 ml-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </span>
                
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-800 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </Button>
            </Link>

            <p className="text-sm text-gray-500 text-center max-w-md">
              Upload your resume and get instant feedback in seconds. 
              <br />
              <span className="font-medium text-gray-600">100% free • No signup required</span>
            </p>
          </div>

          {/* Stats Section */}
          {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4">
            {[
              { number: "50K+", label: "Resumes Analyzed" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "30s", label: "Average Analysis Time" },
              { number: "4.9/5", label: "User Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default ATS;