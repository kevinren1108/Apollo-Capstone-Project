import { configureStore } from '@reduxjs/toolkit'
import clickSlice from '../store/clickSlice'

export default configureStore({
  reducer: {
    clicked : clickSlice
  }
})