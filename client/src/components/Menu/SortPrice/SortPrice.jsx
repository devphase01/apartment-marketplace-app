import './SortPrice.scss';

import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { setSection } from '../../../app/reducers/sectionObserver';

import { getApartments } from '../../../app/actions/Apartment';
import { setPriceSort, setPriceText } from '../../../app/reducers/general';

const currentSection = "sortByPrice";

const SortPrice = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSelector(state => state.sectionObserver);
  const { roomsFilter, priceText } = useSelector(state => state.general);
  
  const [isSelect, setIsSelect] = useState(false);

  const handleSelect = (event, element) => {
    event.stopPropagation();

    const type = element.dataset.type;
    const text = element.textContent;

    setIsSelect(false);
    document.querySelector(".sort-price__icon").classList.remove("active");
    
    // ACTION TO SERVER
    dispatch(getApartments({ price: type, rooms: roomsFilter }));
    dispatch(setPriceSort(type));
    dispatch(setPriceText(text));
  }

  useEffect(() => {
    if(activeSection !== currentSection) {
      setIsSelect(false);
      document.querySelector(".sort-price__icon").classList.remove("active");
    }
  }, [activeSection]);

  return (
    <div className="sort-price">

      <div className="sort-price__text" onClick={(e) => {
        e.stopPropagation();
        setIsSelect(prev => !prev);
        dispatch(setSection(currentSection));

        document.querySelector(".sort-price__icon").classList.toggle("active");
      }}>
        <span>Сортування цін: <span>{priceText}</span></span>
        <MdOutlineKeyboardArrowDown className="sort-price__icon"/>
      </div>

      {isSelect && activeSection === currentSection && (
        <div className="sort-price__options">
          <div onClick={(e) => handleSelect(e, e.target)} data-type="default">Стандартне</div>
          <div onClick={(e) => handleSelect(e, e.target)} data-type="asc">По зростанню</div>
          <div onClick={(e) => handleSelect(e, e.target)} data-type="desc">По спаданню</div>
        </div>
      )}

    </div>
  )
}

export default SortPrice