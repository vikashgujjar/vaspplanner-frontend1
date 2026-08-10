"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CherishedCelebrations = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedCategories = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/categories/featured`);
                const json = await res.json();
                if (json.success) {
                    setCategories(json.data.slice(0, 8));
                }
            } catch (err) {
                console.error("Failed to fetch featured categories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedCategories();
    }, []);

    if (loading) {
        return (
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-pulse flex space-x-4 justify-center">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="h-10 bg-slate-200 rounded w-32"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (categories.length === 0) return null;

    return (
        <div className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Left Side - Hero Image */}
                    <div className="relative order-2 col-span-5 lg:order-1 pt-20">
                        <Image
                            src={categories[0]?.image || '/placeholder.png'}
                            alt='Collection Hero'
                            width={800}
                            height={1000}
                            className="h-full w-full object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Right Side - Category Grid */}
                    <div className="grid grid-cols-4 col-span-7 gap-4 md:gap-5 order-1 lg:order-2">
                        {categories.map((category) => (
                            <Link key={category.uuid} href={`/category/${category.slug}`}>
                                <div className="group cursor-pointer">
                                    {/* Gift Box Container */}
                                    <div className="relative h-[120px] md:h-[150px] mb-3 transition-transform group-hover:scale-105 duration-300">
                                        <Image
                                            src={category.image || category.icon || "/placeholder.png"}
                                            alt={category.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Category Label */}
                                    <h3 className="text-center text-xs md:text-sm font-semibold text-gray-800">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CherishedCelebrations;
