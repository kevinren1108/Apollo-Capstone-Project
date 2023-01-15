import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehicle: 0,
    parkingLots: 0,
    totalParkingSpot: 0,
    inUse: 0
}

const parkingStatusSlice = createSlice({
    name: "parkingStatus",
    initialState: initialState,
    reducers:{
        updateVehicleCount(state, action) {
            const newCount = action.payload
            state.vehicle += newCount
        },
        updateParkingLotsCount(state, action) {
            const newCount = action.payload
            state.parkingLots += newCount
        },
        updateTotalParkingSpotCount(state, action) {
            const newCount = action.payload
            state.totalParkingSpot += newCount
        },
        updateInUseCount(state, action) {
            const newCount = action.payload
            state.inUse += newCount
        },
    }
})

export const { updateVehicleCount, updateParkingLotsCount, updateTotalParkingSpotCount, updateInUseCount} = parkingStatusSlice.actions;
export default parkingStatusSlice.reducer;