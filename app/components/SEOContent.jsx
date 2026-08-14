"use client";
import React, { useState } from "react";
import {
    Plus,
    Sparkles,
    ShieldCheck,
    Truck,
    Heart,
    Star,
    RefreshCcw,
    Zap,
    HelpCircle
} from "lucide-react";

const FAQItem = ({ index, question, answer, isOpen, onClick }) => (
    <div className={`group border-b border-gray-100 last:border-0 transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-violet-50 to-transparent' : 'hover:bg-gray-50/70'}`}>
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
        >
            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-300 ${isOpen ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-violet-100 group-hover:text-violet-600'}`}>
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`flex-1 font-bold text-sm md:text-base transition-colors ${isOpen ? 'text-violet-700' : 'text-gray-800 group-hover:text-violet-600'}`}>
                {question}
            </span>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-violet-600 text-white rotate-45' : 'bg-gray-100 text-gray-400 group-hover:bg-violet-100 group-hover:text-violet-600'}`}>
                <Plus size={16} />
            </div>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pl-[4.25rem] pr-5 md:pr-6 pb-6 text-gray-600 leading-relaxed text-xs md:text-sm">
                {answer}
            </div>
        </div>
    </div>
);

export default function SEOContent({ title, faqs = [], stats }) {
    const [openIndex, setOpenIndex] = useState(0);

    const displayRating = stats?.avg_rating || "4.9/5";
    const displayCustomers = stats?.happy_customers || "50K+";

    const defaultTrustBadges = [
        { icon: ShieldCheck, text: "100% Genuine Products", desc: "Every item is verified and quality-checked before it ships.", color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/25" },
        { icon: Truck, text: "Free Fast Delivery", desc: "Same-day and express delivery slots available at checkout.", color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/25" },
        { icon: RefreshCcw, text: "Easy Return Policy", desc: "Not satisfied? Return within the window, no questions asked.", color: "from-amber-500 to-orange-500", glow: "shadow-amber-500/25" },
        { icon: Zap, text: "Secure Payment Gateways", desc: "Bank-grade encryption keeps every transaction safe.", color: "from-violet-500 to-purple-600", glow: "shadow-violet-500/25" },
    ];

    const resolvedFaqs = faqs.length > 0 ? faqs : [
        {
            question: "How do I care for my premium products?",
            answer: "To maintain the longevity and beauty of your premium items, we recommend following the specific care instructions provided with each product. Generally, keeping items in a cool, dry place and avoiding direct sunlight for extended periods will help preserve their quality."
        },
        {
            question: "What is the estimated delivery time?",
            answer: "Orders are typically processed within 24 hours. Domestic shipping usually takes 3-5 business days, while international shipping may take 7-14 days depending on the destination and customs clearance."
        },
        {
            question: "Can I customize my order with a gift message?",
            answer: "Yes, we offer complimentary gift messaging. During the checkout process, you'll have the option to include a personalized note that we will include with your beautifully packaged order."
        },
        {
            question: "What is your return policy for gifts?",
            answer: "We offer a hassle-free 15-day return policy for most items. If you are not completely satisfied with your purchase, you can initiate a return or exchange through our customer portal using your order ID."
        }
    ];

    return (
        <div className="w-full pt-0 pb-10">
            <div className="mx-auto px-4 md:px-6 lg:px-8 container">
                {/* Eyebrow + Heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full mb-4">
                        <Sparkles size={14} />
                        Why Shop With Us
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight uppercase">
                        {title || "The VASP Planner Promise"}
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Why Choose Us Section — vertical timeline */}
                    <div className="w-full lg:w-[40%]">
                        <div className="relative">
                            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-violet-200 via-gray-200 to-transparent" />
                            {defaultTrustBadges.map((badge, idx) => (
                                <div key={idx} className="relative flex gap-5 pb-10 last:pb-0 group">
                                    <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg ${badge.glow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        <badge.icon size={22} />
                                    </div>
                                    <div className="pt-1.5">
                                        <div className="text-[11px] font-bold text-violet-500 tracking-widest uppercase mb-1">
                                            Step 0{idx + 1}
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base mb-1">{badge.text}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed max-w-xs">{badge.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Floating stat strip */}
                        <div className="mt-2 flex items-center gap-6 bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-5 md:p-6 text-white shadow-xl shadow-violet-500/25">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                                    <Star size={18} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-base font-black leading-none">{displayRating}</div>
                                    <div className="text-[10px] text-violet-100 uppercase font-bold tracking-wider mt-1">Average Rating</div>
                                </div>
                            </div>
                            <div className="w-px h-9 bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                                    <Heart size={18} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-base font-black leading-none">{displayCustomers}</div>
                                    <div className="text-[10px] text-violet-100 uppercase font-bold tracking-wider mt-1">Happy Customers</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Accordion Side */}
                    <div className="w-full lg:w-[60%] bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                        <div className="relative bg-gradient-to-r from-violet-600 to-purple-700 p-6 md:p-8 overflow-hidden">
                            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
                            <div className="absolute -right-2 -bottom-10 w-20 h-20 rounded-full bg-white/10" />
                            <div className="relative flex items-center gap-3 mb-2">
                                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                                    <HelpCircle size={18} className="text-white" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white uppercase">Common Questions</h3>
                            </div>
                            <p className="relative text-violet-100/80 text-xs">
                                Quick answers to frequently asked questions about our {title?.toLowerCase() || "products"}.
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {resolvedFaqs.map((faq, idx) => (
                                <FAQItem
                                    key={idx}
                                    index={idx}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === idx}
                                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
