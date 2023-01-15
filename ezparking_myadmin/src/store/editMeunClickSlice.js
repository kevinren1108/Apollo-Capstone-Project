import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editSelected: 0
}

const editMenuClickSlice = createSlice({
    name: "editMenuClick",
    initialState: initialState,
    reducers:{
        editParkingLotClick(state, action) {
            const selection = action.payload
            state.editSelected = selection
        },
        editWaypointClick(state, action) {
            const selection = action.payload
            state.editSelected = selection
        }
    }
})

export const { editParkingLotClick, editWaypointClick } = editMenuClickSlice.actions;
export default editMenuClickSlice.reducer;