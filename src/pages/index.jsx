// import Header from "@/components/custom";
import ATS from "@/components/landing/ATS";
import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Templates } from "@/components/landing/Templates";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header/>
      <Hero />
      <ATS/>
      <Features />
      <HowItWorks />
      <Templates />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;