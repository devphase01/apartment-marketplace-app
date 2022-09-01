import { configureStore, combineReducers } from '@reduxjs/toolkit';
import apartmentReducer from './reducers/apartmentReducer';
import sectionObserverReducer from './reducers/sectionObserver';
import generalReducer from './reducers/general';

const rootReducer = combineReducers({
  apartments: apartmentReducer,
  sectionObserver: sectionObserverReducer,
  general: generalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
