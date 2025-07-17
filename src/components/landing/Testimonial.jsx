import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b75d4419?w=400&h=400&fit=crop&crop=face",
    content: "The AI suggestions were incredibly helpful. I got 3 interviews within a week of using this tool. The templates are modern and professional.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Marketing Director", 
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    content: "Finally, a resume builder that understands what recruiters want. The ATS optimization feature is a game-changer. Highly recommended!",
    rating: 5
  },
  {
    name: "Emily Chen",
    role: "Product Manager",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    content: "I was skeptical about AI-generated content, but the suggestions were spot-on. It helped me articulate my achievements better than I could myself.",
    rating: 5
  },
  {
    name: "David Rodriguez",
    role: "Data Scientist",
    company: "Meta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    content: "The interface is intuitive and the export quality is excellent. I've recommended it to all my colleagues who are job hunting.",
    rating: 5
  },
  {
    name: "Lisa Park",
    role: "UX Designer",
    company: "Apple",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    content: "As a designer, I'm picky about visual design. These templates are beautifully crafted and actually help rather than hinder the content.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Sales Director",
    company: "Salesforce",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    content: "The job-specific optimization feature helped me tailor my resume perfectly. Landed my dream job at Salesforce thanks to this tool!",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-bg-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-4 shadow-soft">
            <Star className="w-4 h-4 text-ai-purple mr-2" />
            <span className="text-sm font-medium text-ai-purple">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Loved by 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-purple to-ai-blue">
              {" "}1M+ Users
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs 
            using our AI-powered resume builder.
          </p>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-white p-6 rounded-xl shadow-soft">
            <div className="text-3xl font-bold text-ai-purple mb-2">1M+</div>
            <div className="text-muted-foreground">Resumes Created</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-soft">
            <div className="text-3xl font-bold text-ai-blue mb-2">4.9/5</div>
            <div className="text-muted-foreground">User Rating</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-soft">
            <div className="text-3xl font-bold text-feature-green mb-2">85%</div>
            <div className="text-muted-foreground">Interview Rate</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-soft">
            <div className="text-3xl font-bold text-feature-orange mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-ai-purple/10 to-ai-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-5 h-5 text-ai-purple" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};