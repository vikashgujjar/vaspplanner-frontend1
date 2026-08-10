"use client";
import React, { useState } from "react";
import Link from "next/link";
import PolicyLayout from "./PolicyLayout";
import { HelpCircle, MessageCircle, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ShoppingBag, Truck, CreditCard } from "lucide-react";
import { toast } from "react-toastify";

export default function Support() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      orderId: "",
      subject: "Tracking Inquiry",
      message: ""
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate API
      setTimeout(() => {
         toast.success("Your request has been submitted successfully!");
         setFormData({ name: "", email: "", orderId: "", subject: "Tracking Inquiry", message: "" });
         setIsSubmitting(false);
      }, 1500);
   };

   const contactMethods = [
      {
         icon: <Phone size={24} />,
         title: "Call Us",
         value: "+91 12345 67890",
         href: "tel:+911234567890",
         color: "bg-emerald-50 text-emerald-600 border-emerald-100"
      },
      {
         icon: <Mail size={24} />,
         title: "Email Us",
         value: "info@vaspplanner.com",
         href: "mailto:info@vaspplanner.com",
         color: "bg-blue-50 text-blue-600 border-blue-100"
      },
      {
         icon: <MessageCircle size={24} />,
         title: "Live Chat",
         value: "Chat with an Expert",
         href: "#",
         color: "bg-amber-50 text-amber-600 border-amber-100"
      }
   ];

   const quickTopics = [
      { icon: <Truck size={18} />, title: "Delivery Tracking", href: "/track-order" },
      { icon: <CreditCard size={18} />, title: "Payments & Refunds", href: "/refund-policy" },
      { icon: <CheckCircle2 size={18} />, title: "Return Eligibility", href: "/refund-policy" },
      { icon: <ShoppingBag size={18} />, title: "Order Placement", href: "/faq" }
   ];

   return (
      <PolicyLayout
         title="Customer Support"
         subtitle="Priority Care"
         breadcrumb="Support"
         icon={HelpCircle}
      >
         <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-6xl mx-auto space-y-16">
               {/* Top Quick links */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickTopics.map((topic) => (
                     <Link key={topic.title} href={topic.href} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center group">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-4 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors shadow-inner">
                           {topic.icon}
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-tight text-gray-800">{topic.title}</h4>
                     </Link>
                  ))}
               </div>

               <div className="grid lg:grid-cols-5 gap-12">
                  {/* Form Side */}
                  <div className="lg:col-span-3 space-y-8">
                     <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] -mr-10 -mt-10" />
                        <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-3">
                           <span className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">✉</span>
                           Send a <span className="text-amber-500">Message</span>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                                 <input
                                    required
                                    type="text"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                                 <input
                                    required
                                    type="email"
                                    placeholder="jane@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm"
                                 />
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Order ID (Optional)</label>
                                 <input
                                    type="text"
                                    placeholder="e.g. VASP-123456"
                                    value={formData.orderId}
                                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subject</label>
                                 <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm cursor-pointer appearance-none"
                                 >
                                    <option>Tracking Inquiry</option>
                                    <option>Payment Issue</option>
                                    <option>Damaged Product</option>
                                    <option>Refund Request</option>
                                    <option>Other Feedback</option>
                                 </select>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Message</label>
                              <textarea
                                 required
                                 rows={4}
                                 placeholder="How can we help you?"
                                 value={formData.message}
                                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm resize-none"
                              />
                           </div>

                           <button
                              disabled={isSubmitting}
                              className="w-full py-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase text-sm tracking-[0.2em] rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                           >
                              {isSubmitting ? (
                                 <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                 <>Submit Request <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                              )}
                           </button>
                        </form>
                     </div>
                  </div>

                  {/* Contact Info Side */}
                  <div className="lg:col-span-2 space-y-8">
                     {/* Availability Banner */}
                     <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border-b-4 border-amber-500 shadow-xl shadow-black/10">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center">
                              <Clock size={24} />
                           </div>
                           <div>
                              <h4 className="text-white font-black tracking-tight uppercase">Availability</h4>
                              <div className="flex items-center gap-2 text-xs">
                                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                 <span className="text-emerald-500 font-bold uppercase tracking-widest">Online Now</span>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center justify-between text-xs py-3 border-b border-white/5">
                              <span className="text-gray-500 font-bold uppercase tracking-widest">Mon - Sat</span>
                              <span className="text-gray-300 font-black">9:00 AM - 9:00 PM</span>
                           </div>
                           <div className="flex items-center justify-between text-xs py-3">
                              <span className="text-gray-500 font-bold uppercase tracking-widest">Sunday</span>
                              <span className="text-gray-300 font-black">9:00 AM - 6:00 PM</span>
                           </div>
                        </div>
                     </div>

                     {/* Quick methods */}
                     <div className="space-y-4">
                        {contactMethods.map((method) => (
                           <a
                              key={method.title}
                              href={method.href}
                              className={`flex items-center gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl group transition-all duration-500`}
                           >
                              <div className={`w-14 min-w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-gray-200/50`}>
                                 {method.icon}
                              </div>
                              <div>
                                 <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{method.title}</h4>
                                 <p className="text-sm break-all font-black text-gray-900 group-hover:text-amber-600 transition-colors tracking-tight">{method.value}</p>
                              </div>
                           </a>
                        ))}
                     </div>

                     {/* Trust Note */}
                     <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-start gap-4">
                        <div className="w-10 h-10 bg-white text-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                           <AlertCircle size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-gray-900 mb-1">Response Time</h4>
                           <p className="text-xs text-gray-600 leading-relaxed font-bold">We typically respond to all support requests within 2 business hours during our operating times.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </PolicyLayout>
   );
}
