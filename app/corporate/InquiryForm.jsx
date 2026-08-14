"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    occasion: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Our team will contact you within 24 hours.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Your Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
            placeholder="email@company.com"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Quantity</label>
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all appearance-none"
          >
            <option value="">Select Range</option>
            <option value="25-50">25 - 50 units</option>
            <option value="50-100">50 - 100 units</option>
            <option value="100-250">100 - 250 units</option>
            <option value="250-500">250 - 500 units</option>
            <option value="500+">500+ units</option>
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Occasion</label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all appearance-none"
          >
            <option value="">Select Occasion</option>
            <option value="diwali">Diwali</option>
            <option value="new-year">New Year</option>
            <option value="anniversary">Company Anniversary</option>
            <option value="appreciation">Employee Appreciation</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Message (Optional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all resize-none"
          placeholder="Tell us your requirements..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5 group"
      >
        Submit Inquiry
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
