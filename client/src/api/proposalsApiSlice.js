import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const proposalsApiSlice = createApi({
  reducerPath: "proposals", //default name is 'api'
  baseQuery: fetchBaseQuery({
    baseUrl: "https://grow-waco.onrender.com",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().user.token;
      if (token && endpoint !== "addProposalPic") {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Proposals"], //!!! results get cached, so tags needed
  endpoints: (builder) => ({
    getProposals: builder.query({
      //get
      query: () => "/proposals",
      transformResponse: (res) => res.sort((a, b) => a.votes - b.votes),
      providesTags: ["Proposals"],
    }),
    addProposal: builder.mutation({
      //post
      query: (propose) => ({
        url: "/proposals/add",
        method: "POST",
        body: propose,
      }),
      invalidatesTags: ["Proposals"],
    }),
    addProposalPic: builder.mutation({
      //post
      query: (pic) => ({
        url: "https://api.cloudinary.com/v1_1/duysbh0j0/image/upload",
        method: "POST",
        body: pic,
        formData: true,
      }),
      invalidatesTags: ["Proposals"],
    }),
    updateProposal: builder.mutation({
      //patch
      query: ({ payload, id }) => ({
        url: `/proposals/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Proposals"],
    }),
    deleteProposal: builder.mutation({
      //delete
      query: (id) => ({
        url: `/proposals/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Proposals"],
    }),
    notifyProposalClear: builder.mutation({
      //delete prop notification
      query: (id) => ({
        url: `/proposals/notification/${id}`,
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Proposals"],
    }),
  }),
});
export const {
  useGetProposalsQuery,
  useAddProposalMutation,
  useAddProposalPicMutation,
  useUpdateProposalMutation,
  useDeleteProposalMutation,
  useNotifyProposalClearMutation,
} = proposalsApiSlice;
