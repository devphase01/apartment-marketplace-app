import { useSelector } from 'react-redux';
import './FilterMenu.scss';

const FilterMenu = () => {
  const { totalApartments } = useSelector(state => state.apartments);
  return (
    <div className="filter-menu">
      <div className="filter-menu__container container">
        <div className="filter-menu__title">
          <h2 className="filter-menu__title-text">
            Оренда квартир
          </h2>

          <span className="filter-menu__total-announcements">
            {totalApartments} пропозиції
          </span>
        </div>

        
      </div>
    </div>
  )
}

export default FilterMenu