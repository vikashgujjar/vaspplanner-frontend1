"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CompleteProfileForm from "./CompleteProfileForm";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist, removeWish, fetchWishlistItems } from "../store/wishListSlice";
import { userService } from "../services/userService";
import ProductAyurvedCard from "./ProductAyurvedCard";
import Link from "next/link";
import EditProfileForm from "./EditProfileForm";
import { toast } from "react-toastify";
import { X, ExternalLink, AlertTriangle, RotateCcw, XCircle } from "lucide-react";
import {
  User,
  ShoppingBag,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Heart,
  Trash2,
  ChevronRight,
  Shield,
  Award,
  Coins,
  Star,
  MessageCircle,
  Headphones,
  ArrowRight,
  Edit3,
  Camera,
  Calendar,
  Gift,
  Sparkles,
  BadgeCheck,
  Settings,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export default function UserProfile() {
  const [currentTab, setCurrentTab] = useState("My Profile");
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wish.wishlist);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [completeProfileForm, setCompleteProfileForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isChecking, setIsChecking] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const router = useRouter();

  const fetchOrderDetails = async (uuid) => {
    if (!uuid) {
      toast.error("Order ID not found");
      return;
    }
    setIsActionLoading(true);
    try {
      const res = await userService.fetchOrderDetail(uuid);
      if (res.success && res.data) {
        setSelectedOrder(res.data);
        setIsDetailModalOpen(true);
      } else {
        toast.error(res.message || "Failed to fetch order details");
      }
    } catch (error) {
      console.error("Fetch detail error:", error);
      toast.error("Error fetching details");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please enter a reason for cancellation");
      return;
    }
    setIsActionLoading(true);
    try {
      const res = await userService.cancelOrder(selectedOrder.uuid, cancelReason);
      if (res.success) {
        toast.success(res.message || "Order cancelled successfully");
        setIsCancelModalOpen(false);
        setCancelReason("");
        
        // Optimistic UI update
        const updatedStatus = 'cancelled';
        setOrders(prev => prev.map(o => o.uuid === selectedOrder.uuid ? { ...o, order_status: updatedStatus } : o));
        setSelectedOrder(prev => prev ? { ...prev, order_status: updatedStatus } : null);
        
        // Refresh to get server-side truth
        userService.fetchOrders().then(ordersRes => {
          if (ordersRes.success) setOrders(ordersRes.data);
        });
      } else {
        toast.error(res.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("Error cancelling order");
    } finally {
      setIsActionLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status?.toLowerCase() === "delivered") return <CheckCircle size={16} className="text-emerald-600" />;
    if (status?.toLowerCase() === "pending") return <Clock size={16} className="text-amber-600" />;
    if (status?.toLowerCase() === "processing") return <RotateCcw size={16} className="text-indigo-600" />;
    if (status?.toLowerCase() === "out_for_delivery" || status?.toLowerCase() === "shipped") return <Truck size={16} className="text-blue-600" />;
    if (status?.toLowerCase() === "cancelled") return <XCircle size={16} className="text-rose-600" />;
    return <Package size={16} className="text-slate-600" />;
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s === "pending") return "bg-amber-50 text-amber-700 border-amber-200";
    if (s === "processing") return "bg-indigo-50 text-indigo-700 border-indigo-200";
    if (s === "out_for_delivery" || s === "shipped") return "bg-blue-50 text-blue-700 border-blue-200";
    if (s === "cancelled") return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/user/login");
    } else {
      const getProfileData = async () => {
        try {
          const [profileRes, ordersRes] = await Promise.all([
            userService.fetchProfile(),
            userService.fetchOrders()
          ]);
          dispatch(fetchWishlistItems());

          if (profileRes.success && profileRes.data) {
            setUserData(profileRes.data);
          }
          if (ordersRes.success && ordersRes.data) {
            setOrders(ordersRes.data);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setIsChecking(false);
        }
      };
      getProfileData();
    }
  }, [router, dispatch]);

  const profileComplete = true;

  // ==================== MY PROFILE TAB ====================
  const MyProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-bold text-2xl text-gray-900">User Information</h5>
          <p className="text-gray-500 text-sm">Manage your personal details</p>
        </div>
        <button
          onClick={() => setShowEditProfile(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-all"
        >
          <Edit3 size={16} />
          Update Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
          <h6 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <User size={16} className="text-violet-600" />
            </div>
            Personal Details
          </h6>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: userData?.name && !userData.name.startsWith("User_") ? userData.name : null, key: 'name' },
              { label: "Gender", value: userData?.gender && userData.gender !== "N/A" ? userData.gender : null, key: 'gender' },
              { label: "Date of Birth", value: userData?.dob && userData.dob !== "N/A" ? userData.dob : null, key: 'dob' },
              { label: "Role", value: userData?.role || "Member", key: 'role' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-violet-100 last:border-0">
                <span className="text-gray-500 text-sm">{item.label}</span>
                {item.value ? (
                  <span className="font-semibold text-gray-800">{item.value}</span>
                ) : (
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="text-xs font-bold text-violet-600 hover:text-violet-700 bg-violet-100 px-2 py-1 rounded"
                  >
                    + Add {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h6 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail size={16} className="text-blue-600" />
            </div>
            Contact Information
          </h6>
          <div className="space-y-4">
            {!userData?.email?.includes("@guest.giftkart.com") && userData?.email && (
              <div className="flex items-start justify-between py-2 border-b border-blue-100">
                <span className="text-gray-500 text-sm">Email</span>
                <div className="text-right">
                  <span className="font-semibold text-gray-800 block">{userData.email}</span>
                  <span className="text-xs text-emerald-600 flex items-center gap-1 justify-end mt-1">
                    <BadgeCheck size={12} /> Verified
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between py-2 border-b border-blue-100">
              <span className="text-gray-500 text-sm">Phone</span>
              <span className="font-semibold text-gray-800">{userData?.phone || "N/A"}</span>
            </div>
            <div className="flex items-start justify-between py-2">
              <span className="text-gray-500 text-sm">Address</span>
              <div className="text-right">
                {userData?.address ? (
                  <span className="font-semibold text-gray-800 text-xs md:text-sm max-w-[200px] block">
                    {`${userData.address.house_no || ''} ${userData.address.street_address || ''}, ${userData.address.landmark ? userData.address.landmark + ',' : ''} ${userData.address.city || ''}, ${userData.address.state || ''} - ${userData.address.pincode || ''}`}
                  </span>
                ) : (
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-100 px-2 py-1 rounded"
                  >
                    + Add Address
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: orders.length.toString(), label: "Total Orders", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50", iconBg: "bg-emerald-100" },
          { value: "₹" + orders.reduce((acc, order) => acc + parseFloat(order.total_amount || 0), 0).toLocaleString(), label: "Total Spent", icon: Coins, color: "text-blue-600", bg: "bg-blue-50", iconBg: "bg-blue-100" },
          { value: "0", label: "Coins Earned", icon: Award, color: "text-amber-600", bg: "bg-amber-50", iconBg: "bg-amber-100" },
          { value: wishList.length.toString(), label: "Wishlist Items", icon: Heart, color: "text-pink-600", bg: "bg-pink-50", iconBg: "bg-pink-100" },
        ].map((stat, index) => (
          <div key={index} className={`${stat.bg} rounded-2xl p-5 border border-white`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==================== MY ORDERS TAB ====================
  const MyOrders = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-bold text-2xl text-gray-900">My Orders</h5>
            <p className="text-gray-500 text-sm">Track and manage your orders</p>
          </div>
          <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600">
            {orders.length} Orders
          </span>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={order.uuid || order.id || index} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package size={28} className="text-gray-600" />
                    </div>
                    <div>
                      <h6 className="font-bold text-gray-900">{order.items?.[0]?.product_name || "Order #" + order.order_number}</h6>
                      <p className="text-sm text-gray-500 mt-1">Order ID: #{order.order_number}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar size={12} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="text-right flex-1 sm:flex-none">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusStyle(order.order_status || order.status)} mb-2`}>
                        {getStatusIcon(order.order_status || order.status)}
                        <span className="text-sm font-semibold capitalize">{order.order_status || order.status}</span>
                      </div>
                      <p className="text-xl font-black text-gray-900 block">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => fetchOrderDetails(order.uuid || order.id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-violet-50 text-violet-600 font-semibold rounded-xl hover:bg-violet-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Details
                      </button>
                      {['pending', 'confirmed', 'processing'].includes((order.order_status || order.status)?.toLowerCase()) && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsCancelModalOpen(true);
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-violet-50 rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/30">
              <ShoppingBag size={36} className="text-white" />
            </div>
            <h6 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h6>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start shopping to see your orders here!</p>
            <Link href="/category/all-products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all group">
              Start Shopping
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    );
  };

  // ==================== MY WISHLIST TAB ====================
  const MyWishlist = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-bold text-2xl text-gray-900">My Wishlist</h5>
          <p className="text-gray-500 text-sm">Items you've saved for later</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600">
            {wishList.length} Items
          </span>
          {wishList.length > 0 && (
            <button
              onClick={() => dispatch(clearWishlist())}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
      </div>

      {wishList.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-500/30">
            <Heart size={36} className="text-white" />
          </div>
          <h6 className="text-xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h6>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start adding items you love!</p>
          <Link href="/category/all-products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all group">
            Continue Shopping
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Heart, value: wishList.length, label: "Total Items", gradient: "from-pink-500 to-rose-500", bg: "from-pink-50 to-rose-50" },
              { icon: Coins, value: `₹${wishList.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}`, label: "Total Value", gradient: "from-emerald-500 to-teal-500", bg: "from-emerald-50 to-teal-50" },
              { icon: Star, value: 250, label: "Coins to Earn", gradient: "from-amber-500 to-orange-500", bg: "from-amber-50 to-orange-50" },
            ].map((stat, index) => (
              <div key={index} className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-5 border border-gray-100`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {wishList.map((product, idx) => (
              <ProductAyurvedCard key={product.id || idx} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );

  // ==================== HELP CENTER TAB ====================
  const HelpCenter = () => {
    const faqs = [
      { question: "How do I track my order?", answer: "You can track your order from the My Orders section in real-time." },
      { question: "What is your delivery policy?", answer: "Orders placed before 6 PM are eligible for same-day delivery in select cities." },
      { question: "How do I earn reward coins?", answer: "You earn coins on every purchase. 1 coin = ₹1 and can be redeemed on future orders." },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h5 className="font-bold text-2xl text-gray-900">Help Center</h5>
          <p className="text-gray-500 text-sm">Get support and find answers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Mail, title: "Email Support", desc: "support@vaspplanner.com", action: "Send Email", gradient: "from-violet-500 to-purple-600", bg: "from-violet-50 to-purple-50" },
            { icon: Phone, title: "Phone Support", desc: "+91 1800-123-4567", action: "Call Now", gradient: "from-blue-500 to-indigo-600", bg: "from-blue-50 to-indigo-50" },
            { icon: MessageCircle, title: "Live Chat", desc: "Available 24/7", action: "Start Chat", gradient: "from-emerald-500 to-teal-600", bg: "from-emerald-50 to-teal-50" },
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${item.bg} rounded-2xl p-6 border border-gray-100 text-center`}>
              <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <item.icon size={24} className="text-white" />
              </div>
              <h6 className="font-bold text-gray-900 mb-1">{item.title}</h6>
              <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
              <button className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                {item.action} →
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h6 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
            <HelpCircle size={20} className="text-violet-600" />
            Frequently Asked Questions
          </h6>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronRight size={18} className="text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="px-4 pb-4 text-sm text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==================== CHANGE PASSWORD TAB ====================
  const ChangePassword = () => {
    const [pwdData, setPwdData] = useState({
      current_password: "",
      new_password: "",
      new_password_confirmation: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
      current: false,
      new: false,
      confirm: false
    });

    const handlePwdChange = async (e) => {
      e.preventDefault();

      if (pwdData.new_password !== pwdData.new_password_confirmation) {
        toast.error("New password and confirm password do not match!");
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await userService.changePassword(pwdData);
        if (res.success) {
          toast.success(res.message || "Password changed successfully.");
          setPwdData({ current_password: "", new_password: "", new_password_confirmation: "" });
        } else {
          // Handle backend validation errors
          if (res.errors) {
            Object.values(res.errors).flat().forEach(err => toast.error(err));
          } else {
            toast.error(res.message || "Failed to change password.");
          }
        }
      } catch (error) {
        console.error("Change password error:", error);
        toast.error("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h5 className="font-bold text-2xl text-gray-900">Security Settings</h5>
          <p className="text-gray-500 text-sm">Update your password to keep your account secure</p>
        </div>
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 max-w-2xl shadow-sm">
          <form onSubmit={handlePwdChange} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  required
                  value={pwdData.current_password}
                  onChange={(e) => setPwdData({ ...pwdData, current_password: e.target.value })}
                  className="w-full px-4 pr-12 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  required
                  value={pwdData.new_password}
                  onChange={(e) => setPwdData({ ...pwdData, new_password: e.target.value })}
                  className="w-full px-4 pr-12 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  required
                  value={pwdData.new_password_confirmation}
                  onChange={(e) => setPwdData({ ...pwdData, new_password_confirmation: e.target.value })}
                  className="w-full px-4 pr-12 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all disabled:opacity-70"
            >
              {isSubmitting ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ==================== LOGOUT TAB ====================
  const LogOutTab = () => {
    const handleLogout = async () => {
      try {
        await userService.logout();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        toast.info("Logged out successfully");
        window.location.href = "/";
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h5 className="font-bold text-2xl text-gray-900">Logout</h5>
          <p className="text-gray-500 text-sm">End your current session</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-10 border border-red-100 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/30">
            <LogOut size={36} className="text-white" />
          </div>
          <h6 className="text-xl font-bold text-gray-900 mb-3">Are you sure you want to logout?</h6>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You will be redirected to the home page. You can log back in anytime to continue shopping.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentTab("My Profile")}
              className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProfileEmpty = () => (
    <div className="flex flex-col items-center text-center p-10 md:p-14 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
          <User size={56} className="text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <Star size={24} className="text-white" />
        </div>
      </div>
      <h6 className="font-bold text-3xl text-gray-900 mb-3">Complete Your Profile! ✨</h6>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Unlock exclusive benefits, personalized recommendations, and special member-only offers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
        {[{ emoji: "🎁", label: "Exclusive Offers" }, { emoji: "⚡", label: "Faster Checkout" }, { emoji: "💎", label: "Earn Rewards" }].map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-3xl mb-2">{item.emoji}</div>
            <h6 className="font-semibold text-gray-800">{item.label}</h6>
          </div>
        ))}
      </div>
      <button
        onClick={() => setCompleteProfileForm(true)}
        className="group flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1"
      >
        Complete Profile Now
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const tabs = [
    { tabName: "My Profile", tabVal: <MyProfile />, icon: User },
    { tabName: "My Orders", tabVal: <MyOrders />, icon: ShoppingBag },
    { tabName: "My Wishlist", tabVal: <MyWishlist />, icon: Heart },
    { tabName: "Change Password", tabVal: <ChangePassword />, icon: Lock },
    { tabName: "Help Center", tabVal: <HelpCenter />, icon: HelpCircle },
    { tabName: "Logout", tabVal: <LogOutTab />, icon: LogOut },
  ];

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa]">
        <section className="relative bg-[#0c0c0c] overflow-hidden">
          <div className="absolute inset-0 bg-[#0c0c0c]" />
          <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12 pt-12 pb-32">
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-700" />
              <span className="text-amber-400 font-medium">My Account</span>
            </nav>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img src={userData?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData?.name || "User") + "&background=random&color=fff"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {userData?.name && !userData.name.startsWith("User_") ? userData.name : "Welcome!"}
                  </h1>
                  <BadgeCheck size={24} className="text-violet-400" />
                </div>
                {!userData?.email?.includes("@guest.giftkart.com") && userData?.email && (
                   <p className="text-gray-400 flex items-center gap-2 mb-3"><Mail size={14} />{userData.email}</p>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 bg-violet-900/30 border border-violet-500/30 text-violet-300 text-xs font-semibold rounded-full">
                    ✨ {userData?.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : "Member"}
                  </span>
                  {userData?.created_at && (
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">
                      Member since {new Date(userData.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setShowEditProfile(true)} className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/5 transition-all">
                <Settings size={18} />Account Settings
              </button>
            </div>
          </div>
        </section>
        <section className="relative -mt-20 pb-16 z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            {!profileComplete ? <ProfileEmpty /> : (
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-72 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100 p-5">
                    <div className="space-y-2">
                      {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = currentTab === tab.tabName;
                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentTab(tab.tabName)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${isActive
                              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                              : "text-gray-600 hover:bg-gray-100"}`}
                          >
                            <Icon size={20} /><span className="font-semibold">{tab.tabName}</span>
                            {tab.tabName === "My Wishlist" && wishList.length > 0 && (
                              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-pink-100 text-pink-600"}`}>{wishList.length}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-1 p-6 md:p-8 lg:p-10">
                    {tabs.map((tab, index) => (
                      <div key={index} className={tab.tabName === currentTab ? "block" : "hidden"}>{tab.tabVal}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {completeProfileForm && <CompleteProfileForm setCompleteProfileForm={setCompleteProfileForm} />}
        {showEditProfile && (
          <EditProfileForm
            setShowEditProfile={setShowEditProfile}
            currentUserData={userData}
          />
        )}
        {/* Order Detail Modal */}
        {isDetailModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Order Details #{selectedOrder.order_number}</h3>
                <button onClick={() => setIsDetailModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {/* Order Status */}
                <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Status</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusStyle(selectedOrder.order_status || selectedOrder.status)}`}>
                      <span className="text-sm font-bold capitalize">{selectedOrder.order_status || selectedOrder.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date</p>
                    <p className="font-bold text-gray-900">{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Shipping Details */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <MapPin size={18} className="text-violet-600" />
                      Shipping Address
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-2xl text-sm text-gray-600 space-y-1">
                      <p className="font-bold text-gray-900">{selectedOrder.shipping_name}</p>
                      <p>{selectedOrder.shipping_phone}</p>
                      <p>{selectedOrder.shipping_address}</p>
                      <p>{selectedOrder.shipping_city}, {selectedOrder.shipping_state} - {selectedOrder.shipping_pincode}</p>
                      <p>{selectedOrder.shipping_country}</p>
                    </div>
                  </div>

                  {/* Payment Detail */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Shield size={18} className="text-violet-600" />
                      Payment Info
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-2xl text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="font-bold uppercase">{selectedOrder.payment_method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Status:</span>
                        <span className={`font-bold uppercase ${selectedOrder.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {selectedOrder.payment_status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Type:</span>
                        <span className="font-bold capitalize">{selectedOrder.delivery_type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Package size={18} className="text-violet-600" />
                    Order Items
                  </h4>
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-3 border border-gray-100 rounded-2xl">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 text-sm">{item.product_name}</h5>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{parseFloat(item.unit_price || item.price).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{parseFloat(item.total_price || (item.quantity * item.price)).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{parseFloat(selectedOrder.subtotal || selectedOrder.sub_total || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-semibold text-gray-900">₹{parseFloat(selectedOrder.tax_amount || 0).toLocaleString()}</span>
                  </div>
                  {selectedOrder.shipping_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-semibold text-gray-900">₹{parseFloat(selectedOrder.shipping_amount).toLocaleString()}</span>
                    </div>
                  )}
                  {selectedOrder.discount_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-red-600">-₹{parseFloat(selectedOrder.discount_amount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-violet-600 font-black text-lg">₹{parseFloat(selectedOrder.total_amount).toLocaleString()}</span>
                  </div>
                </div>

                {/* Status History / Logs */}
                {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Clock size={18} className="text-violet-600" />
                      Order Timeline
                    </h4>
                    <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-violet-100">
                      {selectedOrder.statusHistory.map((history, hIdx) => (
                        <div key={hIdx} className="relative">
                          <div className="absolute -left-[1.625rem] top-1 w-3 h-3 rounded-full bg-violet-500 border-2 border-white shadow-sm" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-gray-900 capitalize">{history.status}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{new Date(history.created_at).toLocaleString()}</span>
                            </div>
                            {history.comment && <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">{history.comment}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end">
                <div className="flex gap-3">
                  {['pending', 'confirmed', 'processing'].includes((selectedOrder.order_status || selectedOrder.status)?.toLowerCase()) && (
                    <button
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        setIsCancelModalOpen(true);
                      }}
                      className="px-6 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                      <XCircle size={18} />
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Order Modal */}
      {isCancelModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Cancel Order?</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to cancel order #{selectedOrder.order_number}? This action cannot be undone.</p>

              <div className="text-left mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-red-500 focus:bg-white transition-all h-24 resize-none"
                  placeholder="Tell us why you're cancelling..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  disabled={isActionLoading}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  Go Back
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={isActionLoading}
                  className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isActionLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Cancel Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}