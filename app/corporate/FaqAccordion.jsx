"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is the minimum order quantity for corporate gifts?", a: "Our minimum order starts at 25 units. For orders above 100 units, we offer additional bulk discounts up to 40% off." },
  { q: "Can we add our company logo on the packaging?", a: "Absolutely! We offer complete branding solutions including custom boxes, ribbons, cards, and even product labels with your company branding." },
  { q: "Do you deliver pan-India and internationally?", a: "Yes, we have a delivery network across 400+ cities in India and ship to 50+ countries worldwide including USA, UK, UAE, Singapore, and more." },
  { q: "What is the delivery timeline for bulk orders?", a: "Standard bulk orders are delivered within 7-10 business days. Express delivery is available within 3-5 days at an additional charge." },
  { q: "Do you provide GST invoices?", a: "Yes, we provide complete GST-compliant invoices for all corporate orders. We also offer credit terms for verified businesses." },
];

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-md shadow-gray-100/50 overflow-hidden"
        >
          <button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span>
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === index
              ? "bg-gradient-to-br from-emerald-500 to-teal-500 rotate-180"
              : "bg-gray-100"
              }`}>
              <ChevronDown
                size={16}
                className={`transition-colors sm:w-5 sm:h-5 ${openFaq === index ? "text-white" : "text-gray-400"}`}
              />
            </div>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-40" : "max-h-0"}`}>
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base leading-relaxed">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
