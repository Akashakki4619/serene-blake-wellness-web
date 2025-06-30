
const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Dr. Serena Blake"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-full"
            />
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                About <span className="text-blue-600 font-medium">Dr. Blake</span>
              </h2>
              
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-blue-600">8</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Client Sessions</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, 
              with eight years of experience and over 500 client sessions. She blends evidence-based 
              approaches—like cognitive-behavioral therapy and mindfulness—with compassionate, 
              personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma.
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Whether you meet in her Maplewood Drive office or connect virtually via Zoom, 
              Dr. Blake is committed to creating a safe, supportive space for you to thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
