// src/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  endpoints: (builder) => ({
    // GET ALL CATEGORY
    getCategories: builder.query({
      query: () => "posts",
    }),

    // CREATE CATEGORY
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "posts",
        method: "POST",
        body: newCategory,
      }),
    }),

    // UPDATE CATEGORY
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `posts/${id}`,
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
