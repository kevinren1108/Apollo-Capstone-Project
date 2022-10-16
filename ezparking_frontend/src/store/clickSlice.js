import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clickLog: {
    click: [0,0],

  }
}


const clickSlice = createSlice({
  name: "click",
  initialState: initialState,
  reducers:{
    clickAdd(state, action) {
      const { lng, lat } = action.payload;
      state.clickLog = {
        click: [lng, lat],
      };
    }
  }

})

export const { clickAdd } = clickSlice.actions;
export default clickSlice.reducer;