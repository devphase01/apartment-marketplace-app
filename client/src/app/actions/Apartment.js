import axios from 'axios';
import { addApartment, removeApartment, setApartments, setLoading, setTotalApartments } from '../reducers/apartmentReducer';

const URL = "http://localhost:7000/api/apartments";

export const getApartments = (params) => {
  return async dispatch => {
    try {
      let url = "http://localhost:7000/api/apartments";
      dispatch(setLoading(true));

      if(params?.rooms && params?.price) url += `?rooms=${params.rooms}&price=${params.price}`;
      else if (params?.rooms) url += `?rooms=${params.rooms}`;
      else if (params?.price) url += `?price=${params.price}`;

      const response = await axios.get(url);

      dispatch(setApartments(response.data.apartments));
      dispatch(setTotalApartments(response.data.totalApartments));

    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const createApartment = (apartment) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(URL, { 
        name: apartment.name,
        price: apartment.price,
        rooms: apartment.rooms,
        description: apartment.description,
      });

      dispatch(addApartment(response.data.apartment));
      dispatch(setTotalApartments(response.data.totalApartments));
      
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const deleteApartment = (apartment) => {
  return async dispatch => {
    try {
      await axios.delete(`${URL}/apartment?id=${apartment._id}`);
      dispatch(removeApartment(apartment._id));

    } catch (e) {
      console.log(e);
    } finally {
    }
  }
}