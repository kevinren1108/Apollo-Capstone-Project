import { configureStore } from '@reduxjs/toolkit'
import homeSlice from '../pages/home/store/homeSlice'

export default configureStore({
  reducer: {
    home: homeSlice
  },
})