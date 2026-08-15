import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCamera,
  FiHome,
  FiMap
} from "react-icons/fi";

export default function CompleteProfileForm({ setCompleteProfileForm }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    houseNo: "",
    landmark: "",
    gender: "",
    country: "",
    state: "",
    pincode: "",
    profileImage: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setCompleteProfileForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#C82C6B] to-[#8c1d49] p-6 flex items-center justify-between">
          <div>
            <h5 className="text-2xl lg:text-3xl font-bold text-white">
              Complete Your Profile
            </h5>
            <p className="text-green-50 text-sm mt-1">
              Just a few more details to personalize your experience
            </p>
          </div>
          <button
            onClick={() => setCompleteProfileForm(false)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <IoCloseSharp className="text-2xl text-white" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-6 md:p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {formData.profileImage ? (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-5xl text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gradient-to-r from-[#C82C6B] to-[#8c1d49] text-white p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
                  <FiCamera className="text-lg" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Upload a high-quality photo (JPG, PNG)
                </p>
                <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h6 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiUser className="text-green-600" />
                </div>
                Personal Information
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    placeholder="Enter your first name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastName"
                    placeholder="Enter your last name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300 bg-white"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Prefer not to say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="dateOfBirth"
                      type="date"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h6 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiPhone className="text-blue-600" />
                </div>
                Contact Information
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phoneNumber"
                    placeholder="+91 98765 43210"
                    type="tel"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="pincode"
                    placeholder="Enter pincode"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h6 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiMapPin className="text-purple-600" />
                </div>
                Address Details
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* House No */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    House/Flat No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="houseNo"
                    placeholder="e.g., 123, Block A"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.houseNo}
                    onChange={handleChange}
                  />
                </div>

                {/* Landmark */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Landmark
                  </label>
                  <input
                    name="landmark"
                    placeholder="e.g., Near City Mall"
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </div>

                {/* Street Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="address"
                    placeholder="Enter your complete street address"
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300 bg-white"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300 bg-white"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setCompleteProfileForm(false)}
                className="flex-1 px-6 py-3.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#C82C6B] to-[#8c1d49] text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}