import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const blogApi = createApi({
  reducerPath:"blogApi",
  baseQuery:fetchBaseQuery({baseUrl:"",credentials:"include"}),
  tagTypes:['blog'],
  endpoints:(builders)=>({
    addBlog:builders.mutation({
      query:()=>({
        url:"POST",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
     updateBlog:builders.mutation({
      query:()=>({
        url:"PUT",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
     readBlog:builders.query({
      query:()=>({
        url:"GET",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
     deleteBlog:builders.mutation({
      query:()=>({
        url:"DELETE",
        method:"POST",}),
        invalidatesTags:['blog']
    }),
  })
})

export const {useAddBlogMutation,useDeleteBlogMutation,useReadBlogQuery,useUpdateBlogMutation} = blogApi;