'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaGift, FaRing, FaCakeCandles, FaThumbsUp } from 'react-icons/fa6';
import { fetchProductsByCategory } from '../services/productService';
import ProductAyurvedCard from './ProductAyurvedCard';

export default function OfferPorductValid() {
  const [activeOccasion, setActiveOccasion] = useState('Birthday');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  const occasions = [
    { id: 'Birthday', label: 'Birthday', icon: <FaGift />, color: 'bg-pink-500', iconColor: 'text-pink-500', bgLight: 'bg-pink-50' },
    { id: 'Anniversary', label: 'Anniversary', icon: <FaRing />, color: 'bg-purple-500', iconColor: 'text-purple-500', bgLight: 'bg-purple-50' },
    { id: 'Wedding', label: 'Wedding', icon: <FaRing />, color: 'bg-rose-500', iconColor: 'text-rose-500', bgLight: 'bg-rose-50' },
    { id: 'Celebration', label: 'Celebration', icon: <FaCakeCandles />, color: 'bg-blue-500', iconColor: 'text-blue-500', bgLight: 'bg-blue-50' },
    { id: 'Festival', label: 'Festival', icon: <FaGift />, color: 'bg-amber-500', iconColor: 'text-amber-500', bgLight: 'bg-amber-50' },
    { id: 'Corporate', label: 'Corporate', icon: <FaThumbsUp />, color: 'bg-indigo-500', iconColor: 'text-indigo-500', bgLight: 'bg-indigo-50' }
  ];

  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      // If data is already in cache, use it
      if (cache[activeOccasion.toLowerCase()]) {
        setProducts(cache[activeOccasion.toLowerCase()]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchProductsByCategory(activeOccasion.toLowerCase());
        const fetchedProducts = data.products || [];
        setProducts(fetchedProducts);
        // Persist to local cache for subsequent switches
        setCache(prev => ({ ...prev, [activeOccasion.toLowerCase()]: fetchedProducts }));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeOccasion]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeOccasionData = occasions.find(occ => occ.id === activeOccasion);

  return (
    <div className="relative py-8 lg:py-8 bg-white">
      <div className="relative container mx-auto px-4 md:px-6 lg:px-12">

        {/* Products Section */}
        <div className="relative">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${activeOccasionData?.color} text-white shadow-md`}>
                <span className="text-2xl">
                  {activeOccasionData?.icon}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {activeOccasionData?.label} Collection
                </h3>
                <p className="text-sm text-gray-500">
                  {loading ? 'Fetching products...' : `${products.length} handpicked products`}
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

          {/* Products Carousel */}
          <div className="relative">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <>
                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll('left')}
                  className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <FaChevronLeft className="text-gray-700" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <FaChevronRight className="text-gray-700" />
                </button>
                <div
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
                >
                  {products.length > 0 ? (
                    products.slice(0, 8).map((elm, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-[calc((100%-12px)/1.5)] min-[500px]:max-[650px]:w-[calc((100%-24px)/2)] sm:w-[calc((100%-24px)/2.5)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] snap-start"
                      >
                        <ProductAyurvedCard product={elm} showViewMore={false} />
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