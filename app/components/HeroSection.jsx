"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// swiper/css and swiper/css/pagination are imported globally in app/globals.css

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const FALLBACK_IMAGE = "/img/banner1.png";

const getOptimizedBannerUrl = (url) => {
  if (!url) return FALLBACK_IMAGE;
  return url;
};

// Direct fast Image renderer without hydration state delay
const BannerImage = ({ src, alt, priority }) => {
  const optimizedSrc = getOptimizedBannerUrl(src);
  return (
    <Image
      src={optimizedSrc}
      alt={alt || "Hero Banner"}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-101"
      priority={priority}
      quality={70}
      onError={(e) => {
        if (e.target && e.target.src !== FALLBACK_IMAGE) {
          e.target.src = FALLBACK_IMAGE;
        }
      }}
    />
  );
};

export default function HeroSection({ banners: initialBanners = [] }) {
  const [banners, setBanners] = useState(() => {
    if (initialBanners && initialBanners.length > 0) return initialBanners;
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('cached_hero_banners');
        if (cached) return JSON.parse(cached);
      } catch (e) {}
    }
    return [
      { image: "/img/banner1.png", link: "/", title: "Banner 1" },
      { image: "/img/banner2.png", link: "/", title: "Banner 2" },
      { image: "/img/banner3.png", link: "/", title: "Banner 3" }
    ];
  });

  useEffect(() => {
    if (initialBanners && initialBanners.length > 0) {
      setBanners(initialBanners);
      try {
        localStorage.setItem('cached_hero_banners', JSON.stringify(initialBanners));
      } catch (e) {}
    } else {
      const fetchBanners = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/home/banners`, { next: { revalidate: 300 } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          if (json.success && json.data) {
            setBanners(json.data);
            try {
              localStorage.setItem('cached_hero_banners', JSON.stringify(json.data));
            } catch (e) {}
          }
        } catch (err) {
          console.error("Failed to fetch banners:", err);
        }
      };
      fetchBanners();
    }
  }, [initialBanners]);

  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4">
        {banners.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            roundLengths={true}
            loop={true}
            observer={true}
            observeParents={true}
            resizeObserver={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            navigation={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
            className="hero-swiper w-full relative"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={banner.link || "/"}
                  aria-label={banner.title || "Category Banner"}
                  className="relative block w-full aspect-video rounded-xl overflow-hidden transition-all duration-500 group shadow-sm hover:shadow-md"
                >
                  <div className="relative w-full h-full">
                    <BannerImage
                      src={banner.image}
                      alt={banner.title || "Banner"}
                      priority={index < 3}
                    />
                    {/* Decorative Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        /* Pin the carousel's height via CSS from first paint so Swiper's
           JS init (which switches grid -> single-row) can't shift content
           below it — this is what was causing the large CLS on this page. */
        .hero-swiper {
          aspect-ratio: 16 / 9;
        }
        @media (min-width: 768px) {
          .hero-swiper {
            aspect-ratio: 3.6 / 1;
          }
        }
        @media (min-width: 1024px) {
          .hero-swiper {
            aspect-ratio: 5.5 / 1;
          }
        }

        .hero-swiper:not(.swiper-initialized) .swiper-wrapper {
          display: grid !important;
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          gap: 16px !important;
          box-sizing: border-box !important;
        }
        @media (min-width: 768px) {
          .hero-swiper:not(.swiper-initialized) .swiper-wrapper {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-swiper:not(.swiper-initialized) .swiper-wrapper {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        .hero-swiper:not(.swiper-initialized) .swiper-slide {
          width: auto !important;
          flex-shrink: 1 !important;
        }
        @media (max-width: 767px) {
          .hero-swiper:not(.swiper-initialized) .swiper-slide:nth-child(n+2) {
            display: none !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-swiper:not(.swiper-initialized) .swiper-slide:nth-child(n+3) {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-swiper:not(.swiper-initialized) .swiper-slide:nth-child(n+4) {
            display: none !important;
          }
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d4145a !important;
          opacity: 0.3;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: #d4145a;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}