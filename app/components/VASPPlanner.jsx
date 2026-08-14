"use client";
import React, { useState, useEffect } from "react";
import { Truck, ShieldCheck, Headphones } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const VASPPlanner = ({ initialData = null }) => {
  const [plannerData, setPlannerData] = useState(() => {
    return initialData || {
      title: "HOME PAGE UPDATE",
      text: "Home Page Update Discover quality, convenience, and value all in one place. We bring you carefully selected products and services designed to simplify your life. Enjoy seamless experience, trusted reliability, and fast support. Join thousands of happy customers and explore smarter choices today. Your satisfaction is our priority—every step, every time.",
      features: [
        { title: "NATIONWIDE DELIVERY", desc: "Fast shipping across India", icon: "truck" },
        { title: "100% SAFE & SECURE", desc: "Secure payment methods", icon: "shield" },
        { title: "24/7 SUPPORT", desc: "Always here to help you", icon: "headphones" }
      ]
    };
  });

  useEffect(() => {
    if (!initialData) {
      const fetchPlannerData = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/home/vasp-planner`, { cache: 'no-store' });
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data) {
              setPlannerData(json.data);
            }
          }
        } catch (err) {
          console.error("Failed to load VASP Planner data:", err);
        }
      };

      fetchPlannerData();
    }
  }, [initialData]);

  const renderIcon = (type) => {
    switch (type) {
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-amber-400" />;
      case 'truck':
      default:
        return <Truck className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-12 md:py-16 border-t border-amber-500/10 mt-8 mb-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
        {/* Decorative Gold Star */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-400 text-sm">★</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider mb-4 text-white">
          {plannerData.title || "HOME PAGE UPDATE"}
        </h2>

        {/* Description */}
        <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed mb-10">
          {plannerData.text}
        </p>

        {/* 3 Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
          {(plannerData.features || []).map((feat, idx) => (
            <div key={idx} className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                {renderIcon(feat.icon)}
              </div>
              <div className="text-left">
                <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white">
                  {feat.title}
                </h4>
                <p className="text-[11px] md:text-xs text-gray-400">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VASPPlanner;