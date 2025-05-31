// navSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    selectedRideType: null,
    selectedPaymentMode: 'cash', 
    driverDetails: null,
    
};

export const navSlice = createSlice({
    name: "nav",
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setSelectedRideType: (state, action) => {
            state.selectedRideType = action.payload;
        },
        setSelectedPaymentMode: (state, action) => {
            state.selectedPaymentMode = action.payload;
        },
        setDriverDetails: (state, action) => {
            state.driverDetails = action.payload;
        }
    },
    initialState,
});

export const { 
    setOrigin, 
    setDestination, 
    setTravelTimeInformation, 
    setSelectedRideType,
    setSelectedPaymentMode,
    setDriverDetails 
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectSelectedRideType = (state) => state.nav.selectedRideType;
export const selectSelectedPaymentMode = (state) => state.nav.selectedPaymentMode;
export const selectDriverDetails = (state) => state.nav.driverDetails;

export default navSlice.reducer;