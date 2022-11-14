import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clickLog: []
}


const clickSlice = createSlice({
  name: "click",
  initialState: initialState,
  reducers:{
    clickAdd(state, action) {
      const { lng, lat } = action.payload;
      
      state.clickLog = [
        ...state.clickLog, 
        [lat.toFixed(3), lng.toFixed(3)]
      ]
    }
  }

})

export const { clickAdd } = clickSlice.actions;
export default clickSlice.reducer;