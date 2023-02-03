import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dropdownSelect: "Choose Your Destination",
  destinationSelect: "",
}

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    updateDropdown: (state, action) => {
      state.dropdownSelect = action.payload
    },
    updateParkingLot: (state, action) => {
      state.destinationSelect = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateDropdown, updateParkingLot } = redirectSlice.actions

export default redirectSlice.reducer