// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice"; 


// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;









import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice"
import wishReducer from "../store/wishListSlice"
import locationReducer from "../store/locationSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishReducer,
    location: locationReducer
  }
})


export default store;