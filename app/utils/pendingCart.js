import { toast } from "react-toastify";
import { addToCartAsync, fetchCartItems } from "../store/cartSlice";

export const PENDING_CART_KEY = "pendingCartAction";

export const savePendingCartAction = (action) => {
    if (typeof window === "undefined") return;
    try {
        const payload = {
            product: action.product,
            quantity: action.quantity || 1,
            variantId: action.variantId || (action.product?.variant_id || null),
            options: action.options || {},
            redirectUrl: action.redirectUrl || window.location.pathname,
            timestamp: Date.now(),
        };
        sessionStorage.setItem(PENDING_CART_KEY, JSON.stringify(payload));
        localStorage.setItem(PENDING_CART_KEY, JSON.stringify(payload));
    } catch (error) {
        console.error("Error saving pending cart action:", error);
    }
};

export const getPendingCartAction = () => {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(PENDING_CART_KEY) || localStorage.getItem(PENDING_CART_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // Expire pending action after 24 hours
        if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
            clearPendingCartAction();
            return null;
        }
        return parsed;
    } catch (e) {
        return null;
    }
};

export const clearPendingCartAction = () => {
    if (typeof window === "undefined") return;
    try {
        sessionStorage.removeItem(PENDING_CART_KEY);
        localStorage.removeItem(PENDING_CART_KEY);
    } catch (e) {
        console.error("Error clearing pending cart action:", e);
    }
};

export const executePendingCartAction = async (dispatch, router) => {
    const pending = getPendingCartAction();
    if (!pending || !pending.product) {
        return false;
    }

    // Clear immediately to ensure idempotency and prevent duplicate executions
    clearPendingCartAction();

    try {
        const productPayload = {
            product: {
                ...pending.product,
                variant_id: pending.variantId || pending.product?.variant_id || null,
            },
            quantity: pending.quantity || 1,
            variant_id: pending.variantId || pending.product?.variant_id || null,
            ...pending.options
        };

        const resultAction = await dispatch(addToCartAsync(productPayload));

        if (addToCartAsync.fulfilled.match(resultAction)) {
            toast.success("🛒 Product automatically added to your cart!", {
                icon: "🎉",
                style: { borderRadius: "12px" }
            });
            await dispatch(fetchCartItems());
            if (router) {
                router.push("/cart");
            }
            return true;
        } else {
            const errorMsg = resultAction.payload || "Product could not be added.";
            toast.error(`Auto add to cart failed: ${errorMsg}`);
            return false;
        }
    } catch (error) {
        console.error("Error executing pending cart action:", error);
        toast.error("An error occurred while automatically adding product to cart.");
        return false;
    }
};
