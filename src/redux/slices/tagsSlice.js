import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getTags = createAsyncThunk(
  '/getTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/tags`
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const initialState = {
  tags: [],
  status: 'load',
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state, action) => {
        state.status = 'load'
      })
      .addCase(getTags.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.status = ''
        state.tags = action.payload
      })
  },
})

export const {} = tagsSlice.actions

export default tagsSlice.reducer
