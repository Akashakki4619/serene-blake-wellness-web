
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-light mb-4">
              Dr. Serena Blake, <span className="text-blue-400">PsyD</span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Licensed Clinical Psychologist providing compassionate, evidence-based therapy 
              to help you overcome challenges and thrive.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-blue-400">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>Phone: (323) 555-0192</p>
              <p>Email: serena@blakepsychology.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-blue-400">Location</h4>
            <div className="text-gray-300">
              <p>1287 Maplewood Drive</p>
              <p>Los Angeles, CA 90026</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Dr. Serena Blake, PsyD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
