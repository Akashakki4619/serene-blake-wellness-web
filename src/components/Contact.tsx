
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    preferredTime: "",
    agreed: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Please tell us what brings you here";
    if (!formData.preferredTime.trim()) newErrors.preferredTime = "Preferred contact time is required";
    if (!formData.agreed) newErrors.agreed = "You must agree to be contacted";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Message sent successfully!",
        description: "Dr. Blake will get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        preferredTime: "",
        agreed: false
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Get in <span className="text-blue-600 font-medium">Touch</span>
          </h2>
          <p className="text-xl text-gray-600">
            Ready to take the first step? Let's connect.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`mt-2 ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`mt-2 ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="(323) 555-0123"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-700 font-medium">
                What brings you here? *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`mt-2 min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                placeholder="Tell me a bit about what you'd like to work on..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="preferredTime" className="text-gray-700 font-medium">
                Preferred time to reach you *
              </Label>
              <Input
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => handleChange("preferredTime", e.target.value)}
                className={`mt-2 ${errors.preferredTime ? "border-red-500" : ""}`}
                placeholder="Weekday mornings, evenings, etc."
              />
              {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreed"
                checked={formData.agreed}
                onCheckedChange={(checked) => handleChange("agreed", checked)}
                className={errors.agreed ? "border-red-500" : ""}
              />
              <Label htmlFor="agreed" className="text-sm text-gray-600">
                I agree to be contacted regarding my inquiry *
              </Label>
            </div>
            {errors.agreed && <p className="text-red-500 text-sm">{errors.agreed}</p>}
            
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
