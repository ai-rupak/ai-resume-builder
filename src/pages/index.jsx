// import Header from "@/components/custom";
import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Templates } from "@/components/landing/Templates";
import { Testimonials } from "@/components/landing/Testimonial";


const Index = () => {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <Header/>
      <Hero />
      <Features />
      <HowItWorks />
      <Templates />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;