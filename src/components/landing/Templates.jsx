import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import templatesImage from "@/assets/templates-grid.jpg";

const templateTypes = [
  {
    name: "Modern Professional",
    description: "Clean, contemporary design perfect for tech and creative roles",
    color: "from-feature-purple to-feature-blue"
  },
  {
    name: "Executive Elite",
    description: "Sophisticated layout ideal for senior management positions",
    color: "from-feature-blue to-feature-green"
  },
  {
    name: "Creative Canvas",
    description: "Eye-catching design for designers and creative professionals",
    color: "from-feature-green to-feature-orange"
  },
  {
    name: "Classic Corporate",
    description: "Traditional format trusted by Fortune 500 companies",
    color: "from-feature-orange to-feature-purple"
  }
];

export const Templates = () => {
  return (
    <section id="templates" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-subtle rounded-full mb-4">
            <Eye className="w-4 h-4 text-ai-purple mr-2" />
            <span className="text-sm font-medium text-ai-purple">Templates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Choose Your Perfect 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-purple to-ai-blue">
              {" "}Template
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our collection of professionally designed templates. Each template is optimized 
            for ATS systems and crafted by career experts to help you stand out.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Template Preview */}
          <div className="relative">
            <div className="template-card">
              <img 
                src={templatesImage}
                alt="Resume Templates Preview" 
                className="w-full h-auto"
              />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-card">
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-purple">20+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-card">
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-blue">ATS</div>
                <div className="text-sm text-muted-foreground">Optimized</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Template Types */}
          <div className="space-y-6">
            {templateTypes.map((template, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-card transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                      {template.name}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <button className="text-ai-purple hover:text-ai-blue transition-colors font-medium text-sm flex items-center group">
                      Preview Template
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <Button className="btn-gradient w-full">
                View All Templates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};