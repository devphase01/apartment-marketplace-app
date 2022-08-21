import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import './FilterRooms.scss';

import { setSection } from '../../../app/reducers/sectionObserver';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getApartments } from '../../../app/actions/Apartment';
import { setRoomsFilter } from '../../../app/reducers/general';

const currentSection = "filterByRoom";

const FilterRooms = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [filterByRooms, setFilterByRooms] = useState(null);

  const { activeSection } = useSelector(state => state.sectionObserver);
  const { priceSort } = useSelector(state => state.general);

  const handleSubmit = (event) => {
    event.stopPropagation();
    setIsOpen(false);

    let isActiveFilter = false;
    const filterElements = document.querySelectorAll(".filter-rooms__item");

    filterElements.forEach(element => {
      if (element.classList.contains("active")) isActiveFilter = true;
    });

    if (isActiveFilter) {
      dispatch(getApartments({ rooms: filterByRooms, price: priceSort }));
      dispatch(setRoomsFilter(filterByRooms));
    }
    else {
      dispatch(setRoomsFilter(null));
      dispatch(getApartments({ rooms: null, price: priceSort }));
    }
  }

  const handleFilter = (event, element) => {
    event.stopPropagation();

    const dataValue = element.dataset.name;
    const filterElements = document.querySelectorAll(".filter-rooms__item");

    filterElements.forEach(filterElement => {
      if (filterElement.dataset.name !== dataValue) filterElement.classList.remove("active");
      else {
        filterElement.classList.toggle("active");

        setFilterByRooms(filterElement.classList.contains("active") ? element.textContent : null);
      }
    });
  }

  useEffect(() => {
    if (activeSection !== currentSection) {
      setIsOpen(false);
      document.querySelector(".filter-rooms__icon").classList.remove("active");
    }
  }, [activeSection]);

  return (
    <div className="filter-rooms">

      <div className="filter-rooms__text" onClick={(e) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
        dispatch(setSection(currentSection));
        document.querySelector(".filter-rooms__icon").classList.toggle("active");
      }}>
        <span>Фільтр: </span>
        <MdOutlineKeyboardArrowDown className="filter-rooms__icon" />
      </div>

      {isOpen && activeSection === currentSection &&
        <div className="filter-rooms__menu">
          <div className="filter-rooms__title">Кімнати</div>

          <div className="filter-rooms__items">
            <div className="filter-rooms__item" data-name="1" onClick={(e) => handleFilter(e, e.target)}>1</div>
            <div className="filter-rooms__item" data-name="2" onClick={(e) => handleFilter(e, e.target)}>2</div>
            <div className="filter-rooms__item" data-name="3" onClick={(e) => handleFilter(e, e.target)}>3</div>
            <div className="filter-rooms__item" data-name="4+" onClick={(e) => handleFilter(e, e.target)}>4+</div>
          </div>

          <button className="filter-rooms__submit" onClick={handleSubmit}>
            <span>Застосувати фільтр</span>
            <AiOutlineArrowRight className="filter-rooms__submit-icon" />
          </button>
        </div>
      }

    </div>
  )
}

export default FilterRooms