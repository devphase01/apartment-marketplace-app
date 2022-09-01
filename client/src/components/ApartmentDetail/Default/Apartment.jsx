import './Apartment.scss';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setEditingMode } from '../../../app/reducers/apartmentReducer';
import { Error } from '../../../pages';
import { formatPrice, formatRooms } from '../../../utils/formatter';

function Apartment({ data }) {
  const dispatch = useDispatch();

  if (!data) return <div>No apartment found.</div>;

  if (data.error) return <Error />;
  return (
    <div className="apartment">
      <div className="apartment__image">
        <img src={data.icon} alt="" />
      </div>

      <div className="apartment__content">
        <div className="apartment-content-block">
          <div className="apartment__title">{data.name}</div>
          <div className="apartment__price">
            {formatPrice(data.price)}
            {' '}
            грн
          </div>
          <div className="apartment__rooms">{formatRooms(data.rooms)}</div>
          <div className="apartment__description multiline">
            <span>Опис: </span>
            {' '}
            <br />
            <p>{`${data.description}`}</p>
          </div>
        </div>

        <Link to="/" className="apartment__back">
          <AiOutlineArrowRight />
          <span>На головну</span>
        </Link>

        <div className="apartment__edit" onClick={() => dispatch(setEditingMode(true))}>
          <FaRegEdit />
        </div>
      </div>
    </div>
  );
}

export default Apartment;
