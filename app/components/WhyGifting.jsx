"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const WhyGifting = ({ initialData = [] }) => {
    const [features, setFeatures] = useState(initialData);
    const [headerInfo, setHeaderInfo] = useState({
        sub_title: "Excellence in Gifting",
        title: "Why Choose VASP Planner",
        text: "Experience the joy of gifting with our carefully curated collection for every occasion"
    });
    const [buttonInfo, setButtonInfo] = useState({
        text: "Shop Best Gifts",
        link: "/category/all-products"
    });
    const [stats, setStats] = useState([
        { value: "100%", label: "Fresh Quality" },
        { value: "1M+", label: "Happy Surprises" },
        { value: "2-Hour", label: "Express Delivery" },
        { value: "500+", label: "Gift Options" }
    ]);
    const [loading, setLoading] = useState(initialData.length === 0);

    useEffect(() => {
        if (!initialData || initialData.length === 0) {
            const fetchSectionData = async () => {
                try {
                    const res = await fetch(`${API_BASE_URL}/home/why-choose-us`, { cache: 'no-store' });
                    const json = await res.json();
                    if (json.success && json.data) {
                        if (json.data.sub_title) setHeaderInfo(prev => ({ ...prev, sub_title: json.data.sub_title }));
                        if (json.data.title) setHeaderInfo(prev => ({ ...prev, title: json.data.title }));
                        if (json.data.text) setHeaderInfo(prev => ({ ...prev, text: json.data.text }));

                        if (json.data.button) {
                            if (json.data.button.text) setButtonInfo(prev => ({ ...prev, text: json.data.button.text }));
                            if (json.data.button.link) setButtonInfo(prev => ({ ...prev, link: json.data.button.link }));
                        }

                        if (json.data.stats && json.data.stats.length > 0) {
                            setStats(json.data.stats);
                        }

                        if (json.data.items && json.data.items.length > 0) {
                            setFeatures(json.data.items);
                        } else {
                            // Fallback to /home/features if why-choose-us items empty
                            const featRes = await fetch(`${API_BASE_URL}/home/features`, { cache: 'no-store' });
                            const featJson = await featRes.json();
                            if (featJson.success) setFeatures(featJson.data);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch why-choose-us data:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchSectionData();
        }
    }, [initialData]);

    if (loading || features.length === 0) return null;

    return (
        <section className="relative bg-[#0f0f0f] py-20 md:py-24 lg:py-28 overflow-hidden">
            {/* Luxury Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                        <span className="text-amber-400/80 text-xs font-medium tracking-[0.3em] uppercase">{headerInfo.sub_title}</span>
                        <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                        <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                            {headerInfo.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                        {headerInfo.text}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={feature.uuid}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 h-full">
                                {/* Shine Effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />

                                {/* Image Container */}
                                <div className="relative mx-auto mb-6 w-24 h-24">
                                    {/* Golden Ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-[#0f0f0f]" />
                                    </div>
                                    {/* Image */}
                                    <div className="absolute inset-[6px] rounded-full overflow-hidden">
                                        <Image
                                            src={feature.image || feature.icon || "/placeholder.png"}
                                            alt={feature.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Icon Badge */}
                                    <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
                                        <span className="text-xs">✨</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center relative z-10">
                                    <h3 className="text-xs md:text-sm lg:text-lg font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-[10px] md:text-sm lg:text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                                        {feature.subtitle || feature.description}
                                    </p>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="text-[10px] font-semibold text-amber-500/40 tracking-wider">0{index + 1}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center my-16 md:my-20">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                    <div className="mx-4">
                        <svg className="w-5 h-5 text-amber-500/50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                        </svg>
                    </div>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent mb-2 group-hover:from-amber-200 group-hover:via-amber-300 group-hover:to-amber-500 transition-all duration-300">
                                {stat.value}
                            </div>
                            <p className="text-gray-500 text-sm font-medium tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16 md:mt-20">
                    <Link href={buttonInfo.link || "/category/all-products"} className="cursor-pointer">
                        <div className="group cursor-pointer relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden">
                            {/* Button Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full" />
                            <div className="absolute inset-[1px] bg-[#0f0f0f] rounded-full group-hover:bg-transparent transition-colors duration-300" />

                            {/* Button Content */}
                            <span className="relative text-base font-semibold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent group-hover:text-black transition-colors duration-300">
                                {buttonInfo.text || "Shop Best Gifts"}
                            </span>
                            <svg className="relative w-5 h-5 text-amber-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WhyGifting;