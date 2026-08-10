"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CommonHeroBanner({
    backgroundImage = "/img/commonBanner/1.webp",
    title = "Product",
    highlightText = "Details",
    subtitle = "Discover our premium collection",
    breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Product", link: "#" }
    ]
}) {
    return (
        <div className="relative overflow-hidden bg-[#0f0f0f]">
            {/* Background Image with Overlays */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0f0f0f]" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />

            <div className="relative z-10 py-16 md:py-24 lg:py-28">
                <div className="container mx-auto px-4 md:px-6 lg:px-12">
                    <div className="text-center">
                        {/* Subtle Badge/Line */}
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
                            <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                                {subtitle}
                            </span>
                            <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-wide uppercase">
                            {title}{" "}
                            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                                {highlightText}
                            </span>
                        </h1>

                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <ChevronRight size={14} className="text-amber-500" />}
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="text-amber-400 font-medium">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.link} className="hover:text-amber-400 transition-colors">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Pattern/Texture Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none" />
        </div>
    );
}
