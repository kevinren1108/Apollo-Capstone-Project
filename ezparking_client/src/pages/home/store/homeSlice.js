import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'homeInfo',
    initialState: {
        userName: "",
    },
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload
        }
    }
})

export const { setUserName }  = homeSlice.actions
export default homeSlice.reducer