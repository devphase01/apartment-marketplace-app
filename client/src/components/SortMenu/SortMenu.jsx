import FilterRooms from './FilterRooms/FilterRooms';
import Select from './Select/Select';
import './SortMenu.scss';

const SortMenu = () => {
  return (
    <div className="sort-menu">
      <div className="sort-menu__container container">
        <Select />
        <FilterRooms />
      </div>
    </div>
  )
}

export default SortMenu