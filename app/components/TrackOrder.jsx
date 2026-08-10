"use client";
import React, { useState } from "react";
import PolicyLayout from "./PolicyLayout";
import { Search, MapPin, Package, Clock, CheckCircle2, ChevronRight, Truck, AlertCircle, ShoppingBag, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [status, setStatus] = useState(null); // 'idle', 'loading', 'success', 'error'

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId || !emailPhone) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const trackingSteps = [
    { title: "Order Placed", date: "Mar 23, 2026", time: "10:30 AM", status: "completed", icon: <ShoppingBag size={18} /> },
    { title: "Quality Check", date: "Mar 23, 2026", time: "11:45 AM", status: "completed", icon: <CheckCircle2 size={18} /> },
    { title: "Packed & Ready", date: "Mar 23, 2026", time: "01:20 PM", status: "current", icon: <Package size={18} /> },
    { title: "Out for Delivery", date: "Pending", time: "-", status: "upcoming", icon: <Truck size={18} /> },
    { title: "Delivered", date: "Pending", time: "-", status: "upcoming", icon: <MapPin size={18} /> }
  ];

  return (
    <PolicyLayout 
      title="Track Your Order" 
      subtitle="Order Tracking" 
      breadcrumb="Track Order"
      icon={Search}
    >
      <div className="p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto">
          {status === null || status === "idle" || status === "loading" ? (
            <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="text-center mb-10">
                 <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/10">
                   <Search size={40} />
                 </div>
                 <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Locate Your <span className="text-amber-500">Gifts</span></h2>
                 <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                   Enter your Order ID and the Email or Phone Number used during checkout to get real-time status of your delivery.
                 </p>
              </div>

              <form onSubmit={handleTrack} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Order ID</label>
                    <input
                      type="text"
                      placeholder="e.g. VASP-12345"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email or Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. name@example.com"
                      value={emailPhone}
                      onChange={(e) => setEmailPhone(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <button
                  disabled={status === "loading" || !orderId || !emailPhone}
                  className="w-full py-5 bg-gradient-to-r from-[#0f0f0f] to-[#222] text-amber-400 font-black uppercase text-sm tracking-[0.2em] rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group flex items-center justify-center gap-3 mt-4"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>Track Order Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Can't find Order ID?</h4>
                    <p className="text-xs text-gray-500">Check your confirmation email or SMS</p>
                  </div>
                </div>
                <Link href="/support" className="text-amber-600 font-black uppercase text-[10px] tracking-widest hover:text-amber-700 transition-colors">
                  Contact Support ➔
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
              {/* Order Status Header */}
              <div className="bg-[#0f0f0f] rounded-[3rem] p-10 md:p-12 border border-white/5 border-b-amber-500 border-b-4 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="text-center md:text-left">
                    <p className="text-amber-400/50 text-[10px] uppercase font-black tracking-widest mb-2">Order ID: {orderId}</p>
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Shipment <span className="text-amber-400">On Way</span></h3>
                    <p className="text-gray-400 text-sm">Estimated Delivery: Today, 5:00 PM - 8:00 PM</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                       <p className="text-gray-500 text-xs font-black uppercase tracking-tighter">Current Slot</p>
                       <p className="text-white font-bold text-sm uppercase">Evening Delivery</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 text-black rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/20">
                       <Truck size={32} />
                    </div>
                 </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="relative space-y-12">
                   {/* Vertical Line */}
                   <div className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 bg-gray-100" />

                   {trackingSteps.map((step, idx) => (
                     <div key={idx} className="relative z-10 flex items-start gap-6 group">
                        <div className={`w-[2.25rem] h-[2.25rem] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 border-4 border-white shadow-md ${
                          step.status === 'completed' ? 'bg-emerald-500 text-white' : 
                          step.status === 'current' ? 'bg-amber-500 text-white animate-pulse' : 
                          'bg-gray-100 text-gray-400'
                        }`}>
                           {step.icon}
                        </div>
                        <div className="flex-1 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                           <div className="space-y-0.5">
                              <h4 className={`font-black uppercase tracking-wide ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900 font-black'}`}>
                                {step.title}
                              </h4>
                              {step.status !== 'upcoming' && <p className="text-xs text-gray-500 font-bold">Processed at {step.title === 'Packed & Ready' ? 'Main Hub, Bengaluru' : 'Warehouse'}</p>}
                           </div>
                           <div className="text-right flex items-center gap-2">
                              <div>
                                 <p className={`text-[10px] font-black uppercase tracking-tighter ${step.status === 'upcoming' ? 'text-gray-300' : 'text-gray-400'}`}>{step.date}</p>
                                 <p className={`text-xs font-black ${step.status === 'upcoming' ? 'text-gray-200' : 'text-gray-900'}`}>{step.time}</p>
                              </div>
                              {step.status === 'completed' && <CheckCircle2 size={16} className="text-emerald-500" />}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-16 p-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                         <MapPin size={24} />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-gray-900 mb-1">Shipping Address</h4>
                         <p className="text-xs text-gray-500 leading-relaxed font-bold">123, Mullana, Ambala Haryana India (133203)</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setStatus("idle")}
                     className="px-8 py-3 bg-gray-900 text-amber-400 font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl shadow-black/10"
                   >
                     Track Another Order
                   </button>
                </div>
              </div>

              {/* Support info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
                   <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-pink-500 shadow-xl shadow-pink-500/10">
                      <Phone size={28} />
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tighter">Delay <span className="text-pink-600">Assistance</span></h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">Facing a delay or missing items? Our dispatch team is ready to help.</p>
                      <a href="tel:+911234567890" className="text-pink-600 font-black text-sm hover:underline">+91 12345 67890</a>
                   </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
                   <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10">
                      <Mail size={28} />
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tighter">Email <span className="text-emerald-600">Updates</span></h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">Questions about tracking? Send us an email with your order ID.</p>
                      <a href="mailto:support@vaspplanner.com" className="text-emerald-600 font-black text-sm hover:underline">info@vaspplanner.com</a>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PolicyLayout>
  );
}
