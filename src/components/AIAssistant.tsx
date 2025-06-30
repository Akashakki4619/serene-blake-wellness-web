
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIAssistant = ({ isOpen, onToggle }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your virtual assistant. I can help you navigate Dr. Blake's website, answer questions about therapy services, or provide information about mental health resources. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      return "To book an appointment with Dr. Blake, please use the contact form on this page or call (323) 555-0192. She offers both virtual and in-person sessions.";
    }
    
    if (lowerMessage.includes('insurance') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "Dr. Blake doesn't accept insurance directly, but provides superbills for self-submission to your insurance provider. Individual sessions are $200 and couples sessions are $240.";
    }
    
    if (lowerMessage.includes('anxiety') || lowerMessage.includes('stress')) {
      return "Dr. Blake specializes in anxiety and stress management using evidence-based approaches like CBT and mindfulness. She can help you learn to manage overwhelming thoughts and build calm.";
    }
    
    if (lowerMessage.includes('relationship') || lowerMessage.includes('couples')) {
      return "Dr. Blake offers relationship counseling to help couples work through challenges, improve communication, and rebuild trust in a safe, neutral environment.";
    }
    
    if (lowerMessage.includes('trauma')) {
      return "Dr. Blake provides trauma recovery services using evidence-based methods, tailored to your pace and experience. She creates a safe space for healing from past trauma.";
    }
    
    if (lowerMessage.includes('virtual') || lowerMessage.includes('online') || lowerMessage.includes('zoom')) {
      return "Yes! Dr. Blake offers secure virtual sessions via Zoom in addition to in-person appointments at her Maplewood Drive office in Los Angeles.";
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('office')) {
      return "Dr. Blake's office is located at 1287 Maplewood Drive, Los Angeles, CA 90026. She also offers virtual sessions via Zoom.";
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return "Dr. Blake is a licensed clinical psychologist (PsyD) with 8 years of experience and over 500 client sessions. She combines evidence-based approaches with compassionate, personalized care.";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help you learn more about Dr. Blake's therapy services. What would you like to know?";
    }
    
    return "I'd be happy to help you with information about Dr. Blake's therapy services, booking appointments, insurance questions, or her specialties in anxiety, relationships, and trauma recovery. What specific information are you looking for?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Assistant Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">AI</span>
              </div>
              <div>
                <h3 className="font-semibold">Virtual Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <Button 
              onClick={onToggle}
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              ✕
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`max-w-[80%] ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <Card className="bg-gray-100 text-gray-900">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Dr. Blake's services..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI Assistant • Instant responses
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
