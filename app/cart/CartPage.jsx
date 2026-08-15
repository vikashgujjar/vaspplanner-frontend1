"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../services/productService";
import { updateCartQuantityAsync, removeFromCartAsync, fetchCartItems, addToCartAsync } from "../store/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
    ChevronRight,
    ChevronLeft,
    ShoppingCart,
    Minus,
    Plus,
    Trash2,
    Heart,
    Share2,
    Download,
    Package,
    Truck,
    Shield,
    Gift,
    Sparkles,
    Check,
    Star,
    ArrowRight,
    BadgePercent,
    Coins,
    Lock
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// swiper/css is imported globally in app/globals.css
// Custom prev/next buttons are used via prevEl/nextEl refs, so Swiper's
// own default nav-button CSS is never rendered — no need to import it.

import AuthModal from "../components/AuthModal";

export default function CartPage() {
    const cartList = useSelector((state) => state.cart.cartItem);
    console.log("Cart List:", cartList); // Debugging line to check cartList contents
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isMounted, setIsMounted] = useState(false); // Added for setIsMounted
    const [showAuthModal, setShowAuthModal] = useState(false);

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        setIsMounted(true);
        dispatch(fetchCartItems());

        const loadRelatedProducts = async () => {
            const products = await fetchAllProducts();
            // Filter out-of-stock products and take 10
            const inStockProducts = products.filter(p =>
                p._rawData?.stock_status === 'in_stock' ||
                p._rawData?.stock > 0 ||
                p._rawData?.stock_status === undefined
            ).slice(0, 10);
            setRelatedProducts(inStockProducts);
        };
        loadRelatedProducts();
    }, [dispatch]);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const subtotal = cartList.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.qnty) || 1), 0);
    const totalOriginalPrice = cartList.reduce((acc, item) => {
        const itemPrice = Number(item.price) || 0;
        const basePrice = Number(item.base_price) || itemPrice;
        // If base price is same as price, add a default 15% markup for 'original' look
        const original = basePrice > itemPrice ? basePrice : Math.round(itemPrice * 1.15);
        return acc + (original * (Number(item.qnty) || 1));
    }, 0);
    const savings = totalOriginalPrice - subtotal;
    const totalCoins = Math.floor(subtotal / 10); // 1 coin per 10 rupees instead of hardcoded 50 per item

    const toggleProductSelection = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const selectedProductsTotal = relatedProducts
        .filter(p => selectedProducts.includes(p.id))
        .reduce((acc, p) => acc + (p.price || 0), 0);

    const handleCheckoutClick = () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
        if (!token) {
            setShowAuthModal(true);
        } else {
            router.push("/checkout");
        }
    };

    // Empty Cart State
    if (cartList.length < 1) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4 py-20">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 text-center max-w-lg w-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/30">
                        <ShoppingCart size={34} className="text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Your Cart is Empty</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Looks like you haven't added anything to your cart yet. Explore our Ayurvedic collection and find what's best for you!
                    </p>
                    <Link
                        href="/category/all-products"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1 group"
                    >
                        Explore Products
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#f8f9fa]">
                {/* ============================================== */}
                {/* SECTION 1: HEADER - DARK */}
                {/* ============================================== */}
                <section className="relative bg-[#0c0c0c] overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />
                        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12 pt-6 md:pt-8 pb-16">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs mb-4">
                            <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} className="text-gray-700" />
                            <span className="text-amber-400 font-medium">Shopping Cart</span>
                        </nav>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl shadow-violet-500/30">
                                    <ShoppingCart size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                        Shopping Cart
                                    </h1>
                                    <p className="text-gray-500 text-sm">{cartList.length} items in your cart</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm">
                                    <Share2 size={14} />
                                    <span className="font-medium">Share</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm">
                                    <Download size={14} />
                                    <span className="font-medium">Download PDF</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Curve */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#f8f9fa] rounded-t-[40px]" />
                </section>

                {/* ============================================== */}
                {/* SECTION 2: CART CONTENT - LIGHT */}
                {/* ============================================== */}
                <section className="relative py-6 md:py-8 bg-[#f8f9fa]">
                    <div className="container mx-auto px-4 md:px-6 lg:px-12">

                        {/* Free Shipping Banner */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 md:p-4 flex items-center gap-3 mb-6 shadow-sm">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0">
                                <Truck size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-emerald-900 font-bold text-sm">🎉 Your order qualifies for FREE Shipping!</h4>
                                <p className="text-emerald-700 text-xs">Choose this option at checkout. See details</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-6 items-start w-full">
                            {/* Cart Items */}
                            <div className="lg:col-span-7 xl:col-span-8 space-y-5 min-w-0 w-full">
                                {/* Cart Items Card */}
                                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
                                    <div className="p-4 md:p-6 space-y-5">
                                        {cartList.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className={`flex flex-row gap-3 sm:gap-4 ${index !== cartList.length - 1 ? 'border-b border-gray-100 pb-5' : ''}`}
                                            >
                                                {/* Product Image */}
                                                <div className="relative w-24 h-24 sm:w-28 md:w-36 sm:h-28 md:h-36 bg-gray-50 rounded-2xl overflow-hidden group border-2 border-gray-100 flex-shrink-0">
                                                    <Image
                                                        src={item.img || "/placeholder.png"}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    {(item.discount_percent > 0 || item.discount > 0) && (
                                                        <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold rounded-lg leading-none">
                                                            {item.discount_percent || item.discount}% OFF
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                                                        <div className="flex-1">
                                                            <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight hover:text-violet-600 cursor-pointer transition-colors line-clamp-2">
                                                                {item.title}
                                                            </h3>
                                                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                                                <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                                                                    <Check size={11} /> In Stock
                                                                </span>
                                                                <span className="text-gray-300">|</span>
                                                                <span className="text-[11px] text-gray-500">Fulfilled by VASP Planner</span>
                                                            </div>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="flex sm:flex-col items-center sm:items-end gap-1 flex-shrink-0">
                                                            <span className="text-base md:text-lg font-black text-gray-900 leading-none">₹{item.price?.toLocaleString()}</span>
                                                            {(Number(item.base_price || item.originalPrice) > Number(item.price)) && (
                                                                <span className="text-[11px] md:text-xs text-gray-400 line-through">₹{Number(item.base_price || item.originalPrice).toLocaleString()}</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Product Meta */}
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        {(item.variant_name || item.name?.includes('Edition')) && (
                                                            <div className="flex flex-col">
                                                                <span className="text-gray-500 text-[10px]">Variant</span>
                                                                <span className="font-semibold text-gray-800 text-xs">{item.variant_name || 'Standard'}</span>
                                                            </div>
                                                        )}
                                                        {/* <div className="flex flex-col">
                                                            <span className="text-gray-500 text-[10px]">Fulfilled By</span>
                                                            <span className="font-semibold text-gray-800 text-xs">VASP Planner</span>
                                                        </div> */}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {/* Quantity */}
                                                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                                                            <button
                                                                onClick={() => {
                                                                    if (item.qnty <= 1) {
                                                                        dispatch(removeFromCartAsync(item.id));
                                                                        toast.error("Removed from cart!", { icon: "🗑️" });
                                                                    } else {
                                                                        dispatch(updateCartQuantityAsync({ productId: item.id, qnty: item.qnty - 1, type: 'decrement' }));
                                                                    }
                                                                }}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-violet-50 hover:text-violet-600 transition-all active:scale-90"
                                                            >
                                                                <Minus size={13} />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-gray-900 text-sm">{item.qnty}</span>
                                                            <button
                                                                onClick={() => dispatch(updateCartQuantityAsync({ productId: item.id, qnty: item.qnty + 1, type: 'increment' }))}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-violet-50 hover:text-violet-600 transition-all active:scale-90"
                                                            >
                                                                <Plus size={13} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => {
                                                                dispatch(removeFromCartAsync(item.id));
                                                                toast.error("Removed from cart!", { icon: "🗑️" });
                                                            }}
                                                            className="flex items-center gap-1.5 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl font-semibold text-xs transition-all"
                                                        >
                                                            <Trash2 size={13} /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Frequently Bought Together */}
                                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-4 sm:p-5 md:p-6 w-full max-w-full overflow-hidden">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Sparkles size={16} className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-base md:text-lg font-bold text-gray-900">Frequently Bought Together</h3>
                                                <p className="text-xs text-gray-500">Save up to 25%</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 self-end sm:self-auto">
                                            <button ref={prevRef} className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-violet-500 hover:text-white rounded-xl transition-all flex-shrink-0">
                                                <ChevronLeft size={16} />
                                            </button>
                                            <button ref={nextRef} className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-violet-500 hover:text-white rounded-xl transition-all flex-shrink-0">
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <Swiper
                                        loop={true}
                                        modules={[Navigation, Autoplay]}
                                        spaceBetween={16}
                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                                        onSwiper={(swiper) => {
                                            setTimeout(() => {
                                                if (swiper && swiper.params && swiper.params.navigation && prevRef.current && nextRef.current) {
                                                    swiper.params.navigation.prevEl = prevRef.current;
                                                    swiper.params.navigation.nextEl = nextRef.current;
                                                    if (swiper.navigation) {
                                                        swiper.navigation.init();
                                                        swiper.navigation.update();
                                                    }
                                                }
                                            });
                                        }}
                                        breakpoints={{
                                            320: { slidesPerView: 1.5 },
                                            480: { slidesPerView: 2 },
                                            768: { slidesPerView: 2.5 },
                                            1024: { slidesPerView: 3 },
                                        }}
                                        className="!pb-2"
                                    >
                                        {relatedProducts.map((product) => (
                                            <SwiperSlide key={product.id}>
                                                <div
                                                    onClick={() => {
                                                        const inCart = cartList.some(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id));
                                                        if (!inCart) toggleProductSelection(product.id);
                                                    }}
                                                    className={`relative bg-gray-50 rounded-2xl border-2 p-3 transition-all ${cartList.some(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id))
                                                        ? 'border-emerald-200 bg-emerald-50/50'
                                                        : selectedProducts.includes(product.id)
                                                            ? 'border-violet-500 bg-violet-50/50 shadow-lg shadow-violet-500/10'
                                                            : 'border-gray-200 hover:border-violet-300'
                                                        } ${cartList.some(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id)) ? 'cursor-default' : 'cursor-pointer'}`}
                                                >
                                                    {/* In Cart Badge */}
                                                    {cartList.some(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id)) && (
                                                        <div className="absolute z-[10] top-3 right-3 px-2 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg shadow-lg flex items-center gap-1 animate-in fade-in zoom-in">
                                                            <Check size={10} /> IN CART
                                                        </div>
                                                    )}

                                                    {/* Checkbox (only if not in cart) */}
                                                    {!cartList.some(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id)) && (
                                                        <div className={`absolute z-[10] top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${selectedProducts.includes(product.id)
                                                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30'
                                                            : 'bg-white border-2 border-gray-300'
                                                            }`}>
                                                            {selectedProducts.includes(product.id) && <Check size={14} className="text-white" />}
                                                        </div>
                                                    )}

                                                    {/* Image */}
                                                    <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2.5 bg-white border border-gray-200">
                                                        <Image src={product.img} alt={product.heading} fill className="object-cover" />
                                                    </div>

                                                    {/* Details */}
                                                    <h5 className="font-bold text-gray-900 text-xs line-clamp-2 mb-1.5">{product.heading}</h5>
                                                    <div className="flex items-center gap-1 mb-1.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                                                        ))}
                                                        <span className="text-[11px] text-gray-500 ml-1">({product.rating || "4.5"})</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-black text-gray-900 text-sm">₹{product.price}</span>
                                                            <span className="text-[11px] text-gray-400 line-through ml-2">₹{product.originalPrice || product.price + 200}</span>
                                                        </div>
                                                        {cartList.some(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id)) ? (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    const itemInCart = cartList.find(c => String(c.id) === String(product.id) || String(c.product_id) === String(product.id) || String(c.variant_id) === String(product.id));
                                                                    dispatch(removeFromCartAsync(itemInCart.id));
                                                                    toast.error("Removed from cart");
                                                                }}
                                                                className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        ) : (
                                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{product.discount || "25"}% Off</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Add Selected */}
                                    {selectedProducts.length > 0 && (
                                        <div className="mt-5 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                                            <div className="text-center sm:text-left">
                                                <p className="font-bold text-gray-900 text-sm">{selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''} selected</p>
                                                <p className="text-xs text-gray-600">
                                                    Total: <span className="font-bold text-violet-600">₹{selectedProductsTotal}</span>
                                                    <span className="text-gray-400 line-through ml-2">₹{selectedProductsTotal + (selectedProducts.length * 200)}</span>
                                                </p>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    const itemsToAdd = relatedProducts.filter(p => selectedProducts.includes(p.id));
                                                    const promises = itemsToAdd.map(item =>
                                                        dispatch(addToCartAsync({ ...item, qnty: 1 })).unwrap()
                                                            .then(() => ({ success: true, title: item.heading || item.title }))
                                                            .catch(err => ({ success: false, title: item.heading || item.title, error: err }))
                                                    );

                                                    const results = await Promise.all(promises);
                                                    const successful = results.filter(r => r.success);
                                                    const failed = results.filter(r => !r.success);

                                                    if (successful.length > 0) {
                                                        toast.success(`Added ${successful.length} item${successful.length > 1 ? 's' : ''} to cart!`, { icon: "🛍️" });
                                                        // Clear selection for successful items
                                                        const successfulIds = itemsToAdd.filter((_, i) => results[i].success).map(item => item.id);
                                                        setSelectedProducts(prev => prev.filter(id => !successfulIds.includes(id)));
                                                    }

                                                    failed.forEach(f => {
                                                        toast.error(`${f.title}: ${typeof f.error === 'string' ? f.error : "Failed to add to cart"}`);
                                                    });
                                                }}
                                                className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-violet-500/30 transition-all active:scale-95"
                                            >
                                                Add {selectedProducts.length} to Cart
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-5 min-w-0 w-full">
                                {/* Order Summary */}
                                <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden">
                                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-5 text-white">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-lg">Order Summary</h4>
                                            <ShoppingCart size={20} className="opacity-50" />
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        <div className="space-y-2.5 text-sm">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Items ({cartList.length})</span>
                                                <span className="font-bold text-gray-900">₹{totalOriginalPrice}</span>
                                            </div>
                                            <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 px-3 py-2.5 rounded-xl border border-emerald-100">
                                                <span className="flex items-center gap-2">
                                                    <BadgePercent size={14} /> Savings
                                                </span>
                                                <span>- ₹{savings}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Shipping</span>
                                                <span className="font-bold text-emerald-600">FREE</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Estimated Taxes</span>
                                                <span className="font-bold text-gray-900">Included</span>
                                            </div>
                                        </div>

                                        <hr className="border-dashed" />

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide">Total Amount</p>
                                                <p className="text-xs text-emerald-600 font-bold">You save ₹{savings}</p>
                                            </div>
                                            <span className="text-2xl md:text-3xl font-black text-gray-900">₹{subtotal}</span>
                                        </div>

                                        <button
                                            onClick={handleCheckoutClick}
                                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1 group"
                                        >
                                            Checkout Now
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        <p className="text-center text-[11px] text-gray-400">
                                            By proceeding, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>

                                    {/* Coins Reward */}
                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100 p-4 flex items-center gap-3">
                                        <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-md border border-amber-200">
                                            <Coins size={22} className="text-amber-500" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-900 text-sm">🎁 Reward Unlock!</h5>
                                            <p className="text-xs text-gray-600">
                                                Earn <span className="text-amber-600 font-bold">{totalCoins} VASP Coins</span> on this purchase
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Lock size={18} className="text-gray-500" />
                                    </div>
                                    <p className="text-xs text-gray-500 leading-tight flex-1">
                                        <span className="font-bold text-gray-700">100% Secure Checkout</span> with 256-bit SSL Encryption. Your data is always protected.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => setShowAuthModal(false)}
            />
        </>
    );
}