import './Details.scss';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getApartment } from '../../app/actions/Apartment';
import { Apartment, EditForm, Loader } from '../../components';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.general);
  const { apartment, isEditing } = useSelector(state => state.apartments);

  useEffect(() => {
    dispatch(getApartment(id));
  }, [dispatch, id]);


  if(isLoading) return <div className="loader"><Loader /></div>

  return (
    <div className="details">
      <div className="details__container container">
        {apartment && !isLoading && <Apartment data={apartment} />}
      </div>

      {isEditing && <EditForm data={apartment}/>}
    </div>
  )
}

export default Details