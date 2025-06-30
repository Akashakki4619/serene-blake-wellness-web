
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredTime: string;
  agreed: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  preferredTime?: string;
  agreed?: string;
}

const Contact = () => {
  const { toast } = useToast();
  
  // Auto-save form data to localStorage
  const [formData, setFormData] = useLocalStorage<FormData>('contact-form-draft', {
    name: "",
    phone: "",
    email: "",
    message: "",
    preferredTime: "",
    agreed: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save indicator
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      setLastSaved(new Date());
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Message sent successfully!",
        description: "Dr. Blake will get back to you within 24 hours.",
      });
      
      // Clear form and localStorage after successful submission
      const clearedForm = {
        name: "",
        phone: "",
        email: "",
        message: "",
        preferredTime: "",
        agreed: false
      };
      setFormData(clearedForm);
      setLastSaved(null);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const clearDraft = () => {
    const clearedForm = {
      name: "",
      phone: "",
      email: "",
      message: "",
      preferredTime: "",
      agreed: false
    };
    setFormData(clearedForm);
    setLastSaved(null);
    toast({
      title: "Draft cleared",
      description: "Form has been reset.",
    });
  };

  const hasDraftData = formData.name || formData.email || formData.message || formData.phone || formData.preferredTime;

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
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
          {/* Auto-save indicator */}
          {hasDraftData && lastSaved && (
            <div className="absolute top-4 right-4 flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Auto-saved {lastSaved.toLocaleTimeString()}</span>
              <Button
                onClick={clearDraft}
                variant="ghost"
                size="sm"
                className="text-xs text-red-500 hover:text-red-700 p-1 h-auto"
              >
                Clear draft
              </Button>
            </div>
          )}
          
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
                onCheckedChange={(checked) => handleChange("agreed", !!checked)}
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
