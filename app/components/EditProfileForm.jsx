"use client";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave } from "react-icons/fi";
import { BadgeCheck, Check, MapPin, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { userService } from "../services/userService";
import { useEffect } from "react";
import { locationService } from "../services/locationService";

export default function EditProfileForm({ setShowEditProfile, currentUserData }) {
    const [formData, setFormData] = useState({
        firstName: currentUserData?.first_name || currentUserData?.name?.split(" ")[0] || "",
        lastName: currentUserData?.last_name || currentUserData?.name?.split(" ").slice(1).join(" ") || "",
        email: currentUserData?.email || "",
        phone: currentUserData?.phone || "",
        dob: currentUserData?.dob || "",
        gender: currentUserData?.gender || "Male",
        role: currentUserData?.role || "Customer",
        house_no: currentUserData?.address?.house_no || "",
        street_address: currentUserData?.address?.street_address || "",
        landmark: currentUserData?.address?.landmark || "",
        country: currentUserData?.address?.country || "India",
        countryId: "",
        state: currentUserData?.address?.state || "",
        stateId: "",
        city: currentUserData?.address?.city || "",
        cityId: "",
        pincode: currentUserData?.address?.pincode || "",
        latitude: "",
        longitude: "",
        anniversary: currentUserData?.address?.anniversary || "",
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState({ countries: false, states: false, cities: false });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(currentUserData?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUserData?.name || "User"));
    const [avatarFile, setAvatarFile] = useState(null);
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const [mapCoords, setMapCoords] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fetch Countries on Mount
    useEffect(() => {
        const fetchCountries = async () => {
            setLoadingLocations(prev => ({ ...prev, countries: true }));
            try {
                const res = await locationService.getCountries();
                if (res.success) {
                    setCountries(res.data);
                    // Match initial country name to get ID
                    const initialCountry = res.data.find(c =>
                        c.name.toLowerCase() === formData.country.toLowerCase()
                    );
                    if (initialCountry) {
                        setFormData(prev => ({ ...prev, countryId: initialCountry.id }));
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
                    // Match initial state name to get ID
                    const initialState = res.data.find(s =>
                        s.name.toLowerCase() === formData.state.toLowerCase()
                    );
                    if (initialState) {
                        setFormData(prev => ({ ...prev, stateId: initialState.id }));
                    }
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
                    // Match initial city name to get ID
                    const initialCity = res.data.find(c =>
                        c.name.toLowerCase() === formData.city.toLowerCase()
                    );
                    if (initialCity) {
                        setFormData(prev => ({ ...prev, cityId: initialCity.id }));
                    }
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

                        console.log("Profile Auto-Location Data:", { city: detectedCity, district: detectedStateDistrict, zip: detectedPincode });

                        setMapCoords({ lat: latitude, lon: longitude });

                        const countryMatch = countries.find(c =>
                            c.name.toLowerCase() === detectedCountry.toLowerCase()
                        );

                        setFormData(prev => ({
                            ...prev,
                            house_no: detectedHouse || prev.house_no,
                            street_address: detectedStreet || prev.street_address,
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

                        toast.success("Location detected successfully!");
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
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
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

    // Auto-detect location on load once countries are ready
    useEffect(() => {
        if (countries.length > 0 && !formData.stateId) {
            handleAutoLocation();
        }
    }, [countries.length]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataPayload = new FormData();
        formDataPayload.append('first_name', formData.firstName);
        formDataPayload.append('last_name', formData.lastName);
        formDataPayload.append('phone', formData.phone);
        formDataPayload.append('gender', formData.gender);
        formDataPayload.append('dob', formData.dob);
        formDataPayload.append('house_no', formData.house_no);
        formDataPayload.append('street_address', formData.street_address);
        formDataPayload.append('landmark', formData.landmark);
        formDataPayload.append('city', formData.city);
        formDataPayload.append('state', formData.state);
        formDataPayload.append('country', formData.country);
        formDataPayload.append('pincode', formData.pincode);
        formDataPayload.append('latitude', formData.latitude);
        formDataPayload.append('longitude', formData.longitude);
        formDataPayload.append('anniversary', formData.anniversary);

        if (avatarFile) {
            formDataPayload.append('avatar', avatarFile);
        }

        try {
            const res = await userService.updateProfile(formDataPayload);
            if (res.success) {
                toast.success(res.message || "Profile updated successfully!");
                const existingData = JSON.parse(localStorage.getItem("userData") || "{}");
                localStorage.setItem("userData", JSON.stringify({ ...existingData, ...res.data }));
                setTimeout(() => {
                    setShowEditProfile(false);
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(res.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error("An error occurred while updating profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 flex items-center justify-between">
                    <div>
                        <h5 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
                            Account Settings
                        </h5>
                        <p className="text-white/80 text-sm mt-1">
                            Update your personal information and address
                        </p>
                    </div>
                    <button
                        onClick={() => setShowEditProfile(false)}
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
                                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-violet-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
                                    <img
                                        src={previewImage}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white p-3 rounded-2xl cursor-pointer shadow-lg hover:shadow-violet-500/50 transition-all transform hover:scale-110">
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
                                <p className="text-sm font-bold text-gray-700">Profile Picture</p>
                                <p className="text-xs text-gray-400 mt-1">JPG or PNG allowable (Max 2MB)</p>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div>
                            <h6 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                                    <FiUser className="text-violet-600" />
                                </div>
                                Personal Information
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
                                    <select
                                        name="gender"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                                    <input
                                        name="dob"
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Anniversary Date (Optional)</label>
                                    <input
                                        name="anniversary"
                                        type="date"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.anniversary}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Account Details */}
                        <div>
                            <h6 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FiMail className="text-blue-600" />
                                </div>
                                Contact & Account Details
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {!formData.email?.includes("@guest.giftkart.com") && (
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 flex items-center justify-between">
                                            Email Address (Read Only)
                                            <span className="flex items-center gap-1 text-emerald-600 text-[10px] uppercase font-bold tracking-wider">
                                                <BadgeCheck size={12} /> Verified
                                            </span>
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            disabled
                                            className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-xl text-gray-400 cursor-not-allowed"
                                            value={formData.email}
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Account Role (Read Only)</label>
                                    <input
                                        name="role"
                                        type="text"
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-xl text-gray-400 cursor-not-allowed capitalize"
                                        value={formData.role}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div>
                            <h6 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                    <FiMapPin className="text-pink-600" />
                                </div>
                                Delivery Address
                            </h6>

                            {/* Map & Auto-detection HUD */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                        {isDetectingLocation ? (
                                            <div className="w-3 h-3 border-2 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
                                        ) : (
                                            <Check size={12} />
                                        )}
                                        {isDetectingLocation ? "Detecting Address..." : "Location Detected"}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAutoLocation}
                                        className="text-[10px] font-black uppercase text-violet-600 hover:text-violet-700 flex items-center gap-1.5"
                                    >
                                        <Sparkles size={12} /> Re-detect
                                    </button>
                                </div>

                                {mapCoords && (
                                    <div className="mb-6 rounded-2xl overflow-hidden border-2 border-gray-100 h-40 relative shadow-inner animate-in fade-in slide-in-from-top-4 duration-700">
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
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">House No. <span className="text-red-500">*</span></label>
                                    <input
                                        name="house_no"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.house_no}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Landmark</label>
                                    <input
                                        name="landmark"
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address <span className="text-red-500">*</span></label>
                                    <input
                                        name="street_address"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.street_address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                                    <select
                                        name="country"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm disabled:opacity-50"
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
                                        disabled={loadingLocations.countries}
                                    >
                                        <option value="">{loadingLocations.countries ? "Loading Countries..." : "Select Country"}</option>
                                        {countries.map(country => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">State <span className="text-red-500">*</span></label>
                                    <select
                                        name="state"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm disabled:opacity-50"
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
                                        disabled={loadingLocations.states || !formData.countryId}
                                    >
                                        <option value="">{loadingLocations.states ? "Loading States..." : "Select State"}</option>
                                        {states.map(state => (
                                            <option key={state.id} value={state.id}>{state.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                                    <select
                                        name="city"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm disabled:opacity-50"
                                        value={formData.cityId}
                                        onChange={(e) => {
                                            const id = e.target.value;
                                            const name = cities.find(c => c.id == id)?.name || "";
                                            setFormData(prev => ({ ...prev, cityId: id, city: name }));
                                        }}
                                        disabled={loadingLocations.cities || !formData.stateId}
                                    >
                                        <option value="">{loadingLocations.cities ? "Loading Cities..." : "Select City"}</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pincode <span className="text-red-500">*</span></label>
                                    <input
                                        name="pincode"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setShowEditProfile(false)}
                                className="flex-1 px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave className="text-lg" />
                                        Update Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}