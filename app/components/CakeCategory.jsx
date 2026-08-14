'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaCakeCandles } from 'react-icons/fa6';
import { fetchProductsByCategory } from '../services/productService';
import ProductAyurvedCard from './ProductAyurvedCard';

export default function CakeCategory({ initialData = [] }) {
    const [products, setProducts] = useState(initialData);
    const [loading, setLoading] = useState(initialData.length === 0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (!initialData || initialData.length === 0) {
            const fetchCakes = async () => {
                setLoading(true);
                try {
                    const data = await fetchProductsByCategory('cake-collection');
                    setProducts(data.products || []);
                } catch (error) {
                    console.error("Failed to fetch cakes:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchCakes();
        }
    }, [initialData]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative py-8 lg:py-8 bg-green-50">
            <div className="relative container mx-auto px-4 md:px-6 lg:px-12">
                {/* Products Section */}
                <div className="relative">
                    {/* Section Header */}
                    <div className="flex sm:flex-nowrap flex-wrap items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500 text-white shadow-md">
                                <span className="text-2xl">
                                    <FaCakeCandles />
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Cake Collection
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {loading ? 'Fetching products...' : `${products.length} handpicked products`}
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/category/all-products"
                            className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors"
                        >
                            <span>View All</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Products Carousel */}
                    <div className="relative">
                        {loading ? (
                            <div className="flex gap-6 overflow-hidden pb-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex-shrink-0 w-[calc((100%-24px)/2)] sm:w-[calc((100%-24px)/2.5)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]">
                                        <div className="aspect-[4/5] bg-white rounded-2xl animate-pulse flex flex-col p-4 space-y-4">
                                            <div className="w-full h-3/4 bg-gray-100 rounded-xl" />
                                            <div className="h-4 w-3/4 bg-gray-100 rounded" />
                                            <div className="h-4 w-1/2 bg-gray-100 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Scroll Buttons */}
                                <button
                                    onClick={() => scroll('left')}
                                    className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 z-100 hover:bg-gray-50 transition-all"
                                >
                                    <FaChevronLeft className="text-gray-700" />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 z-100 hover:bg-gray-50 transition-all"
                                >
                                    <FaChevronRight className="text-gray-700" />
                                </button>
                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory min-h-[420px]"
                                >
                                    {products.length > 0 ? (
                                        products.slice(0, 8).map((elm, index) => (
                                            <div
                                                key={index}
                                                className="flex-shrink-0 w-[calc((100%-24px)/2)] sm:w-[calc((100%-24px)/2.5)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] snap-start"
                                            >
                                                <ProductAyurvedCard product={elm} showViewMore={false} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full">
                                            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                                                <div className="text-6xl mb-4 opacity-40">🎂</div>
                                                <h4 className="text-xl font-bold text-gray-700 mb-2">No Cakes Found</h4>
                                                <p className="text-gray-500">
                                                    We're adding delicious cakes soon. Check back later!
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
