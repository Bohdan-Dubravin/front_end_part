import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/config';

export const getAllItems = createAsyncThunk(
  '/getItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/items');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getFullItem = createAsyncThunk(
  '/getFullItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const checkAuth = createAsyncThunk(
  '/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  items: [],
  status: 'load',
  fullItem: {},
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.status = '';
        state.items = action.payload;
      })
      .addCase(getFullItem.pending, (state, action) => {
        state.status = 'load';
      })
      .addCase(getFullItem.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(getFullItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = '';
        state.fullItem = action.payload;
      });
  },
});

export const {} = itemSlice.actions;

export default itemSlice.reducer;
