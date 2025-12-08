import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/251900000000?text=Hello%20Dink%20Sports%20Wear"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1fb855] transition-all duration-300 hover:scale-110 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
