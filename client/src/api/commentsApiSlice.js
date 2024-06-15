import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

export const getTokens = () => {
  const token = useSelector((state) => state.user.token);
  return token;
};

export const commentsApiSlice = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://grow-waco.onrender.com",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      //get
      query: (id) => `/comments/${id}`,
      transformResponse: (res) => res.sort((a, b) => b.timestamp - a.timestamp),
      providesTags: ["Comments"],
    }),
    ///////////////////////////////
    addComment: builder.mutation({
      //post
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        credentials: "include",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    ///////////////////////////////
    updateLikes: builder.mutation({
      //patch likes
      query: (payload) => ({
        url: `/comments/like/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Comments"],
    }),
    ///////////////////////////////
    updateComment: builder.mutation({
      //patch comments
      query: (payload) => ({
        url: `/comments/${payload.comment._id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Comments"],
    }),
    ///////////////////////////////
    deleteComment: builder.mutation({
      //delete
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});
export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLazyGetCommentsQuery,
  useUpdateLikesMutation,
} = commentsApiSlice;
