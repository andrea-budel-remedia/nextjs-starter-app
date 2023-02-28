import { Product } from '@/modules/product/product.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dummyjson.com/`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    searchProducts: builder.query<
      { products: Product[]; total: number; skip: number; limit: number },
      { query?: string; skip?: number; limit?: number }
    >({
      query: ({ skip, limit, query = '' }) =>
        `https://dummyjson.com/products/search?q=${query}&skip=${skip}&limit=${limit}`,
    }),
  }),
});

export const { useSearchProductsQuery } = dummyApi;
