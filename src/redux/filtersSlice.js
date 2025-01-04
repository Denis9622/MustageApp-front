import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    features: {
      ac: false,
      automatic: false,
      kitchen: false,
      tv: false,
      bathroom: false,
    },
    vehicleType: {
      van: false,
      integrated: false,
      alcove: false,
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    toggleFeature: (state, action) => {
      const feature = action.payload;
      state.features[feature] = !state.features[feature];
    },
    toggleVehicleType: (state, action) => {
      const type = action.payload;
      state.vehicleType[type] = !state.vehicleType[type];
    },
    clearFilters: state => {
      state.location = '';
      state.features = {
        ac: false,
        automatic: false,
        kitchen: false,
        tv: false,
        bathroom: false,
      };
      state.vehicleType = {
        van: false,
        integrated: false,
        alcove: false,
      };
    },
  },
});

export const { setLocation, toggleFeature, toggleVehicleType, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
