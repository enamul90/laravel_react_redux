// src/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),

  endpoints: (builder) => ({
    // GET ALL CATEGORY
    getCategories: builder.query({
      query: () => "category",
    }),

    // CREATE CATEGORY
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "category",
        method: "POST",
        body: newCategory,
      }),
    }),

    // UPDATE CATEGORY
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),

    // DELETE CATEGORY
    deleteCategory: builder.mutation({
      query: (id: number | string) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation
} = api;
