import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apartments: [],
  apartment: null,
  totalApartments: 0,
  isEditing: false,
}

const apartmentSlice = createSlice({
  name: "apartmentSlice",
  initialState,
  reducers: {
    setApartments(state, action) {
      state.apartments = action.payload;
    },

    setApartment(state, action) {
      state.apartment = action.payload;
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

    setEditingMode(state, action) {
      state.isEditing = action.payload;
    }

  },
});

export default apartmentSlice.reducer;
export const {
  setApartments,
  setApartment, 
  setTotalApartments,
  setEditingMode,
  addApartment, 
  removeApartment,
} = apartmentSlice.actions;