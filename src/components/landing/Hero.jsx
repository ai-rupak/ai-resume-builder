import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-ai-resume.jpg";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-bg-subtle to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-subtle rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-ai-purple mr-2" />
              <span className="text-sm font-medium text-ai-purple">
                AI-Powered Resume Builder
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              Build Your Resume 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-purple to-ai-blue">
                {" "}Smarter{" "}
              </span>
              with AI
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Create professional, ATS-friendly resumes in minutes using AI-powered suggestions. 
              Stand out from the crowd with personalized content and stunning templates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-gradient text-lg px-8 py-4">
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline-gradient text-lg px-8 py-4 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-feature-green rounded-full mr-2"></div>
                No credit card required
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-feature-blue rounded-full mr-2"></div>
                Free forever plan
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-feature-orange rounded-full mr-2"></div>
                1M+ users trust us
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img 
                src={heroImage}
                alt="AI Resume Builder Interface" 
                className="w-full h-auto rounded-2xl shadow-card"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-primary opacity-10 rounded-3xl blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};