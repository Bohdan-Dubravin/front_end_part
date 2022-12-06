import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../api/config'

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
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', {
        ...userData,
      })

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

export const logoutUser = createAsyncThunk('/logout', async () => {
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
  async (_, { rejectWithValue }) => {
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

export const likePost = createAsyncThunk(
  '/likePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/like/${id}`, {
        withCredentials: true,
      })

      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const dislikePost = createAsyncThunk(
  '/dislikePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/dislike/${id}`, {
        withCredentials: true,
      })

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
  avatarUrl: null,
  id: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    likePostState: (state, payload) => {
      state.likes.push(payload)
      state.dislikes = state.dislikes.filter((postId) => postId !== payload)
    },

    dislikePostState: (state, payload) => {
      state.dislikes.push(payload)
      state.likes = state.likes.filter((postId) => postId !== payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { username, role, avatarUrl, _id } = action.payload.data.user
        console.log(action.payload)
        state.status = ''
        state.username = username
        state.role = role
        state.auth = true
        state.avatarUrl = avatarUrl
        state.id = _id
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { username, role, avatarUrl, _id } = action.payload

        state.status = ''
        state.username = username
        state.role = role
        state.auth = true
        state.avatarUrl = avatarUrl
        state.id = _id
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = ''
        state.username = null
        state.role = ''
        state.auth = false
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { username, role, avatarUrl, _id } = action.payload.data.user

        state.status = ''
        state.username = username
        state.role = role
        state.auth = true
        state.avatarUrl = avatarUrl
        state.id = _id
      })
  },
})

export const { likePostState, dislikePostState } = userSlice.actions

export default userSlice.reducer
