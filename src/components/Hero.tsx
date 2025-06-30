
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
          Supporting Your Mental Wellness,{" "}
          <span className="text-blue-600 font-medium">Every Step of the Way</span>
        </h1>
        
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-8 font-light">
          Dr. Serena Blake, Clinical Psychologist (PsyD)
        </h2>
        
        <div className="space-y-4 mb-8">
          <Button 
            onClick={scrollToContact}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book a Free Consult
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Virtual & In-Person Sessions Available
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
