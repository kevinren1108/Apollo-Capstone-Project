import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dropdownSelectName: "Choose Your Destination",
  dropdownSelectID:"",
  destinationSelect: "",
}

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    updateDropdown: (state, action) => {
      const { name,id } = action.payload;
      state.dropdownSelectName = name
      state.dropdownSelectID = id
    },
    updateParkingLot: (state, action) => {
      state.destinationSelect = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateDropdown, updateParkingLot } = redirectSlice.actions

export default redirectSlice.reducer