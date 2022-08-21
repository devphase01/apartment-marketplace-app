import { useDispatch, useSelector } from 'react-redux';
import Card from './Card/Card';
import './CardContainer.scss';

import { Loader } from '../';
import { useEffect } from 'react';
import { getApartments } from '../../app/actions/Apartment';

const CardContainer = () => {
  const dispatch = useDispatch();
  const { apartments, isLoading } = useSelector(state => state.apartments);
  const { priceSort, roomsFilter } = useSelector(state => state.general);

  useEffect(() => {
    dispatch(getApartments({ price: priceSort, rooms: roomsFilter }));
  }, [dispatch, priceSort, roomsFilter]);

  if(isLoading) return <Loader />

  return (
    <div className="cards">
      <div className="cards__container container">
        {apartments && apartments.map(apartment => <Card announcement={apartment} key={apartment._id}/>)}
        {apartments.length === 0 && <div>No apartments found.</div>}
      </div>
    </div>
  )
}

export default CardContainer;