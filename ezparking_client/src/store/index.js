import { configureStore } from '@reduxjs/toolkit'
import redirectReducer from './redirectSlice'

export const store = configureStore({
  reducer: {
    redirect: redirectReducer,
  },
})

