const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getSessionId = () => {
    if (typeof window === 'undefined') return null;
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

const getHeader = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    const sessionId = typeof window !== 'undefined' ? getSessionId() : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(sessionId ? { 'X-Session-Id': sessionId } : {})
    };
};

export const userService = {
    // Cart APIs
    fetchCart: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                cache: 'no-store',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
            return { success: false };
        }
    },

    addToCart: async (productId, quantity = 1, variantId = null) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ product_id: productId, quantity, variant_id: variantId })
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false };
        }
    },

    updateCart: async (productId, quantity) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/update`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ product_id: productId, quantity })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating cart:', error);
            return { success: false };
        }
    },

    removeFromCart: async (productId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/remove`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ product_id: productId })
            });
            return await response.json();
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false };
        }
    },

    // Wishlist APIs
    fetchWishlist: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                cache: 'no-store',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            return { success: false };
        }
    },

    addToWishlist: async (productId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ product_id: productId })
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return { success: false };
        }
    },

    removeFromWishlist: async (productId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
                method: 'DELETE',
                headers: getHeader()
            });
            const data = await response.json();
            if (data.success) return data;
            
            // Fallback to POST /wishlist/remove if DELETE endpoint is handled differently
            const altResponse = await fetch(`${API_BASE_URL}/wishlist/remove`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ product_id: productId })
            });
            return await altResponse.json();
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return { success: false };
        }
    },

    clearWishlist: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/all-wishlist`, {
                method: 'DELETE',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            return { success: false };
        }
    },

    getFaqs: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/faqs`, {
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            return { success: false };
        }
    },

    getContactInfo: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact-info`, {
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching contact info:', error);
            return { success: false };
        }
    },

    // Auth APIs
    fetchProfile: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                cache: 'no-store',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching profile:', error);
            return { success: false };
        }
    },

    updateProfile: async (formDataPayload) => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
            const sessionId = typeof window !== 'undefined' ? getSessionId() : null;
            const headers = {
                'Accept': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...(sessionId ? { 'X-Session-Id': sessionId } : {})
            };
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'POST',
                headers,
                body: formDataPayload
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, message: 'Network error while updating profile' };
        }
    },

    changePassword: async (pwdData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({
                    current_password: pwdData.current_password,
                    new_password: pwdData.new_password,
                    new_password_confirmation: pwdData.new_password_confirmation
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error changing password:', error);
            return { success: false, message: 'Network error while changing password' };
        }
    },

    sendOtp: async (phone) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ phone })
            });
            return await response.json();
        } catch (error) {
            console.error('Error sending OTP:', error);
            return { success: false };
        }
    },

    verifyOtp: async (phone, otp) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ phone, otp })
            });
            return await response.json();
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return { success: false };
        }
    },

    // Order APIs
    fetchOrders: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                cache: 'no-store',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            return { success: false };
        }
    },

    fetchOrderDetail: async (uuid) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${uuid}`, {
                cache: 'no-store',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching order detail:', error);
            return { success: false };
        }
    },

    cancelOrder: async (uuid, reason) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${uuid}/cancel`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ reason })
            });
            return await response.json();
        } catch (error) {
            console.error('Error cancelling order:', error);
            return { success: false };
        }
    },

    checkout: async (orderData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/checkout`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(orderData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error during checkout:', error);
            return { success: false, message: 'Submission failed' };
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error during logout:', error);
            return { success: false };
        }
    },

    changePassword: async (passwordData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(passwordData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error during password change:', error);
            return { success: false };
        }
    },

    submitReview: async (reviewData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/submit`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(reviewData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting review:', error);
            return { success: false };
        }
    },

    updateProfile: async (profileData) => {
        try {
            const isFormData = profileData instanceof FormData;
            const headers = getHeader();
            
            // For FormData, browser must set Content-Type with boundary
            if (isFormData) {
                delete headers['Content-Type'];
            }

            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'POST',
                headers: headers,
                body: isFormData ? profileData : JSON.stringify(profileData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false };
        }
    },

    // Address APIs
    getAddresses: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/addresses`, {
                cache: 'no-store',
                headers: getHeader()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching addresses:', error);
            return { success: false };
        }
    },

    addAddress: async (addressData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/addresses`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(addressData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding address:', error);
            return { success: false };
        }
    },

    updateAddress: async (id, addressData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/addresses/${id}`, {
                method: 'PUT',
                headers: getHeader(),
                body: JSON.stringify(addressData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating address:', error);
            return { success: false };
        }
    },

    createRazorpayOrder: async (orderId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/payment/razorpay/create-order`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify({ order_id: orderId })
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            return { success: false, message: error.message };
        }
    },

    verifyRazorpayPayment: async (paymentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/payment/razorpay/verify`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(paymentData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error verifying Razorpay payment:', error);
            return { success: false, message: error.message };
        }
    }
};
