import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is the minimum order quantity for custom jerseys?',
      answer: 'Our minimum order quantity (MOQ) for custom team kits is 10 units. This allows small teams and clubs to access professional custom sportswear without large upfront costs.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide! We partner with DHL, FedEx, and Ethiopian Airlines Cargo to ensure reliable delivery to all corners of the globe. Shipping times vary by destination.',
    },
    {
      question: 'How long does it take to produce custom kits?',
      answer: 'Custom kit production typically takes 4-6 weeks from design approval to delivery. This includes design mockups, sample approval, bulk production, and shipping.',
    },
    {
      question: 'Can I see a sample before placing a bulk order?',
      answer: 'Absolutely! We provide physical samples for approval before beginning bulk production. Sample fees may apply but are often credited toward your final order.',
    },
    {
      question: 'What materials do you use?',
      answer: 'We use high-performance polyester blends, often mixed with spandex or elastane for stretch. All materials are breathable, moisture-wicking, and designed for athletic performance.',
    },
    {
      question: 'Do you offer team sponsorships?',
      answer: 'Yes, we have an ambassador program for teams and athletes. Contact us with your team details, and we\'ll discuss potential partnership opportunities.',
    },
    {
      question: 'Can you match specific colors?',
      answer: 'Yes, we offer Pantone color matching to ensure your team colors are reproduced accurately on your custom kits.',
    },
    {
      question: 'What printing methods do you use for logos?',
      answer: 'We offer both sublimation printing (for full designs) and embroidery (for logos). Sublimation provides unlimited colors and doesn\'t fade, while embroidery gives a premium, textured look.',
    },
    {
      question: 'Do you accept returns or exchanges?',
      answer: 'Due to the custom nature of our products, we don\'t accept returns unless there\'s a manufacturing defect. We ensure quality through sample approval before production.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, credit cards (Visa, Mastercard), and local payment methods like Telebirr for Ethiopian customers. Payment terms are discussed during the ordering process.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#F4F4F4]">
      <div className="bg-[#1A1A1A] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h1
            className="text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-[#1A1A1A] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D92128] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h2
            className="text-2xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#D92128] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#b91a20] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
