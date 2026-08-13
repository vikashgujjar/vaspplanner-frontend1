"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PolicyLayout from "./PolicyLayout";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, Loader2 } from "lucide-react";
import { userService } from "../services/userService";

const FALLBACK_FAQS = [
  {
    category: "Ordering",
    questions: [
      {
        q: "How do I place an order on VASP Planner?",
        a: "Simply browse our collection, select your desired gift, flower, or cake, add it to the cart, and proceed to checkout. You'll need to provide delivery details and complete the payment to confirm your order."
      },
      {
        q: "Can I customize a cake or gift hamper?",
        a: "Yes! We offer various customization options for cakes (flavors, messages) and hampers. For specific requests not visible on the site, please contact our support team."
      },
      {
        q: "How can I track my order?",
        a: "You can track your order using the 'Track Order' page by entering your order ID and email/phone number. You'll also receive real-time updates via SMS and email."
      }
    ]
  },
  {
    category: "Delivery",
    questions: [
      {
        q: "Do you offer same-day delivery?",
        a: "Yes, we offer same-day delivery for select items like fresh flowers and cakes in major cities, provided the order is placed before our daily cutoff time (usually 6:00 PM)."
      },
      {
        q: "What areas do you deliver to?",
        a: "We currently deliver to Bangalore, Hisar, Chandigarh, Panchkula, Mohali, Kharar, and Zirakpur. We are constantly expanding our service areas."
      },
      {
        q: "Do you deliver at midnight?",
        a: "Yes, we have a specialized midnight delivery service for birthdays and anniversaries. Please select the 'Midnight Delivery' slot during checkout."
      }
    ]
  },
  {
    category: "Payments & Refunds",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, Net Banking, and popular mobile wallets like Paytm and Amazon Pay."
      },
      {
        q: "What is your refund policy?",
        a: "Refunds are processed for defective non-perishable items reported within 24 hours. For fresh items like cakes and flowers, refunds are only issued if the product was severely damaged or incorrect at delivery."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState("0-0");
  const [searchTerm, setSearchTerm] = useState("");
  const [faqCategories, setFaqCategories] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    email: "support@vaspplanner.com",
    phone: "+91 1800-123-4567",
    whatsapp: "+91 9876543210",
    support_hours: "Mon - Sat: 9:00 AM - 8:00 PM"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFaqs() {
      setIsLoading(true);
      try {
        const res = await userService.getFaqs();
        if (res?.success && res?.categories?.length > 0) {
          setFaqCategories(res.categories);
        } else {
          setFaqCategories(FALLBACK_FAQS);
        }
        if (res?.contact_info) {
          setContactInfo(res.contact_info);
        }
      } catch (err) {
        console.error("Failed to load dynamic FAQs:", err);
        setFaqCategories(FALLBACK_FAQS);
      } finally {
        setIsLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const activeFaqs = faqCategories.length > 0 ? faqCategories : FALLBACK_FAQS;

  const filteredFaqs = activeFaqs.map(cat => ({
    ...cat,
    category: cat.category || cat.name,
    questions: (cat.questions || cat.faqs || []).filter(q => {
      const qText = q.q || q.question || "";
      const aText = q.a || q.answer || "";
      return (
        qText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  })).filter(cat => cat.questions && cat.questions.length > 0);

  return (
    <PolicyLayout
      title="Frequently Asked Questions"
      subtitle="Help Center"
      breadcrumb="FAQs"
      icon={HelpCircle}
    >
      <div className="p-8 md:p-12 lg:p-16">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-sm"
            placeholder="Search for questions (e.g., 'delivery', 'refund')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-12">
            {filteredFaqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">{catIdx + 1}</span>
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => {
                    const globalIdx = `${catIdx}-${idx}`;
                    const isOpen = openIndex === globalIdx;
                    return (
                      <div
                        key={idx}
                        className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                        >
                          <span className={`font-bold text-sm md:text-base ${isOpen ? 'text-amber-900' : 'text-gray-800'}`}>
                            {faq.q}
                          </span>
                          {isOpen ? <ChevronUp className="text-amber-500 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-amber-100/50 pt-4">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">No results found</h4>
            <p className="text-gray-500">Try searching for different keywords</p>
          </div>
        )}

        {/* Still Need Help? */}
        <div className="mt-20 p-8 md:p-12 bg-[#0f0f0f] rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center text-center lg:text-left">
            <div>
              <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-wide">Still have <span className="text-amber-400">Questions?</span></h3>
              <p className="text-gray-400 text-sm mb-4">Email: <a href={`mailto:${contactInfo.email}`} className="text-amber-400 font-bold hover:underline">{contactInfo.email}</a> • Call: <a href={`tel:${contactInfo.phone}`} className="text-amber-400 font-bold hover:underline">{contactInfo.phone}</a></p>
              <p className="text-xs text-gray-500">{contactInfo.support_hours}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <a href={`mailto:${contactInfo.email}`} className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-amber-400 transition-colors text-nowrap flex items-center justify-center gap-2">
                <Mail size={18} /> Email Us
              </a>
              <a href={`tel:${contactInfo.phone}`} className="px-8 text-nowrap py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Phone size={18} /> Call Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
