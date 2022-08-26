import './Card.scss';
import { Link } from 'react-router-dom';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { formatPrice, formatRooms } from '../../../utils/formatter';

const Card = ({ announcement }) => {

  return (
    <div className="card">
      <div className="card__image">
        <img src="https://t-cf.bstatic.com/xdata/images/hotel/square600/214928356.webp?k=897527c745c9c410d77d7ade09d70fbfac836f9339b50f5255b96aac887b310e&o=&s=1" alt="" />
      </div>

      <div className="card__content">
        <div className="card-content-block">
          <div className="card__price">{ formatPrice(announcement.price) } грн</div>
          <div className="card__title">{ announcement.name }</div>
          <div className="card__rooms">{ formatRooms(announcement.rooms) }</div>
          <div className="card__description multiline">
            <span>Опис:</span>
            <p>
            {announcement.description.length > 50 
            ? `${announcement.description.slice(0, 50)}...`
            : `${announcement.description}`}
            </p>
          </div>
        </div>

        <Link to={`/apartment/${announcement._id ? announcement._id : announcement.id}`} className="card__read-more">
          <AiOutlineArrowRight />
          <span>Read More</span>
        </Link>
      </div>
    </div>
  )
}

export default Card