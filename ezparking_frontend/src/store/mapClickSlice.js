import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clickLog: [],
  // dialogOpen:
};

const mapClickSlice = createSlice({
  name: 'mapClick',
  initialState: initialState,
  reducers: {
    mapClickAdd(state, action) {
      const { lng, lat } = action.payload;

      state.clickLog = [...state.clickLog, [lat, lng]];
    },
  },
});

export const { mapClickAdd } = mapClickSlice.actions;
export default mapClickSlice.reducer;
