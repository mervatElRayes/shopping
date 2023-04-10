// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// this codes response to Get All Data
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-level5-84bs.onrender.com/",
  }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: (name) => `products`,
    }),
  }),
});
// this code response to Get  ONLY "One Product ===> just one"
export const oneproductsApi = createApi({
  reducerPath: "oneproductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-level5-84bs.onrender.com",
  }),

  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductsByNameQuery } = productsApi;
export const { useGetOneProductQuery } = oneproductsApi;
