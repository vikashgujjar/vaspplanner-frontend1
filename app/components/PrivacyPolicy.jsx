"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PolicyLayout from "./PolicyLayout";
import { Shield, Lock, Eye, CheckCircle2, AlertCircle, Info, Database, Globe, UserCheck, Settings } from "lucide-react";
import { commonService } from "../services/commonService";

export default function PrivacyPolicy() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await commonService.fetchPageContent('privacy-policy');
      if (data) {
        setContent(data);
      }
      setLoading(false);
    };
    loadContent();
  }, []);

  const categories = [
    {
      icon: <Database size={24} />,
      title: "Information Collection",
      color: "from-blue-500 to-indigo-500",
      content: "We collect personal information such as your name, email, phone number, and delivery address to fulfill your orders and provide a personalized gifting experience."
    },
    {
      icon: <Eye size={24} />,
      title: "How We Use Data",
      color: "from-amber-500 to-orange-500",
      content: "Your data is used to process transactions, provide customer support, and, with your consent, share updates about our latest collections and exclusive offers."
    },
    {
      icon: <Lock size={24} />,
      title: "Data Security",
      color: "from-emerald-500 to-teal-500",
      content: "We implement advanced encryption and security protocols to protect your sensitive information during transit and storage. We never store credit card details."
    }
  ];

  return (
    <PolicyLayout 
      title={content?.title || "Privacy Policy"} 
      subtitle="Data Protection" 
      breadcrumb="Privacy Policy"
      icon={Shield}
    >
      <div className="p-8 md:p-12 lg:p-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6 border border-emerald-100 shadow-sm">
              <UserCheck size={16} className="text-emerald-500" />
              <span className="text-emerald-600 text-xs font-black uppercase tracking-widest">Your Privacy Matters</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Commitment to <span className="text-emerald-600">Privacy</span></h2>
           <p className="text-gray-600 leading-relaxed text-lg">
             At VASP Planner, we understand the importance of your personal data. This policy outlines our transparent approach to data collection, usage, and the rigorous measures we take to keep your information secure.
           </p>
        </div>

        {/* Dynamic Content */}
        {content && content.content && (
          <div className="max-w-4xl mx-auto mb-16 prose prose-amber lg:prose-xl">
             <div 
               dangerouslySetInnerHTML={{ __html: content.content }} 
               className="dynamic-content-wrapper"
             />
          </div>
        )}

        {/* Categories Grid (Keeping for visual richness) */}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-6 mb-20">
             {categories.map((cat, idx) => (
               <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-all group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                     {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{cat.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{cat.content}</p>
               </div>
             ))}
          </div>
        )}

        {/* Detailed Content (Optional: Hide if dynamic content is very long, or keep as highlights) */}
        <div className="space-y-12 max-w-4xl mx-auto">
           <section className="bg-gray-50 rounded-[3rem] p-10 md:p-12 border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-3">
                 <span className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">1</span>
                 Key <span className="text-amber-500">Highlights</span>
              </h3>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-500 shadow-sm flex-shrink-0 mt-1">
                       <CheckCircle2 size={18} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-800 mb-1">Account Information</h4>
                       <p className="text-sm text-gray-600">When you register, we collect your profile details to manage your wishlist and order history.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-500 shadow-sm flex-shrink-0 mt-1">
                       <CheckCircle2 size={18} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-800 mb-1">Order & Transaction Data</h4>
                       <p className="text-sm text-gray-600">We store records of your purchases, including gift recipient details, to improve future recommendations.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-500 shadow-sm flex-shrink-0 mt-1">
                       <CheckCircle2 size={18} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-800 mb-1">Device & Usage Statistics</h4>
                       <p className="text-sm text-gray-600">We analyze browsing behavior and IP addresses to optimize our website performance and prevent fraud.</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-[#0f0f0f] rounded-[3rem] p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest relative z-10 flex items-center gap-3">
                 <span className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">2</span>
                 Policy <span className="text-emerald-400">Compliance</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">
                We regularly review our privacy practices to ensure they meet the latest data protection standards. Your security is our continuous commitment.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 relative z-10">
                 <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Info size={20} />
                 </div>
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Dynamic Portal Active</div>
              </div>
           </section>
        </div>
      </div>
    </PolicyLayout>
  );
}
