"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PolicyLayout from "./PolicyLayout";
import { Truck, Clock, ShieldCheck, MapPin, CheckCircle2, Package, RotateCcw, Building2 } from "lucide-react";
import { commonService } from "../services/commonService";

export default function ShippingPolicy() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await commonService.fetchPageContent('shipping-policy');
      if (data) {
        setContent(data);
      }
      setLoading(false);
    };
    loadContent();
  }, []);

  const deliveryFeatures = [
    {
      icon: <Clock size={24} />,
      title: "Timely Delivery",
      desc: "Fresh items like flowers and cakes are delivered within the specified time slot.",
      styles: {
        card: "bg-amber-50/50 border-amber-100 text-amber-900",
        icon: "bg-amber-500 text-white shadow-amber-200/50",
        hover: "hover:shadow-amber-100",
      }
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Safe & Secure",
      desc: "Our delivery partners follow strict hygiene and safety protocols for handling gifts.",
      styles: {
        card: "bg-emerald-50/50 border-emerald-100 text-emerald-900",
        icon: "bg-emerald-500 text-white shadow-emerald-200/50",
        hover: "hover:shadow-emerald-100",
      }
    },
    {
      icon: <Truck size={24} />,
      title: "Express Delivery",
      desc: "Need it now? We offer express delivery options for select locations.",
      styles: {
        card: "bg-blue-50/50 border-blue-100 text-blue-900",
        icon: "bg-blue-500 text-white shadow-blue-200/50",
        hover: "hover:shadow-blue-100",
      }
    }
  ];

  return (
    <PolicyLayout 
      title={content?.title || "Shipping & Delivery"} 
      subtitle="Logistic Services" 
      breadcrumb="Shipping Policy"
      icon={Truck}
    >
      <div className="p-8 md:p-12 lg:p-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6 text-blue-600 shadow-sm border border-blue-100">
             <Package size={16} />
             <span className="text-sm font-bold uppercase tracking-wider">Fast & Reliable</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Delivery <span className="text-blue-600">Overview</span></h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At VASP Planner, we understand that gifting is time-sensitive. Whether it's a birthday cake to be cut at midnight or fresh flowers for a morning anniversary, our logistic network is optimized for speed and quality.
          </p>
        </div>

        {/* Dynamic Content */}
        {content && content.content && (
           <div className="max-w-4xl mx-auto mb-16 prose prose-blue lg:prose-xl">
              <div 
                dangerouslySetInnerHTML={{ __html: content.content }} 
                className="dynamic-content-wrapper"
              />
           </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {deliveryFeatures.map((feature, idx) => (
            <div key={idx} className={`p-8 rounded-[2rem] border-2 ${feature.styles.card} ${feature.styles.hover} text-center hover:shadow-2xl transition-all duration-300 group`}>
               <div className={`w-16 h-16 ${feature.styles.icon} mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                 {feature.icon}
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
               <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed Sections (Keeping for visual richness) */}
        <div className="space-y-16">
          <section className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-3">
              <span className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">1</span>
              Delivery <span className="text-amber-500">Service Area</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                 <p className="text-gray-600 text-lg leading-relaxed">
                   Currently, we are providing delivery services in the following specific areas:
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    {["Bangalore", "Hisar", "Chandigarh", "Panchkula", "Mohali", "Kharar", "Zirakpur"].map((city) => (
                      <div key={city} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-800 font-bold hover:border-amber-400 transition-all cursor-default group">
                        <MapPin size={18} className="text-amber-500 group-hover:scale-125 transition-transform" />
                        {city}
                      </div>
                    ))}
                 </div>
               </div>
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                     <Building2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Express Inner City Network</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Our local hubs in these cities allow us to maintain a cold-chain for cakes and ensuring flowers remain fresh until they reach your doorstep.
                  </p>
               </div>
            </div>
          </section>

          <section className="bg-[#0f0f0f] rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
            <h3 className="text-2xl font-black text-white mb-10 uppercase tracking-widest relative z-10 flex items-center gap-3">
              <span className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">2</span>
              Logistic <span className="text-amber-400">Workflow</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">
               We use advanced tracking and route optimization to ensure your gifts arrive exactly when expected. Our logistics team works 24/7 to maintain the highest delivery standards.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 relative z-10 w-fit">
               <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck size={20} />
               </div>
               <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Fleet Tracking Enabled</div>
            </div>
          </section>
        </div>

        {/* Support CTA */}
        <div className="mt-20 text-center">
           <h4 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Still have questions about your delivery?</h4>
           <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/support" className="px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase text-sm tracking-widest rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-all">
                Access Live Support
              </Link>
              <Link href="/track-order" className="px-10 py-5 bg-white border border-gray-100 text-gray-800 font-black uppercase text-sm tracking-widest rounded-2xl shadow-lg hover:bg-gray-50 transition-all">
                Track My Gift
              </Link>
           </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
