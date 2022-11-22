import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../api/config'
import AuthService from '../../api/services/AuthService'

export const loginUser = createAsyncThunk(
  '/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { username, password })

      if (!response.status > 202) {
        throw new Error(response)
      }
      localStorage.setItem('token', response.data.accessToken)
      return response
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const registerUser = createAsyncThunk(
  '/register',
  async ({ username, password, role }, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(username, password, role)

      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const logoutUser = createAsyncThunk('/loout', async (args) => {
  try {
    const response = await api.post('/auth/logout')
    localStorage.removeItem('token')
    return response
  } catch (error) {
    console.log(error)
  }
})

export const checkAuth = createAsyncThunk(
  '/checkAuth',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

const initialState = {
  username: null,
  status: '',
  role: '',
  auth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { username, role } = action.payload.data.user
        state.status = ''
        state.username = username
        state.role = role
        state.auth = true
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { username, role } = action.payload
        state.status = ''
        state.username = username
        state.role = role
        state.auth = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = ''
        state.username = null
        state.role = ''
        state.auth = false
      })

    // [loginUser.pending]: (state, action) => {
    //   state.user.status = 'load'
    // },
    // [loginUser.rejected]: (state, action) => {
    //   state.user.status = 'error'
    // },
    // [loginUser.fulfilled]: (state, action) => {
    //   const { username, role } = action.payload.user
    //   state.user.status = ''
    //   state.user.username = username
    //   state.user.role = role
    // },
    // [checkAuth.fulfilled]: (state, action) => {
    //   const { username, role } = action.payload.user
    //   state.user.status = ''
    //   state.user.username = username
    //   state.user.role = role
    // },
    // [checkAuth.rejected]: (state, action) => {
    //   state.user.status = 'error'
    //   state.user.username = ''
    //   state.user.role = ''
    // },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
