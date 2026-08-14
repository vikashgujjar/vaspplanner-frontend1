'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaGift } from 'react-icons/fa6';
import ProductAyurvedCard from './ProductAyurvedCard';

export default function CategorySectionSlider({ slider }) {
    const {
        title = 'Collection',
        subtitle,
        icon,
        bg_color = '#ffffff',
        category_slug = '',
        products = []
    } = slider || {};

    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!products || products.length === 0) return null;

    const categoryLink = category_slug ? `/category/${category_slug}` : '/category/all-products';

    return (
        <div className="relative py-8 lg:py-12 transition-colors duration-500" style={{ backgroundColor: bg_color || '#ffffff' }}>
            <div className="relative container mx-auto px-4 md:px-6 lg:px-12">
                <div className="relative">
                    {/* Section Header */}
                    <div className="flex sm:flex-nowrap flex-wrap items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 min-w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md overflow-hidden p-1">
                                {icon ? (
                                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                                        <Image
                                            src={icon}
                                            alt={title}
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <span className="text-2xl"><FaGift /></span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500">
                                    {subtitle || `${products.length} handpicked products`}
                                </p>
                            </div>
                        </div>

                        <Link
                            href={categoryLink}
                            className="text-xs md:text-sm font-semibold text-gray-700 hover:text-amber-600 items-center gap-1 transition-colors group hidden md:flex"
                        >
                            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-all duration-300 hidden md:flex"
                        aria-label="Previous products"
                    >
                        <FaChevronLeft className="text-sm" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-all duration-300 hidden md:flex"
                        aria-label="Next products"
                    >
                        <FaChevronRight className="text-sm" />
                    </button>

                    {/* Horizontal Product Slider */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pt-2 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, idx) => (
                            <div
                                key={product.uuid || product.id || idx}
                                className="flex-shrink-0 w-[calc((100%-16px)/2)] sm:min-w-[280px] sm:max-w-[280px] snap-start"
                            >
                                <ProductAyurvedCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
