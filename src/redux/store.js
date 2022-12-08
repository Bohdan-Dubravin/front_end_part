import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/authSlice'
import itemReducer from './slices/itemSlice'
import postReducer from './slices/postSlice'
import tagsReducer from './slices/tagsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    post: postReducer,
    tags: tagsReducer,
  },
})
