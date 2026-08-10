"use client";
import React from "react";
import PolicyLayout from "./PolicyLayout";
import { Quote, Star, Heart, CheckCircle2, MessageCircle, ShoppingBag, Truck } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sneha Sharma",
      location: "Bangalore",
      role: "Regular Customer",
      platform: "Ordered Birthday Cake",
      stars: 5,
      content: "The cake was simply divine! I've been ordering from VASP Planner for over a year now, and they never disappoint. The delivery was exactly at midnight, just as requested. Thank you for making my sister's birthday special!"
    },
    {
      name: "Sahil Verma",
      location: "Chandigarh",
      role: "Gift Sender",
      platform: "Ordered Anniversary Flowers",
      stars: 5,
      content: "I'm always worried about flower freshness when ordering online. VASP Planner changed my mind! The roses were fresh and smelled amazing. The packaging was top-notch and premium. Highly recommended!"
    },
    {
       name: "Anjali Gupta",
       location: "Mohali",
       role: "New Customer",
       platform: "Ordered Gift Hamper",
       stars: 5,
       content: "Everything from the website experience to the product quality was outstanding. Special shoutout to their support team - they helped me personalize my hamper even though it was a last-minute request!"
    },
    {
       name: "Vikas Kumar",
       location: "Hisar",
       role: "Premium Member",
       platform: "Ordered Personalized Mug",
       stars: 5,
       content: "Great service and quality! I've ordered many personalized gifts and they always turn out exactly as pictured. Fast and reliable delivery too. Love the new tracking feature!"
    }
  ];

  return (
    <PolicyLayout 
      title="Client Stories" 
      subtitle="Testimonials" 
      breadcrumb="Testimonials"
      icon={Quote}
    >
      <div className="p-8 md:p-12 lg:p-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 border border-amber-100 shadow-sm text-amber-600">
              <Star size={16} fill="currentColor" />
              <span className="text-xs font-black uppercase tracking-widest">Rated 4.9/5 by 1000+ Customers</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Voices of <span className="text-amber-500">Joy</span></h2>
           <p className="text-gray-600 leading-relaxed text-lg">
             Nothing makes us happier than hearing how VASP Planner brought a smile to your face or those of your loved ones. Here's what our wonderful community has to share.
           </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
           {testimonials.map((test, idx) => (
             <div key={idx} className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Quote size={80} />
                </div>
                <div className="relative z-10">
                   {/* Stars */}
                   <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} fill="#F59E0B" className="text-amber-500" />
                      ))}
                   </div>
                   <p className="text-gray-700 text-lg leading-relaxed italic mb-8 font-medium">
                      "{test.content}"
                   </p>
                   {/* Profile Info */}
                   <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-500/10">
                         {test.name.charAt(0)}
                      </div>
                      <div>
                         <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter">{test.name}</h4>
                         <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                            <CheckCircle2 size={12} className="text-emerald-500" /> {test.role} • {test.location}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Platform Stats / Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
           {[
             { title: "50k+", sub: "Happy Gifting Orders", icon: <ShoppingBag size={20} />, color: "bg-pink-100 text-pink-600" },
             { title: "4.9", sub: "Avg Rating Across Stores", icon: <Star size={20} fill="currentColor" />, color: "bg-amber-100 text-amber-600" },
             { title: "20+", sub: "Serviceable Cities", icon: <Truck size={20} />, color: "bg-blue-100 text-blue-600" },
             { title: "24/7", sub: "Customer Support", icon: <MessageCircle size={20} />, color: "bg-emerald-100 text-emerald-600" }
           ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 text-center group hover:bg-white hover:shadow-xl transition-all">
                 <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md shadow-gray-200/50`}>
                    {stat.icon}
                 </div>
                 <h4 className="text-2xl font-black text-gray-900 tracking-tighter">{stat.title}</h4>
                 <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.sub}</p>
              </div>
           ))}
        </div>

        {/* Share Story Section */}
        <div className="p-10 md:p-16 bg-[#0f0f0f] rounded-[3rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
           <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center justify-center gap-3">
                 <Heart className="text-pink-500" size={24} /> Share Your <span className="text-amber-400">Story</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                Did VASP Planner make your moment extra special? We'd love to hear your story. Your feedback helps us improve and helps others celebrate their moments better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button className="px-10 py-5 bg-white text-black rounded-2xl hover:bg-amber-400 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl">
                    Leave a Review
                 </button>
                 <button className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all font-black text-xs uppercase tracking-[0.2em]">
                    Go to Help Center
                 </button>
              </div>
           </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
