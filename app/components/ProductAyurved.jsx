'use client';
import React, { useState, useRef } from 'react';
import ProductAyurvedCard from './ProductAyurvedCard';
import {
    ChevronLeft,
    ChevronRight,
    Gift,
    Heart,
    Cake,
    Sparkles,
    ThumbsUp,
    Briefcase
} from 'lucide-react';
import Link from 'next/link';
 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProductAyurved({ initialData = [] }) {
    const [activeOccasion, setActiveOccasion] = useState(initialData?.[0]?.name || 'Birthday');
    const [apiData, setApiData] = useState(initialData);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef(null);

    React.useEffect(() => {
        const fetchOccasions = () => {
            let url = new URL(`${API_BASE_URL}/home/occasions`);
            if (typeof window !== 'undefined') {
                const loc = localStorage.getItem('userLocation');
                const pin = localStorage.getItem('userPincode');
                if (loc) url.searchParams.append('location', loc);
                if (pin) url.searchParams.append('pincode', pin);
            }
            fetch(url.toString(), { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data) {
                        setApiData(data.data);
                        if (data.data.length > 0 && !activeOccasion) {
                            setActiveOccasion(data.data[0].name);
                        }
                    }
                })
                .catch(err => console.error("Failed to fetch occasions", err));
        };

        fetchOccasions();

        const handleStorage = () => fetchOccasions();
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const occasionIcons = {
        'birthday': { icon: <Gift />, color: 'bg-pink-500', iconColor: 'text-pink-500', ringColor: 'ring-pink-300', bgLight: 'bg-pink-50', gradient: 'from-pink-500 to-pink-600' },
        'anniversary': { icon: <Heart />, color: 'bg-purple-500', iconColor: 'text-purple-500', ringColor: 'ring-purple-300', bgLight: 'bg-purple-50', gradient: 'from-purple-500 to-purple-600' },
        'wedding': { icon: <Heart />, color: 'bg-rose-500', iconColor: 'text-rose-500', ringColor: 'ring-rose-300', bgLight: 'bg-rose-50', gradient: 'from-rose-500 to-rose-600' },
        'celebration': { icon: <Cake />, color: 'bg-blue-500', iconColor: 'text-blue-500', ringColor: 'ring-blue-300', bgLight: 'bg-blue-50', gradient: 'from-blue-500 to-blue-600' },
        'festival': { icon: <Sparkles />, color: 'bg-amber-500', iconColor: 'text-amber-500', ringColor: 'ring-amber-300', bgLight: 'bg-amber-50', gradient: 'from-amber-500 to-amber-600' },
        'corporate': { icon: <Briefcase />, color: 'bg-indigo-500', iconColor: 'text-indigo-500', ringColor: 'ring-indigo-300', bgLight: 'bg-indigo-50', gradient: 'from-indigo-500 to-indigo-600' }
    };

    const defaultIconProps = { icon: <Gift />, color: 'bg-emerald-500', iconColor: 'text-emerald-500', ringColor: 'ring-emerald-300', bgLight: 'bg-emerald-50', gradient: 'from-emerald-500 to-emerald-600' };

    const occasions = apiData.map(occ => {
        const iconData = occasionIcons[occ.name.toLowerCase()] || defaultIconProps;
        return {
            id: occ.name,
            label: occ.name,
            count: occ.products?.length || 0,
            ...iconData
        };
    });

    const filteredProducts = React.useMemo(() => {
        if (!apiData || apiData.length === 0) return [];

        const currentOccasionData = apiData.find(occ => occ.name.toLowerCase() === activeOccasion.toLowerCase());
        if (!currentOccasionData || !currentOccasionData.products) return [];

        return currentOccasionData.products.map((product, index) => {
            const basePrice = parseFloat(product?.base_price) || 0;
            const salePrice = parseFloat(product?.effective_price || product?.sale_price) || basePrice;
            const discount = basePrice > salePrice ? Math.round(((basePrice - salePrice) / basePrice) * 100) : 0;
            const imageUrl = product.image || "/placeholder.png";

            return {
                id: product.uuid || `fallback-${index}`,
                title: product.name,
                heading: product.name,
                img: imageUrl,
                imgHover: imageUrl,
                inerimgList: [imageUrl],
                price: salePrice,
                originalPrice: basePrice,
                discount: discount,
                slug: product.slug,
                categories: [currentOccasionData.name],
                avg_rating: product.avg_rating,
                review_count: product.review_count
            };
        }).slice(0, 8);
    }, [activeOccasion, apiData]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const updateScrollState = React.useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    React.useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        updateScrollState();

        el.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [filteredProducts, updateScrollState]);

    const activeOccasionData = occasions.find(occ => occ.id === activeOccasion);

    return (
        <div className="relative py-8 lg:py-8 bg-gray-50 min-h-[480px]">
            <div className="relative container mx-auto px-4 md:px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
                        Tailored For Your
                        <br />
                        <span className="text-pink-500">Special Occasions</span>
                    </h2>
                    <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                        Discover perfect gifts for every celebration and create unforgettable moments
                    </p>
                </div>

                <>
                        {/* Mobile/Tablet: Horizontal Tabs */}
                        <div className="relative mb-8 lg:hidden -mx-4 px-4">
                            <div className="flex flex-nowrap items-stretch gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth snap-x snap-proximity">
                                {occasions.map((occasion) => {
                                    const isActive = activeOccasion === occasion.id;
                                    return (
                                        <button
                                            key={occasion.id}
                                            onClick={() => setActiveOccasion(occasion.id)}
                                            className={`relative flex-shrink-0 w-[108px] snap-start overflow-hidden rounded-3xl transition-all duration-300 ease-out ${isActive
                                                ? `bg-gradient-to-br ${occasion.gradient} shadow-xl shadow-gray-400/20 scale-[1.03]`
                                                : `bg-white border border-gray-100 shadow-sm hover:scale-[1.02] hover:shadow-md`
                                                }`}
                                        >
                                            {/* Decorative corner glow */}
                                            <span className={`absolute -top-5 -right-5 w-16 h-16 rounded-full blur-2xl transition-opacity duration-300 ${isActive ? 'bg-white/30 opacity-100' : 'opacity-0'}`} />

                                            <div className="relative flex flex-col items-center gap-2 px-3 py-4">
                                                <span
                                                    className={`flex items-center justify-center w-11 h-11 rounded-2xl text-xl transition-all duration-300 ${isActive
                                                        ? 'bg-white/25 text-white backdrop-blur-sm'
                                                        : `${occasion.bgLight} ${occasion.iconColor}`
                                                        }`}
                                                >
                                                    {occasion.icon}
                                                </span>
                                                <span className={`text-xs font-bold tracking-tight text-center leading-tight ${isActive ? 'text-white' : 'text-gray-700'}`}>
                                                    {occasion.label}
                                                </span>
                                                {occasion.count > 0 && (
                                                    <span className={`text-[10px] font-medium ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                                                        {occasion.count} picks
                                                    </span>
                                                )}
                                            </div>

                                            {isActive && (
                                                <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/40" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Scroll hint fades */}
                            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-50 to-transparent" />
                            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-50 to-transparent" />
                        </div>

                        {/* Desktop: Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                            {/* Left Side: Vertical Tabs (Desktop Only) */}
                            <div className="hidden lg:block lg:col-span-2">
                                <div className="sticky top-6">
                                    <div className="bg-slate-50/50 backdrop-blur-md p-3 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
                                        <div className="flex flex-col gap-3 p-2">
                                            {occasions.map((occasion) => {
                                                const isActive = activeOccasion === occasion.id;
                                                return (
                                                    <button
                                                        key={occasion.id}
                                                        onClick={() => setActiveOccasion(occasion.id)}
                                                        className={`
                                                            flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ease-out
                                                            ${isActive
                                                                ? `${occasion.color} text-white shadow-lg scale-105`
                                                                : `bg-white hover:bg-slate-100 text-slate-600 hover:scale-102`
                                                            }
                                                        `}
                                                    >
                                                        <span className={`text-xl transition-all duration-300 ${isActive ? 'scale-110 rotate-12' : 'grayscale-[0.5]'}`}>
                                                            {occasion.icon}
                                                        </span>
                                                        <span className={`text-xs font-semibold tracking-tight flex-1 text-left`}>
                                                            {occasion.label}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Products */}
                            <div className="lg:col-span-10">
                                <div className="relative">
                                    <div className="flex sm:flex-nowrap flex-wrap items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${activeOccasionData?.color || 'bg-pink-500'} text-white shadow-md`}>
                                                <span className="text-2xl">
                                                    {activeOccasionData?.icon || <Gift />}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">
                                                    {activeOccasionData?.label || 'Special'} Collection
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {filteredProducts.length} handpicked products
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href="/category/all-products"
                                            className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-pink-500 transition-colors"
                                        >
                                            <span>View All</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        {canScrollLeft && (
                                            <button
                                                onClick={() => scroll('left')}
                                                aria-label="Previous Occasion Products"
                                                className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                                            >
                                                <ChevronLeft className="text-gray-700" />
                                            </button>
                                        )}
                                        {canScrollRight && (
                                            <button
                                                onClick={() => scroll('right')}
                                                aria-label="Next Occasion Products"
                                                className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                                            >
                                                <ChevronRight className="text-gray-700" />
                                            </button>
                                        )}

                                        <div
                                            ref={scrollContainerRef}
                                            className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory min-h-[420px]"
                                        >
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((elm, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-shrink-0 w-[calc((100%-24px)/2)] sm:w-[calc((100%-24px)/2.5)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] snap-start"
                                                    >
                                                        <ProductAyurvedCard product={elm} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-full">
                                                    <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                                                        <div className="text-6xl mb-4 opacity-40">🎁</div>
                                                        <h4 className="text-xl font-bold text-gray-700 mb-2">No Products Found</h4>
                                                        <p className="text-gray-500">
                                                            We're adding amazing products soon. Check back later!
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hover\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
}