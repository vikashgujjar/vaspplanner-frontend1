import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { dispatch }) => {
    const response = await userService.fetchWishlist();
    if (response.success && response.data) {
      // Map API data if needed
      const mappedData = response.data.map(item => ({
        ...item,
        id: item.product_id,
        title: item.product_name,
        heading: item.product_name,
        price: item.price,
        img: item.image
      }));
      dispatch(setWishlist(mappedData));
      return mappedData;
    }
    return [];
  }
);

export const addWishAsync = createAsyncThunk(
  "wishlist/addWish",
  async (product, { dispatch }) => {
    dispatch(addWish(product));
    await userService.addToWishlist(product.id);
  }
);

export const removeWishAsync = createAsyncThunk(
  "wishlist/removeWish",
  async (productId, { dispatch }) => {
    dispatch(removeWish(productId));
    await userService.removeFromWishlist(productId);
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
      const existProduct = state.wishlist.find(
        (elm) => String(elm.id) === String(action.payload.id)
      );
      if (!existProduct) {
        state.wishlist = [
          ...state.wishlist,
          { ...action.payload, wishAdd: true },
        ];
      }
    },

    removeWish: (state, action) => {
      const productId = action.payload?.id || action.payload;
      state.wishlist = state.wishlist.filter(
        (elm) => String(elm.id) !== String(productId)
      );
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { setWishlist, addWish, removeWish, clearWishlist } = WishListSlice.actions;
export default WishListSlice.reducer;
