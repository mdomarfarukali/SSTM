import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Our standard shipping takes 3-7 business days. Expedited shipping options are available at checkout.",
  },
  {
    question: "What is the return policy?",
    answer:
      "Returns are accepted within 14 days of delivery. Items must be unused and in original packaging.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes! International shipping is available. Shipping fees and delivery times vary by location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email to monitor delivery status.",
  },
  {
    question: "How do I care for my jewellery?",
    answer:
      "Avoid contact with water, perfumes, and chemicals. Clean gently with a soft cloth to maintain shine.",
  },
  {
    question: "Can I customize my jewellery?",
    answer:
      "Yes! We offer customization services for select pieces. Please contact our support team with your request.",
  },
];

export default function FAQs() {
  return (
    <div className="bg-brand min-h-screen px-6 md:px-16 py-32"> {/* Increased py from 20 → 32 */}
      <h1 className="text-3xl text-brand-info font-bold  mb-12 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index} as="div" className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-gray-700 dark:text-gray-200 font-medium text-lg rounded-lg hover:bg-pink-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-6 h-6 text-pink-600 dark:text-pink-400`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
