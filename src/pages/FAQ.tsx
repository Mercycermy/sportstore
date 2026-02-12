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
      question: 'What sizes do you offer, and how do I choose the right fit?',
      answer: 'Answer coming soon. Our team will confirm sizing guidance and charts.',
    },
    {
      question: 'What materials are your jerseys made from?',
      answer: 'Answer coming soon. We will share fabric details and performance specs.',
    },
    {
      question: 'Do you offer custom kits for teams? What is the minimum order quantity?',
      answer: 'Answer coming soon. We will confirm custom kit options and MOQ.',
    },
    {
      question: 'How long does production and delivery take?',
      answer: 'Answer coming soon. Timelines vary by order size and location.',
    },
    {
      question: 'Which payment methods do you accept?',
      answer: 'Answer coming soon. We will list available payment options.',
    },
    {
      question: 'Do you deliver outside Addis Ababa? What are the delivery costs?',
      answer: 'Answer coming soon. We will provide delivery coverage and pricing.',
    },
    {
      question: 'Can customers return or exchange items? What is the return policy?',
      answer: 'Answer coming soon. We will publish the return policy details.',
    },
    {
      question: 'Are bulk discounts available for teams or organizations?',
      answer: 'Answer coming soon. We will share discount tiers and eligibility.',
    },
    {
      question: 'How can customers contact support (phone, Telegram, email)?',
      answer: 'Answer coming soon. We will add the official support channels.',
    },
    {
      question: 'Do you offer sponsorship or partnership packages for clubs?',
      answer: 'Answer coming soon. We will outline partnership opportunities.',
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
