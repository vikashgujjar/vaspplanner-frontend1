"use client";
import React, { useEffect, useState } from "react";
import PolicyLayout from "./PolicyLayout";
import { RotateCcw, Clock, ShieldCheck, AlertCircle, Package, CreditCard, CheckCircle2, Phone, Mail, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { commonService } from "../services/commonService";

export default function RefundPolicy() {
   const [content, setContent] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const loadContent = async () => {
       const data = await commonService.fetchPageContent('refund-policy');
       if (data) {
         setContent(data);
       }
       setLoading(false);
     };
     loadContent();
   }, []);

   const eligibilityPoints = [
      {
         icon: <Clock size={20} />,
         text: "Products must be returned within 7 days of the delivery date.",
         color: "from-blue-500 to-indigo-500"
      },
      {
         icon: <Package size={20} />,
         text: "Items must be unused, sealed, and in their original packaging.",
         color: "from-purple-500 to-violet-500"
      },
      {
         icon: <CheckCircle2 size={20} />,
         text: "Proof of purchase (order number, invoice) is required.",
         color: "from-emerald-500 to-teal-500"
      },
      {
         icon: <AlertCircle size={20} />,
         text: "Perishables (flowers/cakes) are non-returnable unless defective.",
         color: "from-pink-500 to-rose-500"
      }
   ];

   return (
      <PolicyLayout
         title={content?.title || "Refund Policy"}
         subtitle="Consumer Protection"
         breadcrumb="Refund Policy"
         icon={RotateCcw}
      >
         <div className="p-8 md:p-12 lg:p-16">
            {/* Intro */}
            <div className="max-w-4xl mx-auto text-center mb-16">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-6 border border-pink-100 shadow-sm text-pink-600">
                  <RotateCcw size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">Fair & Transparent</span>
               </div>
               <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Return & <span className="text-pink-600">Refund</span> Procedures</h2>
               <p className="text-gray-600 leading-relaxed text-lg">
                  At VASP Planner, we prioritize your satisfaction. This policy outlines our fair and transparent refund and return process for our gifts, flowers, cakes, and hampers.
               </p>
            </div>

            {/* Dynamic Content */}
            {content && content.content && (
               <div className="max-w-4xl mx-auto mb-16 prose prose-pink lg:prose-xl">
                  <div 
                    dangerouslySetInnerHTML={{ __html: content.content }} 
                    className="dynamic-content-wrapper"
                  />
               </div>
            )}

            {/* Eligibility Section (Keeping for visual richness) */}
            {!loading && (
               <section className="bg-gray-50 rounded-[3rem] p-10 md:p-12 border border-gray-100 mb-20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px]" />
                  <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest relative z-10 flex items-center gap-3">
                     <span className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">1</span>
                     Eligibility <span className="text-pink-600">Criteria</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                     {eligibilityPoints.map((point, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                           <div className="flex items-start gap-4">
                              <div className={`w-10 min-w-10 h-10 bg-gradient-to-br ${point.color} text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                                 {point.icon}
                              </div>
                              <p className="text-sm text-gray-700 font-bold opacity-80 leading-relaxed">{point.text}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Support Section */}
            <div className="p-10 md:p-16 bg-[#0f0f0f] rounded-[3rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
               <div className="relative z-10 max-w-3xl mx-auto text-center">
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center justify-center gap-3">
                     Need <span className="text-amber-400">Assistance?</span>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10">
                     If you have any questions about our Refund Policy or your specific order return status, please reach out to our dedicated support team.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <Link href="/support" className="flex items-center justify-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest">
                        <Mail size={16} /> Email Help
                     </Link>
                     <Link href="tel:+911234567890" className="flex items-center justify-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest">
                        <Phone size={16} /> Call Expert
                     </Link>
                     <Link href="/faq" className="flex items-center justify-center gap-2 p-4 bg-amber-500 text-black rounded-2xl hover:bg-amber-400 transition-all font-bold text-xs uppercase tracking-widest">
                        <Search size={16} /> View FAQs
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </PolicyLayout>
   );
}
