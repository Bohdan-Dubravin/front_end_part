// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { logoutUser, setUser } from '../../redux/slices/userSlice'

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:5000',
//   credentials: 'include',
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token

//     if (token) {
//       headers.set('authorization', `Bearer ${token}`)
//     }

//     return headers
//   },
// })

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions)

//   if (result?.error?.originalStatus === 401) {
//     const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
//     console.log(refreshResult)
//     if (refreshResult?.data) {
//       api.dispatch(setUser({ ...refreshResult.data }))
//       localStorage.setItem('token', refreshResult.data.accessToken)
//       result = await baseQuery(args, api, extraOptions)
//     } else {
//       api.dispatch(logoutUser())
//     }
//   }
//   return result
// }

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// })
