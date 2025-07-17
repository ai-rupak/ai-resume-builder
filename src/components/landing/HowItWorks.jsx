import { UserPlus, Brain, Palette, Download } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Add Details",
    description: "Create your free account and provide your basic information, work experience, and skills.",
    step: 1
  },
  {
    icon: Brain,
    title: "AI Suggests Content",
    description: "Our intelligent AI analyzes your profile and suggests optimized content for your resume.",
    step: 2
  },
  {
    icon: Palette,
    title: "Choose Your Template",
    description: "Select from our collection of professional templates and customize to match your style.",
    step: 3
  },
  {
    icon: Download,
    title: "Export & Apply",
    description: "Download your ATS-optimized resume as a PDF and start applying to your dream jobs.",
    step: 4
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-bg-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-4 shadow-soft">
            <Brain className="w-4 h-4 text-ai-purple mr-2" />
            <span className="text-sm font-medium text-ai-purple">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            From Zero to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-purple to-ai-blue">
              {" "}Hire-Ready{" "}
            </span>
            in Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes it incredibly easy to create a professional resume. 
            Follow these simple steps and land your dream job faster.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 text-center group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">{step.step}</span>
              </div>
              
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-ai-purple/10 to-ai-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-ai-purple" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector Line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-ai-purple to-ai-blue opacity-30"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to get started?</p>
          <button className="btn-gradient">
            Create My Resume Now
          </button>
        </div>
      </div>
    </section>
  );
};