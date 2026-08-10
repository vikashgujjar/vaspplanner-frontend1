"use client";
import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Sparkles,
  Gift,
  Coins,
  Truck,
  Leaf,
  Star,
  BadgeCheck,
  Phone
} from "lucide-react";
import { toast } from "react-toastify";
 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear API error when user types
    if (apiErrors[name]) {
      setApiErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErrors({});
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!agreeToTerms) {
      toast.warning("Please agree to the Terms and Conditions!");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        cache: 'no-store',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          password_confirmation: form.confirmPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Registration successful!");
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        localStorage.setItem("cartNeedsSync", "true");
        localStorage.setItem("wishlistNeedsSync", "true");
        setTimeout(() => {
          window.location.href = "/user/login";
        }, 2000);
      } else {
        if (result.errors) {
          setApiErrors(result.errors);
          // Show first error in toast as well for visibility
          const firstError = Object.values(result.errors).flat()[0];
          toast.error(firstError || "Validation failed");
        } else {
          toast.error(result.message || "Registration failed");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const getPasswordStrengthTextColor = () => {
    if (passwordStrength <= 1) return "text-red-500";
    if (passwordStrength === 2) return "text-orange-500";
    if (passwordStrength === 3) return "text-amber-500";
    return "text-emerald-500";
  };

  return (
    <div className="min-h-screen flex">
      {/* ==================== LEFT SIDE - DARK SECTION ==================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0c0c0c] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 border border-white/5 rounded-full" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute -top-32 -right-32 w-96 h-96 border border-white/5 rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16">
          <div className="max-w-md">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Leaf size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">VASP Planner</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Start Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Wellness Journey
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Join thousands of happy customers. Create your account and unlock exclusive member benefits.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {[
                { icon: Gift, title: "Welcome Gift", desc: "Get 10% off on your first order", gradient: "from-pink-500 to-rose-500" },
                { icon: Coins, title: "Earn Reward Points", desc: "Collect coins on every purchase", gradient: "from-amber-500 to-orange-500" },
                { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999", gradient: "from-emerald-500 to-teal-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "10K+", label: "Customers" },
                  { value: "500+", label: "Products" },
                  { value: "4.9", label: "Rating" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT SIDE - LIGHT SECTION ==================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#f8f9fa] overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Leaf size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">VASP Planner</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-4">
                <Sparkles size={14} className="text-emerald-500" />
                <span className="text-emerald-600 text-sm font-semibold">Join Us Today</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-500">Start your wellness journey with us</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${apiErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                    placeholder="John Doe"
                  />
                </div>
                {apiErrors.name && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{apiErrors.name[0]}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${apiErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                    placeholder="you@example.com"
                  />
                </div>
                {apiErrors.email && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{apiErrors.email[0]}</p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${apiErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                    placeholder="9876543210"
                  />
                </div>
                {apiErrors.phone && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{apiErrors.phone[0]}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${apiErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"
                              }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-semibold min-w-[50px] ${getPasswordStrengthTextColor()}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Use 8+ characters with uppercase, lowercase, numbers & symbols
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-emerald-500"
                      }`}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    Passwords do not match
                  </p>
                )}
                {form.confirmPassword && form.password === form.confirmPassword && form.confirmPassword.length > 0 && (
                  <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                    <BadgeCheck size={14} />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="sr-only peer"
                      required
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all group-hover:border-emerald-400" />
                    <Check
                      size={14}
                      className="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="ml-3 text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-8">
              Already have an account?{" "}
              <Link href="/user/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Secure sign-up with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}