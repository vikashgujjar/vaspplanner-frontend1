import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCart",
  async (_, { dispatch }) => {
    const response = await userService.fetchCart();
    if (response.success) {
      const items = response.data?.items || response.data || [];
        const mappedData = items.map(item => ({
            ...item,
            // Prioritize the unique cart item ID as the state ID to prevent key collisions
            id: item.cart_item_id || item.id || item.product_id || item.variant_id || item.product_uuid || item.uuid,
            cart_item_id: item.cart_item_id || item.id,
            product_id: item.product_id,
            variant_id: item.variant_id,
            variant_name: item.variant_name,
            product_uuid: item.product_uuid || item.uuid || item.product_id,
            uuid: item.uuid || item.product_uuid,
            title: item.product_name,
            price: item.unit_price || item.price,
            base_price: item.product_base_price || (item.unit_price || item.price),
            qnty: item.quantity,
            img: item.product_image || item.image,
            discount_percent: item.discount_percent || 0
        }));
      dispatch(setCart(mappedData));
      return mappedData;
    }
    return [];
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const productObj = payload.product ? payload.product : payload;
      const quantity = payload.quantity || payload.qnty || productObj.quantity || productObj.qnty || 1;
      const productId = productObj.product_uuid || productObj.uuid || productObj.id;
      const variantId = payload.variant_id || productObj.variant_id || (productObj.activeVariant ? productObj.activeVariant.id : null);
      const message = payload.message || payload.gift_message || productObj.message || productObj.gift_message || null;

      const response = await userService.addToCart(productId, quantity, variantId, message);
      if (response.success) {
        dispatch(addCart({ ...productObj, qnty: quantity, message, gift_message: message }));
        dispatch(fetchCartItems());
        return response;
      } else {
        return rejectWithValue(response.message || "Failed to add to cart");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { dispatch }) => {
    dispatch(removeCart(productId));
    await userService.removeFromCart(productId);
    dispatch(fetchCartItems());
  }
);

export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, qnty, type }, { dispatch }) => {
    if (type === 'increment') {
      dispatch(increQunty(productId));
    } else {
      dispatch(decareseQunty(productId));
    }
 
    if (qnty <= 0) {
      await userService.removeFromCart(productId);
    } else {
      await userService.updateCart(productId, qnty);
    }
    dispatch(fetchCartItems());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItem = Array.isArray(action.payload) ? action.payload : [];
    },
    addCart: (state, action) => {
      if (!state.cartItem || !Array.isArray(state.cartItem)) state.cartItem = [];
      const existProduct = state.cartItem.find(
        (elm) => String(elm.id) === String(action.payload.id) ||
                 (elm.product_id && String(elm.product_id) === String(action.payload.id)) ||
                 (elm.variant_id && String(elm.variant_id) === String(action.payload.id))
      );
      if (existProduct) {
        state.cartItem = state.cartItem.map((elm) =>
          (String(elm.id) === String(action.payload.id) || 
           (elm.product_id && String(elm.product_id) === String(action.payload.id)) ||
           (elm.variant_id && String(elm.variant_id) === String(action.payload.id)))
             ? { ...elm, qnty: (elm.qnty || 1) + (action.payload.qnty || 1) } 
             : elm
        );
      } else {
        state.cartItem = [...state.cartItem, { ...action.payload, qnty: action.payload.qnty || 1 }];
      }
    },
    removeCart: (state, action) => {
      const productId = action.payload?.id || action.payload;
      if (!state.cartItem || !Array.isArray(state.cartItem)) {
        state.cartItem = [];
        return;
      }
      const updateProduct = state.cartItem.filter(
        (elm) => String(elm.id) !== String(productId) &&
                 String(elm.product_id) !== String(productId) &&
                 String(elm.variant_id) !== String(productId)
      );
      state.cartItem = updateProduct;
    },
    increQunty: (state, action) => {
      const productId = action.payload?.id || action.payload;
      const updateProduct = state.cartItem.map((elm) =>
        String(elm.id) === String(productId) ? { ...elm, qnty: (elm.qnty || 1) + 1 } : elm
      );
      state.cartItem = updateProduct;
    },
    decareseQunty: (state, action) => {
      const productId = action.payload?.id || action.payload;
      const updateProduct = state.cartItem.map((elm) =>
        String(elm.id) === String(productId) ? { ...elm, qnty: (elm.qnty || 1) - 1 } : elm
      );
      state.cartItem = updateProduct.filter((elm) => elm.qnty > 0);
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const { setCart, addCart, removeCart, increQunty, decareseQunty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
