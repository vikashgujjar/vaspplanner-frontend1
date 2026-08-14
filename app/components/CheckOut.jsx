"use client";
import React, { useState } from "react";
 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCartAsync, clearCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import { userService } from "../services/userService";
import { locationService } from "../services/locationService";
import { parseServerErrors, FieldError } from "../utils/serverValidation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Trash2,
  ChevronRight,
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Package,
  Tag,
  CreditCard,
  Wallet,
  Building2,
  Banknote,
  X,
  Check,
  Sparkles,
  Truck,
  Shield,
  RotateCcw,
  ArrowRight,
  Gift,
  Cake,
  Calendar
} from "lucide-react";

import AuthModal from "./AuthModal";

export default function CheckOut() {
  const dispatch = useDispatch();
  const [shipDifference, setShipDifference] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("razorpay");

  useEffect(() => {
    // Load Razorpay checkout SDK script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState({ countries: false, states: false, cities: false });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [mapCoords, setMapCoords] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const router = useRouter();

  const cartList = useSelector((state) => state.cart.cartItem) || [];

  useEffect(() => {
    if (cartList.length === 0 && !isOrderCompleted) {
      toast.info("Your cart is empty. Please select an item to checkout.");
      router.push("/");
    }
  }, [cartList.length, router, isOrderCompleted]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    countryId: "",
    stateId: "",
    cityId: "",
    notes: "",
    latitude: "",
    longitude: "",
    dob: "",
    anniversary: ""
  });

  // Pre-fill user data if logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      const storedUserData = localStorage.getItem("userData");
      if (token && storedUserData) {
        try {
          const user = JSON.parse(storedUserData);
          setFormData((prev) => {
            const nameParts = (user.name || user.first_name || "").split(" ");
            const firstName = nameParts[0] || user.first_name || "";
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : (user.last_name || "");

            return {
              ...prev,
              firstName: prev.firstName || firstName,
              lastName: prev.lastName || lastName,
              email: prev.email || user.email || "",
              phone: prev.phone || user.phone || ""
            };
          });
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }
  }, []);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    setLoadingAddresses(true);
    try {
      const res = await userService.getAddresses();
      if (res.success) {
        setAddresses(res.data);
        if (res.data.length > 0) {
          // Select default or first address
          const defaultAddr = res.data[0];
          setSelectedAddress(defaultAddr);
          setShowAddressForm(false);
          populateFormWithAddress(defaultAddr);
        } else {
          setShowAddressForm(true);
          setIsNewAddress(true);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const populateFormWithAddress = (addr) => {
    // Map API address data to form data
    const nameParts = (addr.recipient_name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    setFormData(prev => ({
      ...prev,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      phone: addr.recipient_phone || prev.phone,
      houseNo: addr.address_line_1 || prev.houseNo,
      street: addr.address_line_2 || prev.street,
      landmark: addr.landmark || prev.landmark,
      city: addr.city || prev.city,
      state: addr.state || prev.state,
      pincode: addr.pincode || prev.pincode,
      country: addr.country || prev.country
    }));
  };

  const handleSaveNewAddress = async () => {
    // Manual validation before saving if needed
    if (!formData.firstName || !formData.phone || !formData.houseNo || !formData.city || !formData.state || !formData.pincode || !formData.country) {
      toast.warning("Please fill in all required fields marked with *");
      return;
    }

    setLoadingAddresses(true);
    try {
      const addressData = {
        recipient_name: `${formData.firstName} ${formData.lastName}`,
        recipient_phone: formData.phone,
        address_line_1: formData.houseNo,
        address_line_2: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        label: "Home" // Default label
      };

      const res = await userService.addAddress(addressData);
      if (res.success) {
        toast.success("Address saved successfully!");
        await fetchAddresses(); // This will also select the first (likely new/default) address
        setShowAddressForm(false);
        setIsNewAddress(false);
      } else {
        toast.error(res.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Save address error:", error);
      toast.error("An error occurred while saving the address.");
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch Countries on Mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingLocations(prev => ({ ...prev, countries: true }));
      try {
        const res = await locationService.getCountries();
        if (res.success) {
          setCountries(res.data);
          // Set default country if India exists
          const india = res.data.find(c => c.name.toLowerCase() === "india");
          if (india) {
            setFormData(prev => ({ ...prev, country: india.name, countryId: india.id }));
          }
        }
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setLoadingLocations(prev => ({ ...prev, countries: false }));
      }
    };
    fetchCountries();
  }, []);

  // Fetch States when countryId changes
  useEffect(() => {
    if (!formData.countryId) {
      setStates([]);
      setCities([]);
      return;
    }

    const fetchStates = async () => {
      setLoadingLocations(prev => ({ ...prev, states: true }));
      try {
        const res = await locationService.getStates(formData.countryId);
        if (res.success) {
          setStates(res.data);
        }
      } catch (error) {
        console.error("Error loading states:", error);
      } finally {
        setLoadingLocations(prev => ({ ...prev, states: false }));
      }
    };
    fetchStates();
  }, [formData.countryId]);

  // Fetch Cities when stateId changes
  useEffect(() => {
    if (!formData.stateId) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setLoadingLocations(prev => ({ ...prev, cities: true }));
      try {
        const res = await locationService.getCities(formData.stateId);
        if (res.success) {
          setCities(res.data);
        }
      } catch (error) {
        console.error("Error loading cities:", error);
      } finally {
        setLoadingLocations(prev => ({ ...prev, cities: false }));
      }
    };
    fetchCities();
  }, [formData.stateId]);

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { cache: 'no-store' }
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            const detectedCountry = addr.country || "";
            const detectedState = addr.state || addr.state_district || "";
            const detectedCity = addr.city || addr.town || addr.village || addr.municipality || addr.city_district || addr.suburb || "";
            const detectedStateDistrict = addr.state_district || "";
            const detectedPincode = addr.postcode || "";
            const detectedStreet = addr.road || addr.suburb || "";
            const detectedHouse = addr.house_number || addr.building || "";
            const detectedLandmark = addr.neighbourhood || addr.suburb || "";

            console.log("Full Address Data:", addr);
            console.log("Detected City Options:", { city: addr.city, town: addr.town, village: addr.village, municipality: addr.municipality, cityDistrict: addr.city_district, suburb: addr.suburb, stateDistrict: addr.state_district });

            setMapCoords({ lat: latitude, lon: longitude });

            const countryMatch = countries.find(c =>
              c.name.toLowerCase() === detectedCountry.toLowerCase()
            );

            console.log("Detected Location:", { detectedCountry, detectedState, detectedCity, detectedPincode });

            setFormData(prev => ({
              ...prev,
              houseNo: detectedHouse || prev.houseNo,
              street: detectedStreet || prev.street,
              landmark: detectedLandmark || prev.landmark,
              pincode: detectedPincode || prev.pincode,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              country: countryMatch ? countryMatch.name : (detectedCountry || prev.country),
              countryId: countryMatch ? countryMatch.id : prev.countryId,
              // Temporarily store names to be matched when dropdowns load
              tempDetectedState: detectedState,
              tempDetectedCity: detectedCity,
              tempDetectedStateDistrict: detectedStateDistrict
            }));
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          toast.error("Failed to get address from coordinates");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "Location detection failed";
        if (error.code === 1) msg = "Location access denied. Please enable it in browser settings.";
        else if (error.code === 2) msg = "Location position unavailable.";
        else if (error.code === 3) msg = "Location detection timed out.";

        toast.error(msg);
        setIsDetectingLocation(false);
      },
      // Turned off high accuracy to prevent indoor satellite timeout, increased timeout to 20s, allow 1min cached results
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 }
    );
  };

  // Effect to match state when states list updates
  useEffect(() => {
    if (formData.tempDetectedState && states.length > 0) {
      const stateMatch = states.find(s =>
        s.name.toLowerCase().includes(formData.tempDetectedState.toLowerCase()) ||
        formData.tempDetectedState.toLowerCase().includes(s.name.toLowerCase())
      );
      if (stateMatch) {
        setFormData(prev => ({
          ...prev,
          state: stateMatch.name,
          stateId: stateMatch.id,
          tempDetectedState: null // clear once matched
        }));
      }
    }
  }, [states, formData.tempDetectedState]);

  // Effect to match city when cities list updates
  useEffect(() => {
    if (cities.length > 0 && (formData.tempDetectedCity || formData.tempDetectedStateDistrict)) {
      const searchTerms = [
        formData.tempDetectedCity?.toLowerCase(),
        formData.tempDetectedStateDistrict?.toLowerCase()
      ].filter(Boolean);

      const cityMatch = cities.find(c => {
        const cityName = c.name.toLowerCase();
        return searchTerms.some(term =>
          cityName.includes(term) || term.includes(cityName)
        );
      });

      if (cityMatch) {
        setFormData(prev => ({
          ...prev,
          city: cityMatch.name,
          cityId: cityMatch.id,
          tempDetectedCity: null,
          tempDetectedStateDistrict: null
        }));
      }
    }
  }, [cities, formData.tempDetectedCity, formData.tempDetectedStateDistrict]);

  // Auto-detect location on load once countries are ready AND we are adding a new address
  useEffect(() => {
    if (countries.length > 0 && isNewAddress) {
      handleAutoLocation();
    }
  }, [countries.length, isNewAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Map form names to API error names for clearing
    const apiFieldMap = {
      firstName: 'billing_first_name',
      lastName: 'billing_last_name',
      email: 'billing_email',
      phone: 'billing_phone',
      houseNo: 'billing_house_no',
      street: 'billing_street_address',
      city: 'billing_city',
      state: 'billing_state',
      pincode: 'billing_pincode',
      country: 'billing_country'
    };

    const apiErrorKey = apiFieldMap[name];
    if (apiErrors[apiErrorKey]) {
      setApiErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[apiErrorKey];
        return newErrors;
      });
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    if (cartList.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setApiErrors({});

    const orderData = {
      billing_first_name: formData.firstName,
      billing_last_name: formData.lastName,
      billing_email: formData.email,
      billing_phone: formData.phone,
      billing_house_no: formData.houseNo,
      billing_street_address: formData.street,
      billing_landmark: formData.landmark,
      billing_city: formData.city,
      billing_state: formData.state,
      billing_pincode: formData.pincode,
      billing_country: formData.country,
      payment_method: selectedPayment,
      notes: formData.notes,
      latitude: formData.latitude,
      longitude: formData.longitude,
      billing_dob: formData.dob,
      billing_anniversary: formData.anniversary
    };

    // If it's a new address and user checked "save to profile", add it to profile first
    if ((isNewAddress || !selectedAddress) && saveToProfile) {
      try {
        await userService.addAddress({
          recipient_name: `${formData.firstName} ${formData.lastName}`,
          recipient_phone: formData.phone,
          address_line_1: formData.houseNo,
          address_line_2: formData.street,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
          label: "Home" 
        });
      } catch (err) {
        console.error("Failed to save address to profile:", err);
      }
    }

    try {
      const response = await userService.checkout(orderData);
      if (response.success && response.data) {
        const createdOrder = response.data.order || response.data;
        const targetOrderId = createdOrder.id || createdOrder.uuid || createdOrder.order_number;

        // If online payment via Razorpay selected
        if (selectedPayment === "razorpay" || selectedPayment === "card" || selectedPayment === "upi" || selectedPayment === "bank") {
          const razorpayRes = await userService.createRazorpayOrder(targetOrderId);

          if (razorpayRes.success && razorpayRes.data) {
            const rData = razorpayRes.data;

            if (typeof window === "undefined" || !window.Razorpay) {
              toast.error("Razorpay Payment Gateway script is loading. Please try again in a moment.");
              setIsSubmitting(false);
              return;
            }

            const options = {
              key: rData.key,
              amount: rData.amount,
              currency: rData.currency || "INR",
              name: "VASP Planner",
              description: `Order Payment ${rData.test_mode ? "(Test Mode ₹1)" : ""}`,
              order_id: rData.razorpay_order_id,
              prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
              },
              theme: { color: "#7c3aed" },
              handler: async function (paymentResponse) {
                try {
                  const verifyRes = await userService.verifyRazorpayPayment({
                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                    razorpay_order_id: paymentResponse.razorpay_order_id,
                    razorpay_signature: paymentResponse.razorpay_signature,
                    order_id: targetOrderId
                  });

                  if (verifyRes.success) {
                    setIsOrderCompleted(true);
                    toast.success(rData.test_mode ? "🎉 Test Payment (₹1) successful & order confirmed!" : "🎉 Payment successful & order confirmed!");
                    dispatch(clearCart());
                    router.push("/user/profile?tab=orders");
                  } else {
                    toast.error(verifyRes.message || "Payment verification failed.");
                  }
                } catch (err) {
                  console.error("Signature verification error:", err);
                  toast.error("Error verifying payment signature.");
                } finally {
                  setIsSubmitting(false);
                }
              },
              modal: {
                ondismiss: function () {
                  toast.info("Payment popup closed. You can complete payment anytime.");
                  setIsSubmitting(false);
                }
              }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (resp) {
              toast.error(resp.error?.description || "Payment failed. Please try again.");
              setIsSubmitting(false);
            });
            rzp.open();
            return;
          } else {
            toast.error(razorpayRes.message || "Failed to initiate online payment.");
            setIsSubmitting(false);
            return;
          }
        }

        // Standard Cash on Delivery flow
        setIsOrderCompleted(true);
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        router.push("/user/profile?tab=orders");
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(response);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Please fix the validation errors");
        window.scrollTo({ top: 300, behavior: 'smooth' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const availableCoupons = [
    { code: "WELCOME10", discount: 10, type: "percentage", minOrder: 0 },
    { code: "SAVE100", discount: 100, type: "flat", minOrder: 500 },
    { code: "VASP20", discount: 20, type: "percentage", minOrder: 1000 },
  ];

  const subtotal = cartList.reduce((acc, item) => acc + item.price * item.qnty, 0);
  const shipping = 0;
  const savings = cartList.reduce((acc, item) => acc + (400 * item.qnty), 0);

  let couponDiscount = 0;
  if (appliedCoupon) {
    couponDiscount = appliedCoupon.type === "percentage"
      ? Math.round((subtotal * appliedCoupon.discount) / 100)
      : appliedCoupon.discount;
  }

  const tax = Math.round((subtotal - couponDiscount) * 0.18);
  const total = subtotal - couponDiscount + shipping + tax;

  const handleApplyCoupon = () => {
    setCouponError("");
    const foundCoupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (!foundCoupon) { setCouponError("Invalid coupon code"); return; }
    if (subtotal < foundCoupon.minOrder) { setCouponError(`Minimum order of ₹${foundCoupon.minOrder} required`); return; }
    setAppliedCoupon(foundCoupon);
    setShowCouponInput(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const paymentMethods = [
    { id: "razorpay", label: "Online Payment (Razorpay)", icon: CreditCard, description: "UPI, Cards, NetBanking, Wallets (Test Mode ₹1)", emoji: "⚡" },
    { id: "cod", label: "Cash on Delivery", icon: Banknote, description: "Pay when you receive", emoji: "💵" },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa]">
        <section className="relative bg-[#0c0c0c] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/img/commonBanner/1.webp')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c]/95 to-[#0c0c0c]" />
          </div>

          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />

          <div className="relative z-10 pt-12 pb-16 md:pt-16 md:pb-20">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-full mb-5">
                <Lock size={14} className="text-violet-400" />
                <span className="text-violet-300 text-xs font-semibold">Secure Checkout</span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Checkout</h1>

              <nav className="flex items-center justify-center gap-2 text-xs">
                <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
                <ChevronRight size={12} className="text-gray-700" />
                <Link href="/cart" className="text-gray-500 hover:text-white transition-colors">Cart</Link>
                <ChevronRight size={12} className="text-gray-700" />
                <span className="text-amber-400 font-medium">Checkout</span>
              </nav>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#f8f9fa] rounded-t-[40px]" />
        </section>

        {/* ============================================== */}
        {/* SECTION 2: CHECKOUT FORM - LIGHT */}
        {/* ============================================== */}
        <section className="relative py-6 md:py-8 bg-[#f8f9fa]">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { icon: Lock, title: "Secure Checkout", desc: "256-bit SSL Encrypted", gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
                { icon: Truck, title: "Free Shipping", desc: "On all orders", gradient: "from-blue-500 to-indigo-500", bg: "bg-blue-50" },
                { icon: RotateCcw, title: "Easy Returns", desc: "7 days return policy", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
              ].map((badge, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 bg-gradient-to-br ${badge.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <badge.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{badge.title}</h4>
                    <p className="text-xs text-gray-500">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Billing Form */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-5">
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Billing Details</h3>
                        <p className="text-gray-400 text-xs">
                          {!showAddressForm && selectedAddress ? "Review your shipping information" : "Enter your shipping information"}
                        </p>
                      </div>
                    </div>
                    {!showAddressForm && selectedAddress && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(true);
                          setIsNewAddress(false);
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all"
                      >
                        Change
                      </button>
                    )}
                  </div>

                  <div className="p-4 md:p-6">
                    {loadingAddresses ? (
                      <div className="space-y-4">
                        {/* Skeleton for Address Card */}
                        <div className="bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-5 md:p-6 space-y-3 animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-200 rounded-xl"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-40 bg-gray-200 rounded-lg"></div>
                              <div className="h-3 w-20 bg-gray-200 rounded-lg"></div>
                            </div>
                          </div>
                          <div className="space-y-2 pt-3">
                            <div className="h-3.5 w-full bg-gray-200 rounded-lg"></div>
                            <div className="h-3.5 w-3/4 bg-gray-200 rounded-lg"></div>
                            <div className="h-3.5 w-1/2 bg-gray-200 rounded-lg"></div>
                          </div>
                          <div className="pt-4 flex gap-3">
                            <div className="h-10 flex-1 bg-gray-200 rounded-xl"></div>
                            <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
                          </div>
                        </div>
                        {/* Skeleton for Secondary Elements */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-20 bg-gray-50 rounded-2xl animate-pulse"></div>
                          <div className="h-20 bg-gray-50 rounded-2xl animate-pulse"></div>
                        </div>
                      </div>
                    ) : !showAddressForm && selectedAddress ? (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-100 rounded-[2rem] p-5 md:p-6 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-violet-300/30 transition-all duration-500" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full -ml-12 -mb-12 blur-2xl" />

                          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white rounded-xl shadow-sm border border-violet-100 flex items-center justify-center flex-shrink-0">
                                  <User size={16} className="text-violet-600" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-base font-black text-gray-900 uppercase">{selectedAddress.recipient_name}</h4>
                                    <span className="px-2.5 py-1 bg-violet-600 text-white text-[9px] font-black uppercase rounded-lg tracking-wider shadow-sm">
                                      {selectedAddress.label || 'HOME'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex items-start gap-3">
                                  <MapPin size={16} className="text-violet-400 mt-0.5 shrink-0" />
                                  <div className="text-gray-600 leading-relaxed font-medium text-sm">
                                    <p className="text-sm md:text-base">{selectedAddress.address_line_1}, {selectedAddress.address_line_2}</p>
                                    <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                                    <p className="text-[11px] uppercase tracking-widest text-violet-400 font-bold mt-1">{selectedAddress.country}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 pt-1.5">
                                  <Phone size={16} className="text-violet-400 shrink-0" />
                                  <span className="text-gray-900 font-bold text-sm">{selectedAddress.recipient_phone}</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setShowAddressForm(true);
                                setIsNewAddress(false);
                              }}
                              className="md:mt-0 px-5 py-2.5 bg-white text-violet-600 border-2 border-violet-100 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all shadow-sm active:scale-95"
                            >
                              Edit Address
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : showAddressForm && !isNewAddress && addresses.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-black text-gray-900 uppercase tracking-tight">Select Saved Address</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setIsNewAddress(true);
                              setFormData({
                                firstName: "", lastName: "", email: "", phone: "",
                                houseNo: "", street: "", landmark: "", city: "",
                                state: "", pincode: "", country: "", countryId: "",
                                stateId: "", cityId: "", notes: "", latitude: "",
                                longitude: "", dob: "", anniversary: ""
                              });
                            }}
                            className="bg-violet-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-violet-200 hover:bg-violet-700 active:scale-95 transition-all"
                          >
                            + Add New
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {addresses.map((addr, index) => {
                            const isSelected = selectedAddress && (
                              (addr.id && selectedAddress.id === addr.id) ||
                              (!addr.id && 
                               selectedAddress.recipient_name === addr.recipient_name && 
                               selectedAddress.address_line_1 === addr.address_line_1)
                            );
                            
                            return (
                              <div
                                key={addr.id || index}
                                onClick={() => {
                                  setSelectedAddress(addr);
                                  setShowAddressForm(false);
                                  populateFormWithAddress(addr);
                                }}
                                className={`p-4 rounded-3xl border-2 cursor-pointer transition-all relative ${isSelected
                                  ? 'border-violet-500 bg-violet-50/50 shadow-violet-100'
                                  : 'border-gray-100 bg-white hover:border-violet-200'
                                  }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-3 right-3 w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center shadow-lg transform scale-110 animate-in zoom-in duration-300">
                                    <Check size={12} className="text-white" strokeWidth={4} />
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mb-2">
                                  <h5 className={`text-sm font-black uppercase truncate max-w-[120px] ${isSelected ? 'text-violet-900' : 'text-gray-900'}`}>{addr.recipient_name}</h5>
                                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded tracking-tighter ${isSelected ? 'bg-violet-200 text-violet-700' : 'bg-gray-200 text-gray-700'}`}>
                                    {addr.label || 'HOME'}
                                  </span>
                                </div>
                                <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-violet-700' : 'text-gray-600'}`}>{addr.address_line_1}, {addr.address_line_2}</p>
                                <p className={`text-[11px] mt-1.5 font-bold ${isSelected ? 'text-violet-500' : 'text-gray-400'}`}>{addr.recipient_phone}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <form className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-black text-gray-900 uppercase tracking-tight">
                            {isNewAddress ? "Add New Shipping Address" : "Update Shipping Address"}
                          </h4>
                          {addresses.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddressForm(true);
                                setIsNewAddress(false);
                              }}
                              className="text-violet-600 text-xs font-black uppercase tracking-wider hover:underline"
                            >
                              Back to Saved
                            </button>
                          )}
                        </div>
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_first_name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                              placeholder="John"
                            />
                            {apiErrors.billing_first_name && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_first_name[0]}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_last_name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                              placeholder="Doe"
                            />
                            {apiErrors.billing_last_name && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_last_name[0]}</p>}
                          </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                                placeholder="john@example.com"
                              />
                            </div>
                            {apiErrors.billing_email && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_email[0]}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                                placeholder="+91 98765 43210"
                              />
                              {apiErrors.billing_phone && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_phone[0]}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Personal Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Date of Birth (Optional)
                            </label>
                            <div className="relative">
                              <Cake className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                              <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-5 py-3 bg-gray-50 border-2 text-sm border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all cursor-pointer"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Anniversary Date (Optional)
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                              <input
                                type="date"
                                name="anniversary"
                                value={formData.anniversary}
                                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-5 py-3 bg-gray-50 border-2 text-sm border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Address Fields */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <MapPin size={16} className="text-violet-600" />
                              Shipping Address
                            </h4>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2 text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                {isDetectingLocation ? (
                                  <div className="w-3 h-3 border-2 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
                                ) : (
                                  <Check size={11} />
                                )}
                                {isDetectingLocation ? "Detecting Address..." : "Location Detected"}
                              </div>
                              {!isDetectingLocation && (
                                <button
                                  type="button"
                                  onClick={handleAutoLocation}
                                  className="text-[10px] font-black uppercase text-violet-600 hover:text-violet-700 flex items-center gap-1.5 px-2 py-1 hover:bg-violet-50 rounded-lg transition-all"
                                >
                                  <Sparkles size={12} /> Retry
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Map Preview */}
                          {mapCoords && (
                            <div className="mb-4 rounded-2xl overflow-hidden border-2 border-gray-100 h-36 relative shadow-inner animate-in fade-in slide-in-from-top-4 duration-700">
                              <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCoords.lon - 0.005},${mapCoords.lat - 0.005},${mapCoords.lon + 0.005},${mapCoords.lat + 0.005}&layer=mapnik&marker=${mapCoords.lat},${mapCoords.lon}`}
                                className="filter contrast-[1.1]"
                              ></iframe>
                              <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase text-violet-600 shadow-sm border border-violet-100 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></div>
                                Live delivery point
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              House/Flat No. <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <input
                                type="text"
                                name="houseNo"
                                required
                                value={formData.houseNo}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_house_no ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                                placeholder="123"
                              />
                              {apiErrors.billing_house_no && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_house_no[0]}</p>}
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Landmark</label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-5 py-3 bg-gray-50 border-2 text-sm border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                                placeholder="Near City Mall"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Street Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="street"
                            required
                            value={formData.street}
                            onChange={handleInputChange}
                            className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_street_address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                            placeholder="Enter your street address"
                          />
                          {apiErrors.billing_street_address && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_street_address[0]}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Country <span className="text-red-500">*</span></label>
                            <select
                              name="country"
                              value={formData.countryId}
                              onChange={(e) => {
                                const id = e.target.value;
                                const name = countries.find(c => c.id == id)?.name || "";
                                setFormData(prev => ({
                                  ...prev,
                                  countryId: id,
                                  country: name,
                                  stateId: "",
                                  state: "",
                                  cityId: "",
                                  city: ""
                                }));
                              }}
                              className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_country ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all disabled:opacity-50`}
                              disabled={loadingLocations.countries}
                              required
                            >
                              <option value="">{loadingLocations.countries ? "Loading Countries..." : "Select Country"}</option>
                              {countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                              ))}
                            </select>
                            {apiErrors.billing_country && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_country[0]}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
                            <select
                              name="state"
                              value={formData.stateId}
                              onChange={(e) => {
                                const id = e.target.value;
                                const name = states.find(s => s.id == id)?.name || "";
                                setFormData(prev => ({
                                  ...prev,
                                  stateId: id,
                                  state: name,
                                  cityId: "",
                                  city: ""
                                }));
                              }}
                              className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_state ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all disabled:opacity-50`}
                              disabled={loadingLocations.states || !formData.countryId}
                              required
                            >
                              <option value="">{loadingLocations.states ? "Loading States..." : "Select State"}</option>
                              {states.map(state => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                              ))}
                            </select>
                            {apiErrors.billing_state && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_state[0]}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">City <span className="text-red-500">*</span></label>
                            <select
                              name="city"
                              value={formData.cityId}
                              onChange={(e) => {
                                const id = e.target.value;
                                const name = cities.find(c => c.id == id)?.name || "";
                                setFormData(prev => ({ ...prev, cityId: id, city: name }));
                              }}
                              className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_city ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all disabled:opacity-50`}
                              disabled={loadingLocations.cities || !formData.stateId}
                              required
                            >
                              <option value="">{loadingLocations.cities ? "Loading Cities..." : "Select City"}</option>
                              {cities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                              ))}
                            </select>
                            {apiErrors.billing_city && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_city[0]}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pincode <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              name="pincode"
                              required
                              pattern="[0-9]{6}"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              className={`w-full px-5 py-3 bg-gray-50 border-2 text-sm ${apiErrors.billing_pincode ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all`}
                              placeholder="400001"
                            />
                            {apiErrors.billing_pincode && <p className="text-red-500 text-xs mt-1">{apiErrors.billing_pincode[0]}</p>}
                          </div>
                        </div>
                        {/* Ship to Different */}
                        {/* <label className="flex items-center gap-3 p-4 bg-violet-50 border-2 border-violet-100 rounded-xl cursor-pointer hover:border-violet-300 transition-all">
                    <input
                      type="checkbox"
                      checked={shipDifference}
                      onChange={(e) => setShipDifference(e.target.checked)}
                      className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500"
                    />
                    <span className="font-semibold text-violet-900">Ship to a different address?</span>
                  </label> */}

                        {/* Order Notes */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Order Notes (Optional)</label>
                          <textarea
                            name="notes"
                            rows="4"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 bg-gray-50 border-2 text-sm border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all resize-none"
                            placeholder="Notes about your order, e.g. special notes for delivery"
                          />
                        </div>

                        {/* Save Button for New Address */}
                        {isNewAddress && (
                          <div className="pt-4">
                            <button
                              type="button"
                              onClick={handleSaveNewAddress}
                              disabled={loadingAddresses}
                              className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                            >
                              {loadingAddresses ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Check size={18} />
                                  Save and Use this Address
                                </>
                              )}
                            </button>
                            <p className="text-center text-[10px] text-gray-400 font-bold uppercase mt-2.5 tracking-widest">
                              Your address will be saved securely to your profile
                            </p>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-5">
                {/* Order Summary */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-5 text-white">
                    <h4 className="font-bold text-lg">Order Summary</h4>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-2.5 max-h-56 overflow-y-auto custom-scrollbar pr-2">
                      {cartList.map((item) => (
                        <div key={item.id} className="group relative flex items-center gap-3 pb-2.5 border-b border-gray-100">
                          <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</h5>
                            <p className="text-[11px] text-gray-500">Qty: {item.qnty}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-bold text-gray-900 text-sm">₹{item.price * item.qnty}</span>
                            <button
                              onClick={() => {
                                dispatch(removeFromCartAsync(item.id));
                                toast.error("Item removed", { icon: "🗑️" });
                              }}
                              className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                              title="Remove item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupon Section */}
                    <div className="pt-3 border-t border-gray-100">
                      {!appliedCoupon ? (
                        !showCouponInput ? (
                          <button
                            onClick={() => setShowCouponInput(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-violet-300 rounded-xl text-violet-600 font-semibold text-sm hover:bg-violet-50 transition-all"
                          >
                            <Tag size={18} />
                            Have a Coupon Code?
                          </button>
                        ) : (
                          <div className="space-y-2.5">
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                  type="text"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                  placeholder="Enter code"
                                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all uppercase text-sm"
                                />
                              </div>
                              <button
                                onClick={handleApplyCoupon}
                                className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-sm rounded-xl hover:shadow-lg transition-all"
                              >
                                Apply
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-xs text-red-500 flex items-center gap-1"><X size={13} />{couponError}</p>
                            )}

                            {/* Available Coupons */}
                            <div className="bg-violet-50 p-3 rounded-xl border border-violet-100">
                              <p className="text-xs font-bold text-violet-900 mb-1.5">🎁 Available Coupons:</p>
                              <div className="space-y-1.5">
                                {availableCoupons.map((coupon) => (
                                  <div key={coupon.code} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg">
                                    <span className="font-mono font-bold text-violet-700">{coupon.code}</span>
                                    <span className="text-gray-600 font-medium">
                                      {coupon.type === "percentage" ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                <Check size={13} className="text-white" />
                              </div>
                              <span className="font-mono font-bold text-emerald-900 text-sm">{appliedCoupon.code}</span>
                            </div>
                            <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-700 transition-colors">
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-emerald-700">🎉 Coupon applied! You saved ₹{couponDiscount}</p>
                        </div>
                      )}
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2.5 pt-3 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cartList.length} items)</span>
                        <span className="font-bold text-gray-900">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 px-3 py-2.5 rounded-xl border border-emerald-100">
                        <span>Savings</span>
                        <span>- ₹{savings}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-violet-600 font-bold bg-violet-50 px-3 py-2.5 rounded-xl border border-violet-200">
                          <span>Coupon ({appliedCoupon.code})</span>
                          <span>- ₹{couponDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-bold text-emerald-600">FREE</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>GST (18%)</span>
                        <span className="font-bold text-gray-900">₹{tax}</span>
                      </div>
                    </div>

                    <hr className="border-dashed" />

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[11px] text-gray-500 font-semibold uppercase">Total Amount</p>
                        <p className="text-xs text-emerald-600 font-bold">You save ₹{savings + couponDiscount}</p>
                      </div>
                      <span className="text-2xl md:text-3xl font-black text-gray-900">₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                    <h4 className="font-bold text-base text-white flex items-center gap-2">
                      <CreditCard size={18} /> Payment Method
                    </h4>
                  </div>

                  <div className="p-4 space-y-2.5">
                    {paymentMethods.map((method) => (

                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === method.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-violet-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedPayment === method.id ? 'border-violet-500 bg-violet-500' : 'border-gray-300'
                          }`}>
                          {selectedPayment === method.id && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-xl">{method.emoji}</span>
                        <div className="flex-1">
                          <div className={`font-bold text-sm ${selectedPayment === method.id ? 'text-violet-700' : 'text-gray-900'}`}>
                            {method.label}
                          </div>
                          <div className="text-xs text-gray-500">{method.description}</div>
                        </div>
                      </label>
                    ))}

                    {/* Place Order Button */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="w-full mt-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Lock size={16} />
                          Place Order ₹{total}
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-3">
                      By placing order, you agree to our Terms & Conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #a78bfa; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #8b5cf6; }
      `}</style>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}