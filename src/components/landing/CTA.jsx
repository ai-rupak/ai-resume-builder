import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse-soft"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Build Your Dream Resume?
          </h2>
          
          {/* Subheading */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join over 1 million professionals who have successfully landed their dream jobs 
            using our AI-powered resume builder. Start for free today!
          </p>
          
          {/* Benefits List */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8 text-white/90">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              No credit card required
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Free forever plan available
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Export instantly as PDF
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-ai-purple hover:bg-white/90 font-semibold px-8 py-4 text-lg group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-ai-purple font-semibold px-8 py-4 text-lg"
            >
              View Sample Resumes
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">Trusted by professionals at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm font-medium">
              <span>Google</span>
              <span>Microsoft</span>
              <span>Amazon</span>
              <span>Apple</span>
              <span>Meta</span>
              <span>Netflix</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};