import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clickLog: [],
  currentLog:[],
  clickId:'',
  sendData:{},
  isNewPath:true
};

const mapClickSlice = createSlice({
  name: 'mapClick',
  initialState: initialState,
  reducers: {
    mapClickAdd(state, action) {
      const { lng, lat } = action.payload;
      state.clickLog = [...state.clickLog, [lat, lng]];
      state.clickId = state.clickLog.length - 1
      state.currentLog = [lat,lng]
    },
    mapClickMinus(state, action){
      state.clickLog.pop();
      state.clickId = state.clickLog.length + 1;
    },
    markerClick(state,action) {
      const { lat, lng,id } = action.payload;
      state.currentLog = [lat,lng]
      state.clickId = id
    },
    generateData(state,action) {
      const { data } = action.payload
      state.sendData = JSON.parse(JSON.stringify(data))
    },
    waypointUpdate(state, action) {
      const { lng, lat, index } = action.payload;
      state.clickLog[index] = [lat, lng];
    }
  },
});

export const { mapClickAdd,mapClickMinus,markerClick,generateData, waypointUpdate } = mapClickSlice.actions;
export default mapClickSlice.reducer;
