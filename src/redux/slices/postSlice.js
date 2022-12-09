import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../api/config'

export const getAllPosts = createAsyncThunk(
  '/getItems',
  async (tag, { rejectWithValue }) => {
    try {
      console.log(tag)
      const response = await api.get('/posts', { params: { tag } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const getFullPost = createAsyncThunk(
  '/getFullItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/items/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const createPost = createAsyncThunk(
  '/createPost',
  async (post, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/create`, post)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

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

const initialState = {
  posts: [],
  status: 'load',
  fullPost: {},
}

export const postSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = ''
        state.posts = action.payload
      })
      .addCase(getFullPost.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(getFullPost.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(getFullPost.fulfilled, (state, action) => {
        state.status = ''
        state.fullPost = action.payload
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = ''
        state.fullPost = action.payload
      })
  },
})

export const {} = postSlice.actions

export default postSlice.reducer
