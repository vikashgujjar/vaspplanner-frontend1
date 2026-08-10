"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaStar } from "react-icons/fa6";
import {
  MessageSquare,
  Info,
  FileText,
  Star,
  CheckCircle2,
  Truck,
  RotateCcw,
  Package,
  Shield,
  Clock,
  ThumbsUp,
  Award,
  Quote,
  X
} from "lucide-react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Description = ({ productId }) => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [apiReviews, setApiReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await userService.submitReview({
        product_id: productId,
        rating,
        review: comment
      });

      if (res.success) {
        toast.success(res.message || "Review submitted successfully!");
        setIsReviewModalOpen(false);
        setRating(5);
        setComment("");
        fetchReviews();
      } else {
        const errorMsg = res.errors
          ? Object.values(res.errors).flat().join(', ')
          : (res.message || "Failed to submit review");
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };
  const fetchReviews = async () => {
    if (!productId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, { cache: 'no-store' });
      const data = await response.json();
      if (data.success) {
        setApiReviews(data.data);
        setReviewsMeta(data.meta);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const tabs = [
    // { id: "description", label: "Description", icon: <FileText size={18} /> },
    { id: "reviews", label: `Reviews (${reviewsMeta?.total || 0})`, icon: <MessageSquare size={18} /> },
    { id: "additional-info", label: "Additional Info", icon: <Info size={18} /> },
  ];

  const highlights = [
    { text: "Premium Quality Assured", icon: <Award size={16} /> },
    { text: "Handpicked and Freshly Sourced", icon: <CheckCircle2 size={16} /> },
    { text: "Elegant Packaging", icon: <Package size={16} /> },
    { text: "Express Delivery Available", icon: <Truck size={16} /> },
    { text: "Perfect for All Occasions", icon: <Star size={16} /> },
    { text: "100% Satisfaction Guarantee", icon: <Shield size={16} /> }
  ];

  const { averageRating, dynamicBreakdown } = React.useMemo(() => {
    if (!apiReviews || apiReviews.length === 0) {
      return {
        averageRating: "0.0",
        dynamicBreakdown: [5, 4, 3, 2, 1].map(stars => ({ stars, count: 0, percentage: 0 }))
      };
    }

    const total = apiReviews.length;
    const sum = apiReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(1);

    const counts = apiReviews.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {});

    const breakdown = [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: counts[stars] || 0,
      percentage: total > 0 ? Math.round(((counts[stars] || 0) / total) * 100) : 0
    }));

    return { averageRating: avg, dynamicBreakdown: breakdown };
  }, [apiReviews]);

  return (
    <>
      <div className="w-full text-white">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-0 border-b border-white/10 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm md:text-base font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${activeTab === tab.id
                ? "text-amber-400"
                : "text-gray-500 hover:text-white"
                }`}
            >
              <span className={`${activeTab === tab.id ? "text-amber-400" : "text-gray-600"}`}>
                {tab.icon}
              </span>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {/* Description Tab */}
          {/* {activeTab === "description" && (
            <div className="grid lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full mb-2">
                  <Quote size={16} className="text-amber-400" />
                  <span className="text-amber-400 text-sm font-medium">About This Product</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold">
                  Crafted with{" "}
                  <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                    Excellence
                  </span>
                </h3>

                <p className="text-gray-400 text-lg leading-relaxed">
                  Celebrate your special moments with our premium collection. Whether it's the elegance of fresh blooms,
                  the indulgence of gourmet cakes, or the personal touch of custom gifts, we ensure every item is
                  sourced and prepared with the utmost care to bring joy to your doorstep.
                </p>

                <p className="text-gray-400 leading-relaxed">
                  Our commitment to quality means that each product undergoes rigorous quality checks before reaching you.
                  We partner with the finest artisans and suppliers to deliver an experience that exceeds expectations.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { value: "100%", label: "Authentic", color: "text-green-400" },
                    { value: "24hr", label: "Delivery", color: "text-blue-400" },
                    { value: "1M+", label: "Happy Customers", color: "text-pink-400" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-full" />
                  Product Highlights
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-amber-500/30 transition-all group"
                    >
                      <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                  <Shield className="text-green-400" size={24} />
                  <div>
                    <p className="text-green-400 font-semibold text-sm">Quality Guaranteed</p>
                    <p className="text-green-400/70 text-xs">100% satisfaction or full refund</p>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Additional Info Tab */}
          {activeTab === "additional-info" && (
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
              {/* Returns Policy */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white">
                    <RotateCcw size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Returns Policy</h3>
                </div>

                <div className="text-gray-400 text-sm leading-relaxed space-y-4">
                  <p>
                    We stand behind the quality of our products. If you are not fully satisfied,
                    you may return unopened items within 30 days of delivery for a full refund.
                  </p>
                  <p>
                    Refunds are typically processed within four weeks of return shipment,
                    accounting for transit and bank processing times.
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {[
                      "30-day return window",
                      "Free return shipping",
                      "Full refund guaranteed",
                      "No questions asked"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-pink-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white">
                    <Truck size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Shipping Info</h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  We offer nationwide shipping for our collection. Delivery estimates and
                  shipping options are displayed at checkout based on your location and
                  product availability.
                </p>

                <div className="space-y-3">
                  {[
                    { type: "Standard Delivery", time: "3-5 Business Days", price: "₹49", color: "from-green-500 to-emerald-500" },
                    { type: "Express Delivery", time: "Within 24 Hours", price: "₹99", color: "from-blue-500 to-indigo-500" },
                    { type: "Same Day Delivery", time: "Within 4 Hours", price: "₹149", color: "from-purple-500 to-violet-500" }
                  ].map((option, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${option.color}`} />
                        <div>
                          <p className="text-white font-medium text-sm">{option.type}</p>
                          <p className="text-gray-500 text-xs">{option.time}</p>
                        </div>
                      </div>
                      <span className="text-amber-400 font-bold">{option.price}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-amber-200 text-xs font-medium flex items-center gap-2">
                    <Clock size={14} />
                    Free shipping on orders above ₹999
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {/* Review Summary */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Overall Rating */}
                  <div className="text-center md:border-r border-white/10 md:pr-8">
                    <div className="text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent mb-2">
                      {averageRating}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={20} className={i >= Math.floor(parseFloat(averageRating)) ? "opacity-50" : ""} />
                      ))}
                    </div>
                    <div className="text-gray-500 text-sm font-medium">Based on {reviewsMeta?.total || 0} Reviews</div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-3 md:col-span-1">
                    {dynamicBreakdown.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="text-sm font-bold w-3 text-gray-400">{item.stars}</span>
                        <Star fill="currentColor" size={14} className="text-amber-400" />
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-gray-500 text-right">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Write Review Button */}
                  <div className="text-center md:border-l border-white/10 md:pl-8">
                    <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <MessageSquare className="text-amber-400" size={28} />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Share your experience</p>
                    {isLoggedIn ? (
                      <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all transform active:scale-95"
                      >
                        Write a Review
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-amber-400 text-xs font-bold uppercase tracking-tight">Login to write a review</p>
                        <button
                          onClick={() => window.location.href = '/user/login'}
                          className="px-8 py-3 border-2 border-amber-500/50 text-amber-500 font-bold rounded-xl hover:bg-amber-500 hover:text-black transition-all"
                        >
                          Login Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="grid md:grid-cols-2 gap-6">
                {isLoadingReviews ? (
                  /* Skeleton Loader */
                  [...Array(2)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white/[0.05] rounded-2xl p-6 border border-white/[0.08] h-48">
                      <div className="flex justify-between mb-4">
                        <div className="w-20 h-4 bg-white/10 rounded" />
                        <div className="w-16 h-4 bg-white/10 rounded" />
                      </div>
                      <div className="w-full h-4 bg-white/20 rounded mb-4" />
                      <div className="w-3/4 h-4 bg-white/10 rounded" />
                    </div>
                  ))
                ) : apiReviews.length > 0 ? (
                  apiReviews.map((review, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:border-amber-500/20 transition-all group"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              fill={j < review.rating ? "currentColor" : "none"}
                              size={14}
                              className={j >= review.rating ? "opacity-30" : ""}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              Verified
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            {review.date}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-white font-bold mb-2 group-hover:text-amber-400 transition-colors">
                        {review.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        "{review.review}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-sm font-bold text-white uppercase">
                              {review.user.charAt(0)}
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-300">{review.user}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-500 font-medium">{review.helpful} helped</span>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-amber-400 transition-colors text-sm">
                            <ThumbsUp size={14} />
                            Helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10">
                    <p className="text-gray-500 italic">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div >

      {isReviewModalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="bg-[#1A1A1A] w-full max-w-lg rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
          >
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between relative">
              <div className="absolute top-0 right-0 p-8">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all group"
                >
                  <X size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  Write a Review
                </h3>
                <p className="text-gray-500 text-sm mt-1">Share your honest feedback with us</p>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleReviewSubmit} className="p-8 space-y-8">
              {/* Star Rating Selection */}
              <div className="space-y-4 text-center">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block">
                  How would you rate it?
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setRating(star)}
                      className="transition-transform active:scale-90 hover:scale-110"
                    >
                      <Star
                        size={32}
                        fill={star <= rating ? "#FBBF24" : "transparent"}
                        className={star <= rating ? "text-amber-400" : "text-white/10"}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-amber-400 text-xs font-black uppercase tracking-widest h-4">
                  {rating === 5 ? "It's Exceptional!" :
                    rating === 4 ? "Very Good" :
                      rating === 3 ? "It's Okay" :
                        rating === 2 ? "Could be better" : "Disappointing"}
                </p>
              </div>

              {/* Comment Input */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block">
                  Detailed Review
                </label>
                <div className="relative group">
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.08] transition-all resize-none"
                    placeholder="Tell us what you liked or what could be improved..."
                  />
                  <div className="absolute top-4 right-4 text-gray-700 pointer-events-none group-focus-within:text-amber-500/50">
                    <MessageSquare size={20} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-3xl text-black font-black uppercase tracking-widest hover:shadow-xl hover:shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Review
                    <div className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <Star size={14} fill="currentColor" />
                    </div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Description;