"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Send,
  Upload,
  Sparkles,
  Clock,
  ArrowRight,
  MessageCircle,
  Headphones,
  Globe
} from "lucide-react";
import { userService } from "../services/userService";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [fileName, setFileName] = useState("");
  const [dynamicContact, setDynamicContact] = useState({
    email: "info@vaspplanner.com",
    phone: "+91 9448387231",
    address: "Bangalore, India",
    support_hours: "Mon - Sat: 9:00 AM - 8:00 PM"
  });

  useEffect(() => {
    async function loadContact() {
      try {
        const res = await userService.getContactInfo();
        if (res?.success && res?.data) {
          setDynamicContact(res.data);
        }
      } catch (err) {
        console.error("Failed to load contact info:", err);
      }
    }
    loadContact();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      lines: [dynamicContact.address || "Bangalore, India"],
      action: "Get Directions",
      link: "#",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-600"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      lines: [dynamicContact.email || "info@vaspplanner.com"],
      action: "Send Email",
      link: `mailto:${dynamicContact.email || "info@vaspplanner.com"}`,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      lines: [dynamicContact.phone || "+91 9448387231"],
      action: "Call Now",
      link: `tel:${dynamicContact.phone || "+91 9448387231"}`,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600"
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      lines: [dynamicContact.support_hours || "Mon - Sat: 9:00 AM - 8:00 PM"],
      action: "Support Hours",
      link: "#",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600"
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle size={28} />,
      title: "Live Chat",
      description: "Chat with our support team in real-time for instant help",
      action: "Start Chat",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Headphones size={28} />,
      title: "Phone Support",
      description: "Speak directly with our customer care representatives",
      action: "Call Now",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Globe size={28} />,
      title: "Help Center",
      description: "Browse FAQs and guides for self-service support",
      action: "Visit Help Center",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK */}
      {/* ============================================== */}
      <div className="relative overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/img/commonBanner/1.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0f0f0f]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10 py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                  Get in Touch
                </span>
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide uppercase">
                Contact{" "}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Us</span>
              </h1>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} className="text-amber-500" />
                <span className="text-amber-400">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* SECTION 2: CONTACT INFO CARDS - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-16 md:py-20 bg-gray-50">

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-4">
              <Sparkles size={16} className="text-pink-500" />
              <span className="text-pink-600 text-sm font-medium">Reach Out to Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in <span className="text-pink-600">Touch</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group ${info.bgColor} rounded-2xl p-6 border ${info.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className={`relative w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Action Link */}
                <Link
                  href={info.link}
                  className={`inline-flex items-center gap-2 ${info.textColor} text-sm font-semibold hover:gap-3 transition-all`}
                >
                  {info.action}
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: CONTACT FORM - DARK */}
      {/* ============================================== */}
      <section className="relative py-16 md:py-24 bg-[#0f0f0f] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Decorative Blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              <Sparkles className="text-amber-400" size={20} />
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Have a{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Question?</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Send us a message and we'll respond as soon as possible. We're here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 border border-white/[0.08]">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400">Your Message</label>
                    <textarea
                      placeholder="Write your message here..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400">Attachment (Optional)</label>
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-3 px-5 py-4 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
                    >
                      <Upload size={20} className="text-gray-500 group-hover:text-amber-400 transition-colors" />
                      <div className="text-center">
                        {fileName ? (
                          <span className="text-amber-400 text-sm font-medium">{fileName}</span>
                        ) : (
                          <>
                            <span className="text-gray-500 text-sm">
                              <span className="text-amber-400 font-medium">Click to upload</span> or drag and drop
                            </span>
                            <p className="text-xs text-gray-600 mt-1">PDF, DOCX, PNG, JPG (max 5MB)</p>
                          </>
                        )}
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-amber-500/20">
                <h3 className="text-lg font-bold mb-3 uppercase tracking-wide">Quick Response</h3>
                <p className="text-amber-100 text-sm mb-6">
                  We typically respond within 24 hours. For urgent inquiries, please call us directly.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-amber-200">Call us now</p>
                    <a href="tel:+919448387231" className="text-lg font-bold hover:text-amber-100 transition-colors">
                      +91 9448387231
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Follow Us</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Stay connected with us on social media for updates and offers.
                </p>
                <div className="flex items-center gap-3">
                  {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all"
                    >
                      <SocialIcon name={social} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Business Hours</h3>
                <ul className="space-y-3">
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 8:00 PM", color: "text-emerald-400" },
                    { day: "Saturday", time: "10:00 AM - 6:00 PM", color: "text-blue-400" },
                    { day: "Sunday", time: "Closed", color: "text-red-400" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-400 text-sm">{item.day}</span>
                      <span className={`text-sm font-semibold ${item.color}`}>
                        {item.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 4: SUPPORT OPTIONS - LIGHT */}
      {/* ============================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
              <Headphones size={16} className="text-green-600" />
              <span className="text-green-700 text-sm font-medium">Multiple Ways to Reach Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need <span className="text-green-600">Support?</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose the best way to get in touch with our team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group text-center"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{option.description}</p>
                <button className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${option.color} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}>
                  {option.action}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 5: MAP SECTION - DARK */}
      {/* ============================================== */}
      <section className="relative bg-[#0f0f0f]">

        {/* Map */}
        <div className="h-[300px] md:h-[400px] lg:h-[500px] relative">
          <div className="absolute inset-0 bg-[#0f0f0f]/30 z-[1] pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.209006059291!2d77.64270267507622!3d12.958473687355697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1405814daf83%3A0xcd86b42b2a8e8a68!2s44%2C%20KGA%20Rd%2C%20ISRO%20Colony%2C%20Kodihalli%2C%20Bengaluru%2C%20Karnataka%20560008!5e0!3m2!1sen!2sin!4v1741583222912!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0%) invert(0%) contrast(100%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          />
        </div>
      </section>
    </div>
  );
}

// Social Icons Component
const SocialIcon = ({ name }) => {
  const icons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  };
  return icons[name] || null;
};