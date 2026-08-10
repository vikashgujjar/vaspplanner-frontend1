"use client";
import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, FileText, Send, Paperclip } from "lucide-react";
import { toast } from "react-toastify";

export default function ApplyFormModal({ isOpen, onClose, jobTitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("job_title", jobTitle);
    data.append("message", formData.message);
    if (formData.resume) {
      data.append("resume", formData.resume);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/career/apply`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || `Application for ${jobTitle} submitted successfully!`);
        onClose();
        setFormData({ name: "", email: "", phone: "", resume: null, message: "" });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Career Application Error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Apply <span className="text-pink-600">Now</span>
            </h2>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
              Position: <span className="text-amber-600">{jobTitle || "Spontaneous Application"}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-pink-600 hover:border-pink-100 shadow-sm transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <form id="apply-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-600 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none text-sm transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-600 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Resume (PDF/Doc)</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-600 transition-colors pointer-events-none">
                    <Paperclip size={18} />
                  </div>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none text-xs file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Message / Cover Letter</label>
              <div className="relative group">
                <div className="absolute left-4 top-5 text-gray-400 group-focus-within:text-pink-600 transition-colors">
                  <FileText size={18} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us why you are a great fit..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none text-sm transition-all resize-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-4 bg-white text-gray-600 font-black uppercase text-xs tracking-widest rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            form="apply-form"
            type="submit"
            disabled={isLoading}
            className="flex-[2] px-8 py-4 bg-[#0f0f0f] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-pink-600 shadow-xl shadow-pink-600/10 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Submit Application <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
