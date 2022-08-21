import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apartments: [],
  apartment: null,
  isLoading: false,
  isPopup: false,
  totalApartments: 0
}

const apartmentSlice = createSlice({
  name: "apartmentSlice",
  initialState,
  reducers: {
    setApartments(state, action) {
      state.apartments = action.payload;
    },

    addApartment(state, action) {
      state.apartments = [...state.apartments, action.payload];
      state.totalAnnouncement += 1;
    },

    setTotalApartments(state, action) {
      state.totalApartments = action.payload;
    },

    removeApartment(state, action) {
      state.apartments = [...state.apartments.filter(apartment => apartment._id !== action.payload)];
      state.totalAnnouncement -= 1; 
    },

    setLoading(state, action) { state.isLoading = action.payload },

    showPopup(state) { state.isPopup = true },
    hidePopup(state) { state.isPopup = false },
  },
});

export default apartmentSlice.reducer;
export const {
  setApartments, 
  setLoading, 
  setTotalApartments,
  addApartment, 
  removeApartment,
  hidePopup, 
  showPopup
} = apartmentSlice.actions;