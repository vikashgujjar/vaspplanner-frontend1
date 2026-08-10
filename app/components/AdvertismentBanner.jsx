"use client";
import React from "react";

export default function AdvertisementBanner() {
    return (
        <div className=" w-full relative z-10 container mx-auto px-5 md:px-12 xl:px-32">
            <div className="grid gap-3 md:grid-cols-2 gap-0">
                <div className="rounded-xl shadow-xl overflow-hidden">
                    <img src="/img/Banner/banner1.webp" className="max-h-100 object-top w-full object-cover" alt="" />
                </div>
                <div className="rounded-xl shadow-xl overflow-hidden">
                    <img src="/img/Banner/banner2.webp" className="max-h-100 w-full object-cover" alt="" />
                </div>
            </div>
        </div>

    );
}