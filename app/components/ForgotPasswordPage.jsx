"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Star,
  Leaf,
  ArrowLeft
} from "lucide-react";
import { toast } from "react-toastify";
import { parseServerErrors, FieldError } from "../utils/serverValidation";
 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Password reset link sent to your email!");
        setEmail("");
        setTimeout(() => {
          router.push("/user/login");
        }, 5000);
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Request failed");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again later.");
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
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Leaf size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">VASP Planner</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Restore Your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Access
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Don't worry, it happens. Enter your email address and we'll send you instructions to reset your password.
            </p>

            {/* Features (keeping it for consistency) */}
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
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Leaf size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">VASP Planner</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10 animate-in fade-in zoom-in-95 duration-700">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full mb-4">
                <Shield size={14} className="text-violet-500" />
                <span className="text-violet-600 text-sm font-semibold">
                  Password Recovery
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-500">
                Enter your email to receive a reset link
              </p>
            </div>

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                {apiErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{apiErrors.email[0]}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all disabled:opacity-70 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Reset Link <ArrowRight size={18} className="group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="text-center">
                <Link 
                  href="/user/login" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-violet-600 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            If you need further help, please contact our{" "}
            <Link href="/contact-us" className="text-violet-500 hover:underline">Support Team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
