import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSection: null
}

const sectionObserverSlice = createSlice({
  name: "sectionObserver",
  initialState,
  reducers: {
    setSection(state, action) { state.activeSection = action.payload }
  }
});

export default sectionObserverSlice.reducer;
export const { setSection } = sectionObserverSlice.actions;