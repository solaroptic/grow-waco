import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { proposalsApiSlice } from "../api/proposalsApiSlice.js";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["userApi"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      //POST to login/////////////
      query: (creds) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body: creds,
      }),
      providesTags: ["userApi"],
    }),
    addUser: builder.mutation({
      //post
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["userApi"],
    }),
    updateUser: builder.mutation({
      //patch
      query: ({ updates, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["userApi", "Proposals"],
    }),
    updateVotes: builder.mutation({
      //patch
      query: (payload) => ({
        url: `/users/vote/${payload.userId}`,
        method: "PATCH",
        body: payload,
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(
            proposalsApiSlice.util.invalidateTags(["Proposals", "userApi"])
          );
        });
      },
    }),

    deleteUser: builder.mutation({
      //delete
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["userApi"],
    }),
  }),
});
export const {
  useLoginUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateVotesMutation,
} = userApiSlice;
