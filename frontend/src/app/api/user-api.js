import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userApi = createApi({
  reducerPath:"userApi",
  baseQuery:fetchBaseQuery({baseUrl:"",credentials:"include"}),
  tagTypes:['blog'],
  endpoints:(builders)=>({
    register:builders.mutation({
      query:()=>({
        url:"POST",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
     login:builders.mutation({
      query:()=>({
        url:"PUT",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
     profile:builders.query({
      query:()=>({
        url:"GET",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
     logout:builders.mutation({
      query:()=>({
        url:"DELETE",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
  })
})

export const {useLogoutMutation,useLoginMutation,useProfileQuery,useRegisterMutation} = userApi;