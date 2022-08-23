import FilterRooms from './FilterRooms/FilterRooms';
import SortPrice from './SortPrice/SortPrice';
import './Menu.scss';

const SortMenu = () => {
  return (
    <div className="sort-menu">
      <div className="sort-menu__container container">
        <SortPrice />
        <FilterRooms />
      </div>
    </div>
  )
}

export default SortMenu