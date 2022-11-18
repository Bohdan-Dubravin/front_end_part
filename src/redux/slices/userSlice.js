import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthService from '../../api/services/AuthService'

export const loginUser = createAsyncThunk(
  'user/fetchlogin',
  async (username, password) => {
    try {
      console.log(username, password)
      const response = await AuthService.login(username, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState = {
  user: {
    username: '',
    status: '',
    role: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.user.status = 'load'
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.user.status = ''
      state.user.username = action.payload.username
      state.user.role = action.payload.role
    },
    [loginUser.rejected]: (state, action) => {
      state.user.status = 'error'
    },
  },
})

export default userSlice.reducer
