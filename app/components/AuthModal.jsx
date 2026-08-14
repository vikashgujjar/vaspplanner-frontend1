import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Lock, Eye, EyeOff, User, Phone, Check, ArrowRight, X } from "lucide-react";
import { toast } from "react-toastify";
import { executePendingCartAction } from "../utils/pendingCart";
import { parseServerErrors, FieldError } from "../utils/serverValidation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Form states
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setApiErrors({});
    if (!phone || phone.length < 10) {
      setApiErrors({ phone: "Please enter a valid 10-digit phone number" });
      toast.warning("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      const result = await response.json();
      if (result.success) {
        setOtpSent(true);
        toast.success(result.message || "OTP sent successfully!");
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setApiErrors({});
    if (!otp || otp.length < 4) {
      setApiErrors({ otp: "Please enter a valid OTP" });
      toast.warning("Please enter a valid OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Login successful!");
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        localStorage.setItem("cartNeedsSync", "true");
        localStorage.setItem("wishlistNeedsSync", "true");
        window.dispatchEvent(new Event("auth-change"));
        
        const handled = await executePendingCartAction(dispatch, router);
        onSuccess?.();
        if (handled && onClose) {
          onClose();
        }
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Verification failed");
      }
    } catch (error) {
      toast.error("An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiErrors({});
    if (password !== confirmPassword) {
      setApiErrors({ password_confirmation: "Passwords do not match!" });
      toast.error("Passwords do not match!");
      return;
    }
    if (!agreeToTerms) {
      toast.warning("Please agree to the Terms and Conditions!");
      return;
    }
    setIsLoading(true);

    try {
      const guestEmail = `${phone}@guest.giftkart.com`;
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email: guestEmail,
          phone,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Registration successful!");
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        localStorage.setItem("cartNeedsSync", "true");
        localStorage.setItem("wishlistNeedsSync", "true");
        window.dispatchEvent(new Event("auth-change"));
        
        const handled = await executePendingCartAction(dispatch, router);
        onSuccess?.();
        if (handled && onClose) {
          onClose();
        }
      } else {
        const { fieldErrors, summaryMessage } = parseServerErrors(result);
        setApiErrors(fieldErrors);
        toast.error(summaryMessage || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-[32px] w-full max-w-md shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-100/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/50 to-transparent pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-10 pb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {activeTab === "login" ? "Secure Login" : "Join Community"}
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              {activeTab === "login" 
                ? "Enter your mobile number to receive an access code"
                : "Create an account with your mobile number"
              }
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100/80 p-1.5 rounded-2xl mb-8">
            <button
              onClick={() => { setActiveTab("login"); setOtpSent(false); }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === "login" ? "bg-white text-violet-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === "register" ? "bg-white text-violet-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          {activeTab === "login" ? (
            <div className="space-y-6">
              <form onSubmit={otpSent ? handleVerifyOtp : (e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Mobile Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={otpSent || isLoading}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white outline-none text-sm transition-all font-medium disabled:opacity-60 ${(apiErrors.phone || apiErrors.mobile) ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-violet-500'}`}
                      placeholder="9876543210"
                    />
                    {otpSent && !isLoading && (
                      <button 
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-violet-600 hover:underline"
                      >
                        Change
                      </button>
                    )}
                  </div>
                  <FieldError error={apiErrors.phone || apiErrors.mobile} />
                </div>

                {otpSent && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Verification Code</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                      <input
                        type="text"
                        value={otp}
                        maxLength={6}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white outline-none text-sm transition-all font-bold tracking-[0.5em] ${apiErrors.otp ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-violet-500'}`}
                        placeholder="------"
                      />
                    </div>
                    <FieldError error={apiErrors.otp} />
                    <p className="mt-2 text-[10px] text-gray-500 font-medium text-center">
                      We've sent a code to your phone.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                  disabled={isLoading}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {otpSent ? "Verify & Continue" : "Send Access Code"}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="md:max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 -mr-2">
              <form onSubmit={handleRegister} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none text-sm transition-all font-medium"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Mobile Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none text-sm transition-all font-medium"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Set Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none text-sm transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none text-sm transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start cursor-pointer mt-4 group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="sr-only peer"
                      required
                    />
                    <div className="w-5 h-5 border-2 border-gray-200 rounded-lg group-hover:border-violet-400 peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-all duration-300 shadow-sm" />
                    <Check
                      size={14}
                      className="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      strokeWidth={4}
                    />
                  </div>
                  <span className="ml-3 text-[11px] text-gray-500 font-medium leading-tight">
                    I agree to the <span className="text-violet-600 font-bold hover:underline">Terms</span> and <span className="text-violet-600 font-bold hover:underline">Privacy Policy</span>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}

