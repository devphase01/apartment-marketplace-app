import './Card.scss';
import { Link } from 'react-router-dom';

import { AiOutlineArrowRight } from 'react-icons/ai';

const Card = ({ announcement }) => {

  return (
    <div className="card">
      <div className="card__image">
        <img src="https://t-cf.bstatic.com/xdata/images/hotel/square600/214928356.webp?k=897527c745c9c410d77d7ade09d70fbfac836f9339b50f5255b96aac887b310e&o=&s=1" alt="" />
      </div>

      <div className="card__content">
        <div className="card-content-block">
          <div className="card__price">{ announcement.price } грн</div>
          <div className="card__title">{ announcement.name }</div>
          <div className="card__rooms">{ announcement.rooms } кімнат</div>
          <p className="card__description">
            {announcement.description.length > 140 
            ? `${announcement.description.slice(0, 60)}...`
            : `${announcement.description}`}
          </p>
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