import { 
  Sparkles, 
  Palette, 
  Eye, 
  Download, 
  Zap, 
  Shield,
  Clock,
  Target
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Get intelligent content recommendations tailored to your industry and role. Our AI analyzes job descriptions to suggest the perfect skills and experiences.",
    color: "text-feature-purple"
  },
  {
    icon: Palette,
    title: "Customizable Templates",
    description: "Choose from 20+ professionally designed templates. Customize colors, fonts, and layouts to match your personal brand and industry standards.",
    color: "text-feature-blue"
  },
  {
    icon: Eye,
    title: "Instant Resume Preview",
    description: "See your changes in real-time with our live preview feature. What you see is exactly what employers will receive - no surprises.",
    color: "text-feature-green"
  },
  {
    icon: Download,
    title: "One-Click PDF Export",
    description: "Download your resume as a high-quality PDF optimized for ATS systems. Perfect formatting guaranteed across all devices and platforms.",
    color: "text-feature-orange"
  },
  {
    icon: Zap,
    title: "ATS Optimization",
    description: "Built-in ATS checker ensures your resume passes through applicant tracking systems. Increase your chances of landing interviews by 60%.",
    color: "text-feature-purple"
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your data is encrypted and secure. We never share your information with third parties. You have full control over your personal data.",
    color: "text-feature-blue"
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Build a complete resume in under 15 minutes. Our intuitive interface guides you through each step, making resume creation effortless.",
    color: "text-feature-green"
  },
  {
    icon: Target,
    title: "Job-Specific Optimization",
    description: "Tailor your resume for specific job applications. Our AI helps you highlight the most relevant skills and experiences for each position.",
    color: "text-feature-orange"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-subtle rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-ai-purple mr-2" />
            <span className="text-sm font-medium text-ai-purple">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Everything You Need to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-purple to-ai-blue">
              {" "}Stand Out
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform provides all the tools you need to create a professional resume 
            that gets you noticed by employers and passes through ATS systems.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                feature.color === 'text-feature-purple' ? 'from-feature-purple/20 to-feature-purple/10' :
                feature.color === 'text-feature-blue' ? 'from-feature-blue/20 to-feature-blue/10' :
                feature.color === 'text-feature-green' ? 'from-feature-green/20 to-feature-green/10' :
                'from-feature-orange/20 to-feature-orange/10'
              } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};