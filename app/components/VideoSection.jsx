"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaShare, FaVolumeUp, FaVolumeMute, FaChevronLeft, FaChevronRight, FaYoutube } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const VideoSection = ({ initialData = [] }) => {
  const [mutedVideos, setMutedVideos] = useState({});
  const [playingVideos, setPlayingVideos] = useState({});
  const [products, setProducts] = useState(initialData);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      const fetchStories = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/home/stories`, { cache: 'no-store' });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          if (json.success) setProducts(json.data);
        } catch (err) {
          console.error("Failed to fetch stories:", err);
        }
      };
      fetchStories();
    } else {
      setProducts(initialData);
    }
  }, [initialData]);

  const toggleMute = (id) => {
    setMutedVideos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const [activeIframe, setActiveIframe] = useState({});

  if (!products || products.length === 0) return null;

  return (
    <div className="py-8 md:py-8 bg-[#0f0f0f] ">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">

        <div className="text-start mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
            Joyful Gifting{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
        </div>

        {/* Video Cards Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-amber-500 hover:text-white transition-all"
            aria-label="Previous videos"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-amber-500 hover:text-white transition-all"
            aria-label="Next videos"
          >
            <FaChevronRight className="text-gray-700" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {products.map((product, idx) => {
              const videoId = product.uuid || product.id || idx;
              const ytId = product.youtube_id || extractYoutubeId(product.video_url);
              const isYoutube = product.video_type === 'youtube' || Boolean(ytId);
              const isMuted = mutedVideos[videoId] !== false;

              const shouldAutoplay = product.is_autoplay !== 0 && product.is_autoplay !== false;

              return (
                <div
                  key={videoId}
                  className="flex-shrink-0 w-[280px] snap-start"
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-900 h-[400px] cursor-pointer group"
                    onClick={(e) => {
                      if (!isYoutube) {
                        const video = e.currentTarget.querySelector('video');
                        if (video) {
                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }
                      }
                    }}
                  >
                    {/* Video Element: YouTube iframe or Custom MP4 */}
                    {isYoutube && ytId ? (
                      activeIframe[videoId] ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${ytId}&controls=1&modestbranding=1&rel=0&playsinline=1`}
                          title={product.title || "YouTube video"}
                          className="w-full h-full object-cover scale-100"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="relative w-full h-full"
                          onClick={() => setActiveIframe(prev => ({ ...prev, [videoId]: true }))}
                        >
                          <img
                            src={product.thumbnail || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                            alt={product.title || "Video story"}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                            <div className="bg-red-600 text-white p-4 rounded-full shadow-2xl group-hover:scale-110 transition-transform">
                              <FaPlay className="text-white text-xl ml-1" />
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <video
                        src={product.video_url}
                        poster={product.thumbnail || undefined}
                        autoPlay={shouldAutoplay}
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                        onPlay={() => setPlayingVideos(prev => ({ ...prev, [videoId]: true }))}
                        onPause={() => setPlayingVideos(prev => ({ ...prev, [videoId]: false }))}
                      >
                        <track kind="captions" srcLang="en" label="No captions available" />
                      </video>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

                    {/* Top Stats */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        <IoMdEye className="text-sm" />
                        <span>{product.views || 100}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isYoutube && (
                          <div className="bg-red-600/80 backdrop-blur-sm text-white p-2 rounded-full">
                            <FaYoutube className="text-xs" />
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute(videoId);
                          }}
                          className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                          aria-label="Toggle mute"
                        >
                          {isMuted ? (
                            <FaVolumeMute className="text-sm" />
                          ) : (
                            <FaVolumeUp className="text-sm" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (navigator.share) {
                              navigator.share({
                                title: product.title || "Joyful Gifting Story",
                                url: window.location.href
                              }).catch(() => {});
                            }
                          }}
                          className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                          aria-label="Share video"
                        >
                          <FaShare className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Play Button Overlay (For Custom MP4 Videos) */}
                    {!isYoutube && (
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${playingVideos[videoId] ? 'opacity-0 scale-150' : 'opacity-100'}`}>
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 shadow-2xl">
                          <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Info & Link */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 space-y-2.5">
                      <div className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg text-center shadow-lg uppercase tracking-wider">
                        {product.event_type || 'GIFTS'}
                      </div>
                      <Link
                        href={product.button_link || `/product/${product.slug || 'all-products'}`}
                        onClick={(e) => e.stopPropagation()}
                        className="block w-full py-2.5 bg-white/20 hover:bg-amber-500 hover:border-amber-500 text-white text-[11px] font-extrabold uppercase tracking-widest rounded-xl border border-white/30 text-center transition-all shadow-md"
                      >
                        {product.button_text || 'VIEW PRODUCT'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
};

export default VideoSection;