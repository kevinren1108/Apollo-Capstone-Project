import { configureStore } from '@reduxjs/toolkit'
import mapClickSlice from '../store/mapClickSlice'
import editMeunClickSlice from '../store/editMeunClickSlice'

export default configureStore({
  reducer: {
    mapClicked : mapClickSlice,
    editMenuSelected: editMeunClickSlice
  }
})