import { baseApi } from "../baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    getAllServices: builder.query({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;