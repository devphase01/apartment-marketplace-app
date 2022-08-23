import './Apartment.scss'

import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setEditingMode } from '../../../app/reducers/apartmentReducer';

const Apartment = ({ data }) => {
  const dispatch = useDispatch();
  if (!data) return <div>No apartment found.</div>

  return (
    <div className="apartment">
      <div className="apartment__image">
        <img src="https://t-cf.bstatic.com/xdata/images/hotel/square600/214928356.webp?k=897527c745c9c410d77d7ade09d70fbfac836f9339b50f5255b96aac887b310e&o=&s=1" alt="" />
      </div>

      <div className="apartment__content">
        <div className="apartment-content-block">
          <div className="apartment__title">{data.name}</div>
          <div className="apartment__price">{data.price} ₴</div>
          <div className="apartment__rooms"><span>Кімнат:</span> {data.rooms}</div>
          <div className="apartment__description">
            <span>Опис: </span> <br />
            <p>{data.description}</p>
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
  )
}

export default Apartment;