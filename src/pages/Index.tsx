
import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import AIAssistantToggle from "@/components/AIAssistantToggle";

const Index = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const toggleAssistant = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
      
      {/* AI Assistant Components */}
      <AIAssistantToggle 
        onClick={toggleAssistant} 
        isOpen={isAssistantOpen} 
      />
      <AIAssistant 
        isOpen={isAssistantOpen} 
        onToggle={toggleAssistant} 
      />
    </div>
  );
};

export default Index;
