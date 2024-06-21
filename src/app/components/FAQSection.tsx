// components/FAQSection.tsx (assuming you're using TypeScript)

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqData: FAQItem[] = [
    { question: 'Question 1?', answer: 'Answer to question 1 goes here.' },
    { question: 'Question 2?', answer: 'Answer to question 2 goes here.' },
    { question: 'Question 3?', answer: 'Answer to question 3 goes here.' },
    { question: 'Question 4?', answer: 'Answer to question 4 goes here.' },
    // Add more questions and answers as needed
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="border border-gray-200 rounded-md shadow-md">
        {faqData.map((item, index) => (
          <div key={index}>
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <svg
                className={`w-6 h-6 ${openIndex === index ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={openIndex === index ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
              </svg>
            </div>
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
