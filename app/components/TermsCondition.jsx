"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PolicyLayout from "./PolicyLayout";
import { Scale, FileText, UserCheck, Package, CreditCard, Truck, RotateCcw, AlertTriangle, Gavel, CheckCircle2, ChevronRight, Award } from "lucide-react";
import { commonService } from "../services/commonService";

export default function TermsCondition() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await commonService.fetchPageContent('terms');
      if (data) {
        setContent(data);
      }
      setLoading(false);
    };
    loadContent();
  }, []);

  const sections = [
    {
      id: 1,
      icon: <FileText size={24} />,
      title: "Agreement to Terms",
      color: "from-pink-500 to-rose-500",
      content: "By accessing and using VASP Planner, you agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access our gifting platform."
    },
    {
      id: 2,
      icon: <UserCheck size={24} />,
      title: "User Obligations",
      color: "from-blue-500 to-indigo-500",
      content: "You are responsible for maintaining the confidentiality of your account credentials and for providing accurate delivery information for cakes, flowers, and gifts."
    },
    {
      id: 3,
      icon: <Package size={24} />,
      title: "Product Quality",
      color: "from-purple-500 to-violet-500",
      content: "We guarantee the highest quality for all our products. Note that fresh items like flowers and artisanal cakes may have slight variations due to their handcrafted nature."
    },
    {
      id: 4,
      icon: <CreditCard size={24} />,
      title: "Payment Terms",
      color: "from-green-500 to-emerald-500",
      content: "Payments are processed securely via third-party providers. All prices recorded are inclusive of applicable taxes unless stated otherwise at final checkout."
    },
    {
      id: 5,
      icon: <Truck size={24} />,
      title: "Delivery Liability",
      color: "from-amber-500 to-orange-500",
      content: "While we aim for exact time delivery, we are not liable for delays caused by extreme weather, festivals, or incorrect addresses provided by the sender."
    },
    {
      id: 6,
      icon: <RotateCcw size={24} />,
      title: "Refund Process",
      color: "from-cyan-500 to-teal-500",
      content: "Refunds for eligible returns are processed to the original payment source within 5-7 business days after verification of the reported product issue."
    }
  ];

  return (
    <PolicyLayout 
      title={content?.title || "Terms & Conditions"} 
      subtitle="Legal Framework" 
      breadcrumb="Terms & Conditions"
      icon={Scale}
    >
      <div className="p-8 md:p-12 lg:p-16">
        {/* Intro Banner */}
        <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 mb-20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -mr-10 -mt-10" />
           <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 text-pink-600 shadow-sm border border-pink-50">
                    <Award size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">Official Agreement</span>
                 </div>
                 <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Terms <span className="text-pink-600">Overview</span></h2>
                 <p className="text-gray-600 leading-relaxed text-lg mb-8">
                    Welcome to VASP Planner. These terms govern your use of our website and services. By placing an order for our premium cakes, flowers, or gifts, you acknowledge that you have read and understood these policies.
                 </p>
                 <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl border border-pink-100">
                    <AlertTriangle size={24} className="text-pink-500 flex-shrink-0" />
                    <p className="text-xs text-pink-700 font-bold leading-relaxed italic">Important Note: Using our platform constitutes your full acceptance of these terms. Please read carefully.</p>
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50">
                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 tracking-tight uppercase">Quick <span className="text-amber-500">Summary</span> ➔</h3>
                 <div className="space-y-4">
                    {["Accuracy of Info", "Payment Security", "Quality Control", "Delivery Limitations"].map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-400 transition-all cursor-default">
                          <span className="text-sm font-bold text-gray-700 uppercase tracking-tighter">{item}</span>
                          <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                             <CheckCircle2 size={16} />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Dynamic Content */}
        {content && content.content && (
          <div className="max-w-4xl mx-auto mb-20 prose prose-amber lg:prose-xl">
             <div 
               dangerouslySetInnerHTML={{ __html: content.content }} 
               className="dynamic-content-wrapper"
             />
          </div>
        )}

        {/* Detailed Sections Grid (Keeping for visual richness) */}
        {!loading && (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {sections.map((section) => (
                <div key={section.id} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                   <div className={`w-14 h-14 bg-gradient-to-br ${section.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                      {section.icon}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                   <p className="text-sm text-gray-600 leading-relaxed font-bold opacity-80">{section.content}</p>
                </div>
              ))}
           </div>
        )}

        {/* Legal Footer */}
        <div className="p-10 md:p-16 bg-[#0f0f0f] rounded-[3rem] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
           <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center justify-center gap-3">
                 <Gavel className="text-amber-400" size={24} /> Governing <span className="text-amber-400">Laws</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                These conditions are governed by and construed in accordance with the laws of India. Any disputes arising from the use of VASP Planner will be subject to the exclusive jurisdiction of the state of Haryana and Karnataka courts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href="/support" className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-amber-400 transition-all duration-300">
                    Seek Clarification
                 </Link>
                 <Link href="/privacy-policy" className="px-10 py-5 bg-white/10 text-white border border-white/20 font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-white/20 transition-all duration-300">
                    Privacy Statement
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </PolicyLayout>
  );
}