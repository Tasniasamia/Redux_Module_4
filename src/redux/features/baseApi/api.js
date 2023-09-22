import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
   getPost:builder.query({
    query:()=>'/tasks'
   }),
   UpdatePost:builder.mutation({
    query:({id,data})=>({
        url:`/tasks/${id}`,
        method: 'PATCH',
        body:data
    })
})
,
   setPost:builder.mutation({
    query:(body)=>({
        url:`/tasks`,
        method: 'POST',
        body:body
    }),
   
   })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostQuery,useSetPostMutation,useUpdatePostMutation} = pokemonApi