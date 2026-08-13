"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { executePendingCartAction } from "../utils/pendingCart";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  Truck,
  Gift,
  Leaf,
  Star
} from "lucide-react";
import { toast } from "react-toastify";
import { parseServerErrors, FieldError } from "../utils/serverValidation";
 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      router.replace("/user/profile");
    }
  }, [router]);

  const handlePostLoginCartSync = async () => {
    window.dispatchEvent(new Event("auth-change"));
    const handled = await executePendingCartAction(dispatch, router);
    if (!handled) {
      router.replace("/user/profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Login successful!");
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        localStorage.setItem("cartNeedsSync", "true");
        localStorage.setItem("wishlistNeedsSync", "true");

        await handlePostLoginCartSync();
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setApiErrors({});
    if (phone.length < 10) {
      setApiErrors({ phone: "Please enter a valid 10-digit phone number" });
      toast.error("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message || "OTP sent successfully!");
        setOtpSent(true);
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setApiErrors({});
    if (!otp) {
      setApiErrors({ otp: "Please enter the OTP" });
      toast.error("Please enter the OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message || "Login successful!");
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        localStorage.setItem("cartNeedsSync", "true");
        localStorage.setItem("wishlistNeedsSync", "true");
        
        await handlePostLoginCartSync();
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ==================== LEFT SIDE - DARK SECTION ==================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0c0c0c] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-white/5 rounded-full" />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute -top-32 -left-32 w-96 h-96 border border-white/5 rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16">
          <div className="max-w-md">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-10">
               <img src="/img/Ayutramartlogo.webp" alt="VASP Planner Logo" className="h-[70px] brightness-0 invert" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome Back to{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Wellness
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Sign in to access your personalized Ayurvedic wellness journey. Discover natural products trusted by thousands.
            </p>

            {/* Features */}
            <div className="space-y-5">
              {[
                { icon: Sparkles, title: "100% Natural Products", desc: "Pure Ayurvedic ingredients" },
                { icon: Shield, title: "Trusted by Thousands", desc: "10K+ happy customers" },
                { icon: Truck, title: "Fast & Secure Delivery", desc: "Free shipping on ₹999+" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-all">
                    <item.icon size={20} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-white font-semibold ml-2">4.9</span>
                </div>
                <div className="text-gray-500 text-sm">
                  Based on <span className="text-white">5,000+</span> reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT SIDE - LIGHT SECTION ==================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#f8f9fa]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center gap-3 mb-4">
               <img src="/img/Ayutramartlogo.webp" alt="VASP Planner Logo" className="h-[60px]" />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full mb-4">
                <Sparkles size={14} className="text-violet-500" />
                <span className="text-violet-600 text-sm font-semibold">
                   Fast Access
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                 Secure Login
              </h2>
              <p className="text-gray-500">
                Login with your mobile number to explore premium wellness
              </p>
            </div>

            {/* OTP Login Form */}
            <div className="space-y-5">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-5 transition-all animate-in slide-in-from-right-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">+91</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          required
                          className={`w-full pl-14 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${(apiErrors.phone || apiErrors.mobile) ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-violet-500'}`}
                          placeholder="9876543210"
                        />
                      </div>
                      <FieldError error={apiErrors.phone || apiErrors.mobile} />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || phone.length < 10}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all disabled:opacity-70 group"
                    >
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send OTP <ArrowRight size={18} className="group-hover:translate-x-1" /></>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5 transition-all animate-in slide-in-from-right-4">
                    <div className="text-center p-4 bg-violet-50 rounded-2xl mb-4">
                      <p className="text-sm text-gray-600">OTP sent to <span className="font-bold">+91 {phone}</span></p>
                      <button onClick={() => setOtpSent(false)} className="text-xs text-violet-600 font-bold mt-1 underline">Change Number</button>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Enter 4-6 Digit OTP</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        required
                        autoFocus
                        className={`w-full text-center text-3xl tracking-[1em] font-black py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:bg-white transition-all ${apiErrors.otp ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-violet-500'}`}
                        placeholder="••••••"
                      />
                      <FieldError error={apiErrors.otp} className="justify-center" />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || otp.length < 4}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all disabled:opacity-70"
                    >
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Login"}
                    </button>
                    <p className="text-center text-sm text-gray-500">
                      Didn't receive code? <button type="button" onClick={handleSendOtp} className="text-violet-600 font-bold ml-1">Resend</button>
                    </p>
                  </form>
                )}
              </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{" "}
              <Link href="/user/sign-up" className="font-bold text-violet-600 hover:text-violet-700 transition-colors">Sign up for free</Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-violet-500 hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-violet-500 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}