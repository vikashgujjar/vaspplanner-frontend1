"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PLACEHOLDER = "/placeholder.png";

export default function CategoryGridShowcase({ initialData = [], initialBanner = null }) {
  const [items, setItems] = useState(initialData);
  const [banner, setBanner] = useState(initialBanner);
  const [loading, setLoading] = useState(!initialData || initialData.length === 0);

  useEffect(() => {
    const loadFeaturedGrid = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/home/featured-category-grid`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setItems(json.data || []);
            if (json.banner) {
              setBanner(json.banner);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load featured category grid:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedGrid();
  }, []);

  if (!loading && (!items || items.length === 0)) {
    return null;
  }

  const displayBanner = banner || PLACEHOLDER;

  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Featured Bigger Banner Image */}
          <div className="lg:col-span-5 xl:col-span-4 flex">
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-auto min-h-[350px] lg:min-h-[420px] rounded-3xl overflow-hidden shadow-md group border border-gray-100">
              <Image
                src={displayBanner}
                alt="Category Grid Showcase Featured Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: 2-Row Category Grid */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-3">
                    <div className="w-full aspect-square bg-gray-100 rounded-2xl animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
                {items.map((item) => (
                  <Link
                    key={item.id || item.slug}
                    href={item.link || `/category/${item.slug}`}
                    className="group flex flex-col items-center"
                  >
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md border border-gray-100 mb-2 bg-gray-50 transition-all duration-300">
                      <Image
                        src={item.image || PLACEHOLDER}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center line-clamp-1 group-hover:text-pink-600 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
