import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneproductsApi, productsApi } from "./ProductsApi";
import cartReducer from "./CartSlice";

export const store = configureStore({
  reducer: {
    // "carttt" ========> "useSelector" المفروض يكون موجود مع الهوك اللى اسمه
    carttt: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneproductsApi.reducerPath]: oneproductsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneproductsApi.middleware),
});

setupListeners(store.dispatch);
