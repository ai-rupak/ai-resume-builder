import { 
  Sparkles, 
  Palette, 
  Eye, 
  Download, 
  Zap, 
  Shield,
  Clock,
  Target,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Get intelligent content recommendations tailored to your industry and role. Our AI analyzes job descriptions to suggest the perfect skills and experiences.",
    color: "text-purple-600",
    bgColor: "from-purple-500/20 to-purple-600/10",
    hoverColor: "group-hover:bg-purple-500/5",
    badge: "Most Popular",
    stats: "95% accuracy"
  },
  {
    icon: Palette,
    title: "Customizable Templates",
    description: "Choose from 20+ professionally designed templates. Customize colors, fonts, and layouts to match your personal brand and industry standards.",
    color: "text-blue-600",
    bgColor: "from-blue-500/20 to-blue-600/10",
    hoverColor: "group-hover:bg-blue-500/5",
    badge: "20+ Templates",
    stats: "Professional designs"
  },
  {
    icon: Eye,
    title: "Instant Resume Preview",
    description: "See your changes in real-time with our live preview feature. What you see is exactly what employers will receive - no surprises.",
    color: "text-green-600",
    bgColor: "from-green-500/20 to-green-600/10",
    hoverColor: "group-hover:bg-green-500/5",
    badge: "Real-time",
    stats: "Zero lag"
  },
  {
    icon: Download,
    title: "One-Click PDF Export",
    description: "Download your resume as a high-quality PDF optimized for ATS systems. Perfect formatting guaranteed across all devices and platforms.",
    color: "text-orange-600",
    bgColor: "from-orange-500/20 to-orange-600/10",
    hoverColor: "group-hover:bg-orange-500/5",
    badge: "High Quality",
    stats: "ATS optimized"
  },
  {
    icon: Zap,
    title: "ATS Optimization",
    description: "Built-in ATS checker ensures your resume passes through applicant tracking systems. Increase your chances of landing interviews by 60%.",
    color: "text-purple-600",
    bgColor: "from-purple-500/20 to-purple-600/10",
    hoverColor: "group-hover:bg-purple-500/5",
    badge: "60% Better",
    stats: "Interview rate"
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your data is encrypted and secure. We never share your information with third parties. You have full control over your personal data.",
    color: "text-blue-600",
    bgColor: "from-blue-500/20 to-blue-600/10",
    hoverColor: "group-hover:bg-blue-500/5",
    badge: "256-bit SSL",
    stats: "Bank-level security"
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Build a complete resume in under 15 minutes. Our intuitive interface guides you through each step, making resume creation effortless.",
    color: "text-green-600",
    bgColor: "from-green-500/20 to-green-600/10",
    hoverColor: "group-hover:bg-green-500/5",
    badge: "15 Minutes",
    stats: "Average time"
  },
  {
    icon: Target,
    title: "Job-Specific Optimization",
    description: "Tailor your resume for specific job applications. Our AI helps you highlight the most relevant skills and experiences for each position.",
    color: "text-orange-600",
    bgColor: "from-orange-500/20 to-orange-600/10",
    hoverColor: "group-hover:bg-orange-500/5",
    badge: "Smart Match",
    stats: "Job relevance"
  }
];

export const Features = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-green-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 rounded-full mb-6 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to 
            <span className="relative inline-block ml-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Stand Out
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform provides all the tools you need to create a professional resume 
            that gets you noticed by employers and passes through ATS systems.
          </p>

          {/* Stats bar */}
          {/* <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">1M+ resumes created</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">95% pass ATS systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">60% more interviews</span>
            </div>
          </div> */}
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-index={index}
              className={`group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                visibleCards.has(index.toString()) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${feature.hoverColor}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Badge */}
              {feature.badge && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                  {feature.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                
                {/* Animated ring */}
                <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-current ${feature.color} opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500">{feature.stats}</span>
                  <ArrowRight className={`w-4 h-4 ${feature.color} transform group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <span>Try All Features Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};