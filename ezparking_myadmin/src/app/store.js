import { configureStore } from '@reduxjs/toolkit'
import mapClickSlice from '../store/mapClickSlice'
import editMeunClickSlice from '../store/editMeunClickSlice'
import parkingStatusSlice from '../store/parkingStatusSlice'


export default configureStore({
  reducer: {
    mapClicked : mapClickSlice,
    editMenuSelected: editMeunClickSlice,
    parkingStatus: parkingStatusSlice
  }
})