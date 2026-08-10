import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "Select Location",
    pincode: "",
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setPincode: (state, action) => {
            state.pincode = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLocation, setPincode, setStatus, setError } = locationSlice.actions;

export default locationSlice.reducer;
