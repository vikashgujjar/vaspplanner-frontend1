"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus, FaStar, FaWhatsapp } from "react-icons/fa6";
import ImageMagnifier from "../../components/ImageMagnifier";
import Description from "./Description ";
import ProductAyurvedCard from "../../components/ProductAyurvedCard";
import SEOContent from "../../components/SEOContent";
import AuthModal from "../../components/AuthModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { toast } from 'react-toastify';
import { addToCartAsync, removeFromCartAsync } from "../../store/cartSlice";
import { addWishAsync, removeWishAsync } from "../../store/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { savePendingCartAction } from "../../utils/pendingCart";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Clock,
  ChevronRight,
  Heart,
  Share2,
  Gift,
  Award,
  CheckCircle2,
  ArrowRight,
  Package,
  RotateCcw,
  Headphones,
  ChevronUp,
  ChevronDown,
  Trash2,
  ShoppingBag,
  ExternalLink,
  MapPin,
  AlertCircle,
  HelpCircle
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductDetails = ({ slug, singleProduct, relatedProducts = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cartItem);

  const [activeImg, setActiveImg] = useState("");
  const [qnty, setQnty] = useState(1);
  const [readMore, setReadMore] = useState(false);
  const [selected, setSelected] = useState("");
  const wishList = useSelector((state) => state.wish.wishlist);
  const targetProdId = singleProduct?.id || singleProduct?.uuid || singleProduct?.product_id;
  const isWishlisted = wishList?.some((item) =>
    String(item.id) === String(targetProdId) ||
    String(item.uuid) === String(targetProdId) ||
    String(item.product_id) === String(targetProdId) ||
    String(item.product_uuid) === String(targetProdId) ||
    (singleProduct?.uuid && (
      String(item.id) === String(singleProduct.uuid) ||
      String(item.uuid) === String(singleProduct.uuid) ||
      String(item.product_id) === String(singleProduct.uuid) ||
      String(item.product_uuid) === String(singleProduct.uuid)
    ))
  );
  const [offers, setOffers] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);

  // Location States
  const [pincode, setPincode] = useState("");
  const [detectedCity, setDetectedCity] = useState("");
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [isServiceable, setIsServiceable] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const SUPPORTED_CITIES = [
    "bangalore", "hisar", "chandigarh",
    "panchkula", "mohali", "kharar", "zirkpur"
  ];

  const productVariants = singleProduct?.variants || [];

  const isDecorationProduct =
    (singleProduct?.title?.toLowerCase()?.includes("decoration") || singleProduct?.title?.toLowerCase()?.includes("premium")) ||
    (singleProduct?.category?.toLowerCase()?.includes("decoration") || singleProduct?.category?.toLowerCase()?.includes("premium")) ||
    (singleProduct?.sub_category?.toLowerCase()?.includes("decoration") || singleProduct?.sub_category?.toLowerCase()?.includes("premium"));

  // Memoize active variant search
  const activeVariant = useMemo(() => {
    return productVariants.find(v => String(v.uuid || v.id) === String(selected));
  }, [productVariants, selected]);

  // Derived prices
  const { unitPrice, unitOriginalPrice } = useMemo(() => ({
    unitPrice: Number(activeVariant ? (activeVariant?.sale_price || activeVariant?.price) : (singleProduct?.sale_price || singleProduct?.price)) || 0,
    unitOriginalPrice: Number(activeVariant ? (activeVariant?.price || activeVariant?.regular_price) : (singleProduct?.originalPrice || singleProduct?.price)) || 0
  }), [activeVariant, singleProduct]);

  const displayPrice = useMemo(() => unitPrice * qnty, [unitPrice, qnty]);
  const displayOriginalPrice = useMemo(() => unitOriginalPrice * qnty, [unitOriginalPrice, qnty]);

  const currentProductId = activeVariant ? activeVariant.id || activeVariant.uuid : singleProduct?.id;
  const currentProductUuid = activeVariant ? activeVariant.uuid : singleProduct?.uuid;
  const isInCart = cartList?.some(item => 
    String(item.id) === String(currentProductId) || 
    String(item.product_id) === String(currentProductId) || 
    String(item.variant_id) === String(currentProductId) ||
    String(item.uuid) === String(currentProductId) ||
    String(item.product_uuid) === String(currentProductId) ||
    (currentProductUuid && (
      String(item.id) === String(currentProductUuid) ||
      String(item.product_id) === String(currentProductUuid) ||
      String(item.uuid) === String(currentProductUuid)
    ))
  );


  useEffect(() => {
    const fetchOffers = async () => {
      if (!singleProduct?.id) return;
      try {
        const response = await fetch(`${API_BASE_URL}/products/${singleProduct?.id}/offers`, { cache: 'no-store' });
        const data = await response.json();
        if (data.success) {
          setOffers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setIsLoadingOffers(false);
      }
    };

    fetchOffers();
  }, [singleProduct?.id]);



  const handlePincodeChange = (e) => {
    // Extract only digits and limit to 6
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPincode(val);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  // Check serviceability when city changes

  // Check serviceability when pincode reaches 6 digits
  useEffect(() => {
    const controller = new AbortController();

    const checkPin = async () => {
      if (pincode.length === 6) {
        setLoadingLocations(true);
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`,
            { signal: controller.signal, cache: 'no-store' }
          );
          const data = await response.json();

          if (data && data[0]?.Status === "Success") {
            const offices = data[0].PostOffice;

            let foundMatch = null;
            for (const office of offices) {
              const reachableFields = [office.Block, office.District, office.Division, office.Circle, office.Name];
              foundMatch = reachableFields.find(f =>
                f && SUPPORTED_CITIES.includes(f.toLowerCase().trim())
              );
              if (foundMatch) break;
            }

            if (foundMatch) {
              setDetectedCity(foundMatch);
            } else {
              setDetectedCity(offices[0].District || offices[0].Block || "unsupported area");
            }
          } else {
            setIsServiceable(false);
            if (pincode.length === 6) toast.error("Invalid pincode or service unavailable");
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error("Error checking pincode:", error);
          }
        } finally {
          setLoadingLocations(false);
        }
      } else {
        setIsServiceable(null);
        setDetectedCity("");
      }
    };

    const timer = setTimeout(() => {
      checkPin();
    }, 150);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [pincode]);

  useEffect(() => {
    if (singleProduct?.variants?.length > 0) {
      const firstVariant = singleProduct?.variants?.[0];
      const variantId = firstVariant?.uuid || firstVariant?.id;
      setSelected(variantId || "standard");

      // Update image if variant has one
      const variantImg = firstVariant?.product_image || firstVariant?.image;
      if (variantImg) {
        setActiveImg(variantImg);
      } else if (singleProduct?.inerimgList?.length > 0) {
        setActiveImg(singleProduct?.inerimgList?.[0]);
      }
    } else {
      setSelected("standard");
      if (singleProduct?.inerimgList?.length > 0) {
        setActiveImg(singleProduct?.inerimgList?.[0]);
      } else if (singleProduct?.image) {
        setActiveImg(singleProduct?.image);
      }
    }
  }, [singleProduct]);

  const handleChange = (e) => {
    const variantId = e.target.value;
    setSelected(variantId);

    // Find the selected variant to update image if available
    const variant = productVariants.find(v => (v.uuid || v.id) === variantId);
    const variantImg = variant?.product_image || variant?.image;
    if (variantImg) {
      setActiveImg(variantImg);
    }
  };
  const notify = () => toast.success("🎉 Added to cart successfully!");

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied!`, {
      icon: "📋",
      position: "bottom-center",
      autoClose: 2000
    });
  };

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      toast.info("Please login to manage your wishlist", { icon: "🔐" });
      setIsAuthModalOpen(true);
      return;
    }

    if (isWishlisted) {
      dispatch(removeWishAsync(targetProdId));
      toast.error("Removed from wishlist", { icon: "💔" });
    } else {
      dispatch(addWishAsync(singleProduct));
      toast.success("Added to wishlist", { icon: "💚" });
    }
  };

  const features = [
    { icon: <Truck size={20} />, title: "Free Delivery", desc: "Orders over ₹999", color: "from-green-500 to-emerald-500" },
    { icon: <Clock size={20} />, title: "Same Day", desc: "Delivery available", color: "from-blue-500 to-indigo-500" },
    { icon: <RotateCcw size={20} />, title: "Easy Returns", desc: "7-day return policy", color: "from-purple-500 to-violet-500" },
    { icon: <Headphones size={20} />, title: "24/7 Support", desc: "Always here to help", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK */}
      {/* ============================================== */}
      <div className="relative overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${singleProduct?.image || ''}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0f0f0f]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10 py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                  Premium Selection
                </span>
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
              </div>

              <h1 className="text-3xl  text-capitalize  md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide">
                {singleProduct?.title?.split(' ')[0] || ''}{" "}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  {singleProduct?.title?.split(' ').slice(1).join(' ') || ''}
                </span>
              </h1>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} className="text-amber-500" />
                <Link href="/category/all-products" className="hover:text-amber-400 transition-colors">
                  Products
                </Link>
                <ChevronRight size={14} className="text-amber-500" />
                <span className="text-amber-400">{singleProduct?.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* SECTION 2: PRODUCT DETAILS - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-10 md:py-14 bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />


        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Side: Image Gallery */}
            <div className="w-full lg:w-[50%]">
              {/* Thumbnails */}
              <div className="w-full sticky top-30 flex flex-col md:flex-row gap-6">
                <div className="flex md:flex-col gap-3 order-2 md:order-1">
                  {singleProduct?.inerimgList?.map((elm, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImg(elm)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImg === elm
                        ? "border-pink-500 scale-105 shadow-lg shadow-pink-500/20"
                        : "border-gray-200 hover:border-pink-300"
                        }`}
                    >
                      <Image src={elm} alt={`Thumbnail ${index}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative flex-1 order-1 md:order-2 group">
                  <div className="relative bg-gray-50 border border-gray-100 rounded-3xl p-4 lg:p-8 overflow-hidden">
                    {/* Badges */}
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full">
                        {singleProduct?.discount}% OFF
                      </span>
                      {singleProduct?.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <Sparkles size={12} />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
                      <button
                        onClick={handleWishlistToggle}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isWishlisted
                          ? "bg-rose-500 text-white"
                          : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-500"
                          } shadow-lg`}
                      >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all shadow-lg">
                        <Share2 size={18} />
                      </button>
                    </div>

                    <div className="aspect-square md:aspect-auto md:h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden">
                      <ImageMagnifier activeImg={activeImg} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Product Info */}
            <div className="w-full lg:w-[50%] space-y-4 md:space-y-5">
              {/* Badge & Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full">
                  <Sparkles size={16} className="text-pink-500" />
                  <span className="text-pink-600 text-sm font-medium">Featured Product</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {singleProduct?.title}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={16} fill={i < (parseFloat(singleProduct?.avg_rating) || 0) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 border-l border-gray-200 pl-4 font-medium">
                    {parseFloat(singleProduct?.avg_rating) > 0
                      ? `${parseFloat(singleProduct?.avg_rating).toFixed(1)}/5`
                      : "(New Product)"}
                    {singleProduct?.review_count > 0 && ` (${singleProduct?.review_count} Reviews)`}
                  </span>
                </div>
              </div>

              {/* Price Card */}
              <div className="p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl space-y-2 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-900">₹{displayPrice.toLocaleString()}</span>
                  {displayOriginalPrice > displayPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">₹{displayOriginalPrice.toLocaleString()}</span>
                      <span className="px-3 py-1 bg-green-50 border border-green-200 rounded-lg text-green-600 font-bold text-sm">
                        Save ₹{Math.round(displayOriginalPrice - displayPrice).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" />
                  {qnty > 1 ? `Total for ${qnty} units` : "Inclusive of all taxes"} & 100% Quality Assurance
                </p>
              </div>

              {/* Custom Decor WhatsApp Stripe */}
              {isDecorationProduct && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const currentUrl = window.location.href;
                    const message = `Hi! I'm looking for customized decorations for this product:\n${currentUrl}`;
                    window.open(`https://wa.me/917056937000?text=${encodeURIComponent(message)}`, "_blank");
                  }}
                  className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:shadow-md hover:border-green-200 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-green-500/20 group-hover:scale-105 transition-transform">
                      <FaWhatsapp size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">Looking for Customized Decor?</h4>
                      <p className="text-xs text-gray-500">Talk with our Experts</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                </a>
              )}

              {/* Bank Offers & Coupons */}
              {offers.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-amber-100 rounded-lg">
                      <Sparkles size={16} className="text-amber-600" />
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Available Offers</h3>
                  </div>
                  <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {offers.map((offer) => (
                      <div
                        key={offer.uuid}
                        onClick={() => handleCopyCode(offer.code)}
                        className="flex-shrink-0 w-[280px] snap-center p-4 bg-gradient-to-r from-emerald-50 to-green-50/30 border border-emerald-100 rounded-xl relative overflow-hidden group hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                      >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 uppercase tracking-wider">
                              {offer.code}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight group-hover:text-emerald-500 transition-colors">Tap to copy</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{offer.title}</h4>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{offer.desc}</p>
                          </div>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Checker */}
              <div className="p-5 md:p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 min-w-8 h-8 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Select Location</h3>
                  </div>
                  <HelpCircle size={16} className="text-gray-300" title="We currently serve specific cities across India" />
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={handlePincodeChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all placeholder:text-gray-400 placeholder:font-normal"
                    />
                    {loadingLocations && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-full">Quick Select City</span>
                    {SUPPORTED_CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setDetectedCity(city);
                          setPincode("");
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${detectedCity.toLowerCase() === city.toLowerCase()
                          ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/20"
                          : "bg-white border-gray-100 text-gray-600 hover:border-violet-300 hover:text-violet-600"
                          }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {isServiceable !== null && (
                  <div className={`flex items-start gap-3 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${isServiceable ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                    {isServiceable ? (
                      <CheckCircle2 size={18} className="text-emerald-500 mt-0.5" />
                    ) : (
                      <AlertCircle size={18} className="text-red-500 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`text-sm font-bold ${isServiceable ? 'text-emerald-900' : 'text-red-900'}`}>
                        {isServiceable ? 'Perfect! Delivery is available.' : 'Outside Service Area'}
                      </h4>
                      <p className={`text-xs ${isServiceable ? 'text-emerald-700' : 'text-red-700'} leading-relaxed mt-0.5`}>
                        {isServiceable
                          ? `We are currently providing services in ${detectedCity}.`
                          : `Sorry, we currently do not provide service in ${detectedCity}.`
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Variants */}
              {productVariants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Select Variant</h3>
                  <div className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {productVariants.map((option) => (
                      <label
                        key={option.uuid || option.id}
                        className={`relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer min-w-[260px] flex-shrink-0 snap-center group ${String(selected) === String(option.uuid || option.id)
                          ? "bg-pink-50 border-pink-500 shadow-md shadow-pink-500/10"
                          : "bg-white border-gray-200 hover:border-pink-300"
                          }`}
                      >
                        <input
                          type="radio"
                          name="variant"
                          value={option.uuid || option.id}
                          checked={String(selected) === String(option.uuid || option.id)}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-all ${String(selected) === String(option.uuid || option.id) ? "border-pink-500 bg-pink-500" : "border-gray-300"
                          }`}>
                          {String(selected) === String(option.uuid || option.id) && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <span className={`block text-sm font-bold truncate ${String(selected) === String(option.uuid || option.id) ? "text-pink-600" : "text-gray-700"}`}>
                            {option.name || option.label}
                          </span>
                          {option.discount_percent && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-black rounded uppercase tracking-tighter">
                              {option.discount_percent}% off
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-black text-gray-800 flex-shrink-0">
                          ₹{Number(option.sale_price || option.price).toLocaleString()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2.5">
                  <button
                    onClick={() => qnty > 1 && setQnty(qnty - 1)}
                    className="p-1.5 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <FaMinus size={14} />
                  </button>
                  <span className="px-6 font-bold text-lg min-w-14 text-center text-gray-900">{qnty}</span>
                  <button
                    onClick={() => setQnty(qnty + 1)}
                    className="p-1.5 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast.info("Please login to continue adding item to cart", { icon: "🔐" });
                      savePendingCartAction({
                        product: {
                          ...singleProduct,
                          id: currentProductId,
                          variant_id: activeVariant ? (activeVariant.id || activeVariant.uuid) : null,
                          variant_name: activeVariant ? (activeVariant.name || activeVariant.label) : null,
                          price: unitPrice,
                          originalPrice: unitOriginalPrice,
                          qnty: qnty
                        },
                        quantity: qnty,
                        variantId: activeVariant ? (activeVariant.id || activeVariant.uuid) : null,
                        options: {
                          pincode: pincode,
                          city: detectedCity
                        },
                        redirectUrl: window.location.pathname
                      });
                      router.push("/user/login");
                      return;
                    }

                    if (isInCart) {
                      dispatch(removeFromCartAsync(currentProductId));
                      toast.error("Removed from cart!", {
                        icon: "🗑️",
                        style: { borderRadius: "12px" }
                      });
                    } else {
                      dispatch(addToCartAsync({
                        ...singleProduct,
                        id: currentProductId,
                        price: unitPrice,
                        variant_id: activeVariant?.id || activeVariant?.uuid,
                        variant_name: activeVariant?.name || activeVariant?.label,
                        qnty
                      })).unwrap()
                        .then(() => toast.success("🎉 Added to cart successfully!"))
                        .catch((error) => toast.error(typeof error === 'string' ? error : "Failed to add to cart"));
                    }
                  }}
                  className={`flex-1 font-bold text-sm py-3 px-6 rounded-xl hover:shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2 ${isInCart
                    ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/25"
                    : "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-pink-500/25"
                    }`}
                >
                  {isInCart ? <Trash2 size={18} /> : <ShoppingBag size={18} />}
                  {isInCart ? "REMOVE" : "ADD TO CART"}
                </button>
                <button
                  onClick={async () => {
                    if (!isLoggedIn) {
                      toast.info("Please login to complete your purchase", { icon: "🔐" });
                      setIsAuthModalOpen(true);
                      return;
                    }

                    const productData = {
                      ...singleProduct,
                      id: activeVariant ? activeVariant.id || activeVariant.uuid : singleProduct?.id,
                      price: unitPrice,
                      variant_id: activeVariant?.id || activeVariant?.uuid,
                      variant_name: activeVariant?.name || activeVariant?.label,
                      qnty
                    };

                    await dispatch(addToCartAsync(productData));
                    window.location.href = "/checkout";
                  }}
                  className="flex-1 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-amber-500/25 transform transition-all active:scale-95"
                >
                  BUY NOW
                </button>
              </div>


              {/* Suggested Products Section */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Suggested Add-ons</h3>
                  <span className="text-[10px] font-medium text-gray-400">Direct add to cart</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedProducts
                    .filter(item => item.id !== singleProduct?.id)
                    .slice(0, 3)
                    .map((item) => (
                      <div key={item.id} className="group relative bg-gray-50 rounded-2xl p-3 border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300">
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-[11px] font-bold text-gray-800 line-clamp-1 mb-1">{item.title}</h4>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-pink-600">₹{item.price}</span>
                          <button
                            onClick={() => {
                              if (!isLoggedIn) {
                                toast.info("Please login to add items to your cart", { icon: "🔐" });
                                setIsAuthModalOpen(true);
                                return;
                              }

                              const inCart = cartList?.some(c => 
                                String(c.id) === String(item.id) || 
                                String(c.product_id) === String(item.id) || 
                                String(c.variant_id) === String(item.id)
                              );
                              if (inCart) {
                                dispatch(removeFromCartAsync(item.id));
                                toast.error("Removed from cart", { icon: "🗑️" });
                              } else {
                                dispatch(addToCartAsync({ ...item, qnty: 1 }))
                                  .unwrap()
                                  .then(() => toast.success("Added to cart", { icon: "🛍️" }))
                                  .catch((err) => toast.error(typeof err === 'string' ? err : "Failed to add to cart"));
                              }
                            }}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all shadow-sm ${cartList?.some(c => 
                                String(c.id) === String(item.id) || 
                                String(c.product_id) === String(item.id) || 
                                String(c.variant_id) === String(item.id)
                              )
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-pink-500 text-white hover:bg-pink-600"
                              }`}
                          >
                            {cartList?.some(c => 
                              String(c.id) === String(item.id) || 
                              String(c.product_id) === String(item.id) || 
                              String(c.variant_id) === String(item.id)
                            ) ? "REM" : "ADD"}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                      <p className="text-xs text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product Info Accordion */}
              <div className="bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Product Information</h3>
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="text-pink-600 text-sm font-bold flex items-center gap-1 hover:underline"
                  >
                    {readMore ? "Show Less" : "Read More"}
                    {readMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                <div className={`text-gray-600 text-sm leading-relaxed overflow-hidden transition-all duration-500 mt-4 ${readMore ? "max-h-[500px] opacity-100" : "max-h-16 opacity-80"
                  }`}>
                  <p dangerouslySetInnerHTML={{ __html: singleProduct?.description }}></p>
                  {readMore && (
                    <div className="space-y-4 pt-4 mt-4 border-t border-gray-200">
                      <p><span className="text-gray-900 font-bold">Delivery Info:</span> Available for same-day and midnight delivery in major cities.</p>
                      <ul className="space-y-2">
                        {[
                          "Freshness Guaranteed: Sourced daily and handled with care.",
                          "Secure Delivery: Specialized team ensures timely surprises.",
                          "Premium Packaging: Elegant presentation for every order."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs italic text-gray-400">Note: Actual product may vary slightly due to handcrafted nature.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: DESCRIPTION TABS - DARK */}
      {/* ============================================== */}
      <section className="relative py-16 md:py-24 bg-[#0f0f0f] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <Description productId={singleProduct?.id} />
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 4: RELATED PRODUCTS - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <Gift size={16} className="text-amber-500" />
              <span className="text-amber-600 text-sm font-medium">Recommended For You</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              You May Also <span className="text-amber-600">Like</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Explore more products that complement your selection
            </p>
          </div>

          <Swiper
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {relatedProducts.map((elm, index) => (
              <SwiperSlide key={index} className="h-auto">
                <ProductAyurvedCard product={elm} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link
              href="/category/all-products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transition-all hover:-translate-y-0.5 group"
            >
              View All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO & FAQ Section */}
      <SEOContent
        title={singleProduct?.insights?.title || `Discover ${singleProduct?.title || 'Our Product'}`}
        description={singleProduct?.insights?.content || `<p>The <strong>${singleProduct?.title || 'Our Product'}</strong> is a testament to our commitment to luxury and elegance. Designed for those who seek perfection in every detail, this product combines premium materials with master craftsmanship.</p><p>Ideal for gifting or personal enjoyment, it represents a standard of quality that is hard to find elsewhere. Experience the blend of tradition and modernity that makes this piece a must-have for your collection.</p>`}
        faqs={singleProduct?.faqs || [
          { question: `What makes ${singleProduct?.title || 'this product'} a great choice?`, answer: `The ${singleProduct?.title || 'product'} is selected for its high-quality finish, durability, and aesthetic appeal, making it a versatile choice for any occasion.` },
          { question: "Is the product exactly as shown in the images?", answer: "We take great care to ensure our photography accurately represents the product. However, because many of our items are handcrafted or use natural materials, slight variations may occur, adding to their unique charm." },
          { question: "How is the product packaged for delivery?", answer: "Every order is packaged in our signature premium gift boxes, designed to protect the item while providing a luxurious unboxing experience." },
          { question: "Can I include a gift message with this product?", answer: "Yes! You can add a personalized message at checkout. We will print it on a beautiful card and include it with your package." }
        ]}
        stats={singleProduct?.stats}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          window.location.href = "/checkout";
        }}
      />
    </div>
  );
};

export default ProductDetails;