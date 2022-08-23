import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomsFilter: localStorage.getItem("roomsFilter") ? localStorage.getItem("roomsFilter") : null,
  priceSort: localStorage.getItem("priceSort") ? localStorage.getItem("priceSort") : "default",
  priceText: localStorage.getItem("priceText") ? localStorage.getItem("priceText") : "Стандартне",
  isLoading: false,
  isPopup: false,
}

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setRoomsFilter(state, action) {
      state.roomsFilter = action.payload;
      localStorage.setItem("roomsFilter", action.payload);
    },

    setPriceSort(state, action) {
      state.priceSort = action.payload;
      localStorage.setItem("priceSort", action.payload);
    },

    setPriceText(state, action) {
      state.priceText = action.payload;
      localStorage.setItem("priceText", action.payload);
    },

    setLoading(state, action) { state.isLoading = action.payload },

    showPopup(state) { state.isPopup = true },
    hidePopup(state) { state.isPopup = false },
  }
});

export default generalSlice.reducer;
export const { setRoomsFilter, setPriceSort, setPriceText, setLoading, showPopup, hidePopup } = generalSlice.actions;