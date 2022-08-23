import { useSelector } from 'react-redux';
import './Header.scss';

const Header = () => {
  const { totalApartments } = useSelector(state => state.apartments);
  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__title">
          <h2 className="header__title-text">
            Оренда квартир
          </h2>

          <span className="header__total-announcements">
            {totalApartments} пропозицій
          </span>
        </div>

        
      </div>
    </div>
  )
}

export default Header