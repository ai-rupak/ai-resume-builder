import { Button } from "@/components/ui/button";
import { Play, Sparkles, ArrowRight, Star, Users, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-ai-resume.jpg";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Zap, text: "AI-Powered Content", color: "text-yellow-500" },
    { icon: Shield, text: "ATS-Optimized", color: "text-green-500" },
    { icon: Users, text: "Expert Templates", color: "text-blue-500" },
    { icon: Star, text: "Professional Results", color: "text-purple-500" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    // Add your navigation logic here
    console.log("Getting started...");
  };

  const handleWatchDemo = () => {
    // Add your demo logic here
    console.log("Opening demo...");
  };

  return (
    <section className="relative pt-24 pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 rounded-full mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2 group-hover:animate-spin" />
              <span className="text-sm font-medium text-purple-700">
                AI-Powered Resume Builder
              </span>
              <ArrowRight className="w-3 h-3 ml-2 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Build Your Resume 
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-gradient-x">
                  {" "}Smarter{" "}
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span>
              with AI
            </h1>
            
            {/* Rotating Feature */}
            <div className="mb-6 h-8 flex items-center justify-center lg:justify-start">
              <div className="flex items-center space-x-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 transition-all duration-500 ${
                        index === currentFeature 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95 absolute'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-gray-700 font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Create professional, ATS-friendly resumes in minutes using AI-powered suggestions. 
              Stand out from the crowd with personalized content and stunning templates.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleGetStarted}
                className="relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleWatchDemo}
                className="group border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-700 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:text-purple-600 transition-all duration-300" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                  <span className="text-sm font-medium">Free forever plan</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-400"></div>
                <span className="text-sm font-medium">1M+ users trust us</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-1">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                    {i}
                  </div>
                ))}
              </div>
              <div className="ml-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5 from 10K+ reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <img 
                  src={heroImage}
                  alt="AI Resume Builder Interface" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay with hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce delay-1000">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -inset-8 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-cyan-400/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};