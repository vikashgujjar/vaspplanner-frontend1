"use client";
import React, { useState } from "react";
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

const MobileOfferSection = () => {
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [offerData, setOfferData] = useState({
        badge: "LIMITED TIME OFFER",
        title: "Get Premium Perks Direct to Your Phone",
        perks: [
            "Early access to seasonal sales",
            "Exclusive mobile-only discount codes",
            "Instant alerts for limited edition gifts"
        ],
        form_title: "Stay in the Loop",
        form_desc: "No spam, just premium gifting joy.",
        button_text: "Claim My Offer",
        disclaimer: "BY JOINING, YOU AGREE TO RECEIVE PROMOTIONAL SMS. UNSUBSCRIBE AT ANY TIME."
    });

    React.useEffect(() => {
        const fetchOfferData = async () => {
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/gk/v1";
                const res = await fetch(`${API_BASE_URL}/home/mobile-offer`, { cache: 'no-store' });
                if (res.ok) {
                    const json = await res.json();
                    if (json.success && json.data) {
                        setOfferData(json.data);
                    }
                }
            } catch (err) {
                console.error("Failed to load mobile offer section data:", err);
            }
        };
        fetchOfferData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!phone || phone.length < 10) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setIsSubmitting(true);

        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/gk/v1";
            const fingerprint = localStorage.getItem("v_fingerprint");
            
            const response = await fetch(`${API_BASE_URL.replace('/api/gk/v1', '')}/mobile-offers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ 
                    phone: phone,
                    fingerprint: fingerprint 
                }),
            });

            if (response.ok) {
                toast.success("Successfully registered for mobile offers!");
                setIsSubscribed(true);
                setPhone("");
            } else {
                const data = await response.json();
                toast.error(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error("Error connecting to server. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubscribed) {
        return (
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-3xl p-8 text-center shadow-2xl border border-white/10 my-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Sparkles className="w-24 h-24 text-amber-400 rotate-12" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-indigo-200">Watch your phone for exclusive premium offers and updates.</p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative my-16 group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles size={14} />
                            {offerData.badge || "Limited Time Offer"}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            {offerData.title || "Get Premium Perks Direct to Your Phone"}
                        </h2>
                        <ul className="space-y-4 mb-8">
                            {(offerData.perks || []).map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-indigo-100/80">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span className="text-sm md:text-base font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-inner">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-center md:text-left mb-6">
                                <h4 className="text-white font-bold text-xl mb-1">{offerData.form_title || "Stay in the Loop"}</h4>
                                <p className="text-indigo-200/60 text-sm">{offerData.form_desc || "No spam, just premium gifting joy."}</p>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-400">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter mobile number"
                                    className="block w-full pl-12 pr-4 py-4 bg-indigo-950/50 border border-indigo-500/30 rounded-2xl text-white placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-indigo-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group/btn active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-indigo-950/30 border-t-indigo-950 rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {offerData.button_text || "Claim My Offer"}
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                            
                            <p className="text-[10px] text-center text-indigo-300/40 px-4 uppercase tracking-tighter">
                                {offerData.disclaimer || "By joining, you agree to receive promotional SMS. Unsubscribe at any time."}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileOfferSection;
