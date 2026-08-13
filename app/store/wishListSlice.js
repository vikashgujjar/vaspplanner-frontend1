import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { dispatch }) => {
    const response = await userService.fetchWishlist();
    if (response.success && response.data) {
      const mappedData = response.data.map(item => {
        const itemId = item.id || item.product_id || item.uuid || item.product_uuid;
        return {
          ...item,
          id: itemId,
          product_id: item.product_id || itemId,
          uuid: item.uuid || item.product_uuid,
          product_uuid: item.product_uuid || item.uuid,
          title: item.product_name || item.title || item.name,
          name: item.product_name || item.name || item.title,
          heading: item.product_name || item.heading || item.name,
          price: item.price,
          img: item.image || item.img,
          image: item.image || item.img,
          slug: item.product_slug || item.slug
        };
      });
      dispatch(setWishlist(mappedData));
      return mappedData;
    }
    return [];
  }
);

export const addWishAsync = createAsyncThunk(
  "wishlist/addWish",
  async (product, { dispatch }) => {
    if (!product) return;
    dispatch(addWish(product));
    const targetId = product.id || product.uuid || product.product_id;
    await userService.addToWishlist(targetId);
  }
);

export const removeWishAsync = createAsyncThunk(
  "wishlist/removeWish",
  async (productId, { dispatch }) => {
    if (!productId) return;
    const targetId = typeof productId === 'object'
      ? (productId.id || productId.uuid || productId.product_id)
      : productId;
    dispatch(removeWish(targetId));
    await userService.removeFromWishlist(targetId);
  }
);

export const clearWishlistAsync = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { dispatch }) => {
    dispatch(clearWishlist());
    await userService.clearWishlist();
  }
);

const WishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addWish: (state, action) => {
      if (!action.payload) return;
      const targetId = action.payload.id || action.payload.uuid || action.payload.product_id;
      const existProduct = state.wishlist.find(
        (elm) =>
          String(elm.id) === String(targetId) ||
          String(elm.uuid) === String(targetId) ||
          String(elm.product_id) === String(targetId) ||
          String(elm.product_uuid) === String(targetId)
      );
      if (!existProduct) {
        state.wishlist = [
          ...state.wishlist,
          {
            ...action.payload,
            id: targetId,
            wishAdd: true,
          },
        ];
      }
    },

    removeWish: (state, action) => {
      const productId = typeof action.payload === 'object'
        ? (action.payload?.id || action.payload?.uuid || action.payload?.product_id)
        : action.payload;
      if (!productId) return;
      state.wishlist = state.wishlist.filter(
        (elm) =>
          String(elm.id) !== String(productId) &&
          String(elm.uuid) !== String(productId) &&
          String(elm.product_id) !== String(productId) &&
          String(elm.product_uuid) !== String(productId)
      );
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { setWishlist, addWish, removeWish, clearWishlist } = WishListSlice.actions;
export default WishListSlice.reducer;
