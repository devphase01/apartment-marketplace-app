import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import {
  addApartment,
  removeApartment,
  setApartments,
  setTotalApartments,
  setApartment,
  setEditingMode,
} from '../reducers/apartmentReducer';
import { setLoading } from '../reducers/general';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'fe-upload-70d57.firebaseapp.com',
  projectId: 'fe-upload-70d57',
  storageBucket: 'fe-upload-70d57.appspot.com',
  messagingSenderId: '496364755747',
  appId: '1:496364755747:web:e3b0f0220392f1bfd50a96',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const URL = 'http://localhost:7000/api/apartments';

export const getApartments = (params) => async (dispatch) => {
  try {
    let url = 'http://localhost:7000/api/apartments';
    dispatch(setLoading(true));

    if (params?.rooms && params?.price) url += `?rooms=${params.rooms}&price=${params.price}`;
    else if (params?.rooms) url += `?rooms=${params.rooms}`;
    else if (params?.price) url += `?price=${params.price}`;

    const response = await axios.get(url);

    dispatch(setApartments(response.data.apartments));
    dispatch(setTotalApartments(response.data.totalApartments));
  } catch (e) {
    console.log(e.message);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getApartment = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${URL}/${id}`);

    dispatch(setApartment(response.data));
  } catch (e) {
    dispatch(setApartment({ error: 'Not found' }));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createApartment = (apartment) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    let iconURL = '';

    if (apartment.icon) {
      const storageRef = ref(storage, `images/${apartment.icon.name}`);
      await uploadBytesResumable(storageRef, apartment.icon);

      iconURL = await getDownloadURL(storageRef);
    }

    const response = await axios.post(URL, {
      name: apartment.name,
      price: apartment.price,
      rooms: apartment.rooms,
      description: apartment.description,
      icon: iconURL,
    });

    dispatch(addApartment(response.data.apartment));
    dispatch(setTotalApartments(response.data.totalApartments));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteApartment = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`${URL}/${id}`);
    dispatch(removeApartment(id));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
    dispatch(setEditingMode(false));
  }
};

export const updateApartment = (apartment) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(`${URL}/${apartment.id}`, {
      name: apartment.name,
      price: apartment.price,
      rooms: apartment.rooms,
      description: apartment.description,
      icon: apartment.icon,
    });

    dispatch(setApartment(response.data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
    dispatch(setEditingMode(false));
  }
};
