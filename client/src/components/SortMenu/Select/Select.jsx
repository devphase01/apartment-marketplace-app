import './Select.scss';

import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { setSection } from '../../../app/reducers/sectionObserver';

import { getApartments } from '../../../app/actions/Apartment';
import { setPriceSort, setPriceText } from '../../../app/reducers/general';

const currentSection = "sortByPrice";

const Select = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSelector(state => state.sectionObserver);
  const { roomsFilter, priceText, priceSort } = useSelector(state => state.general);
  
  const [sortByPrice, setSortByPrice] = useState({ text: "Стандартне", type: null });
  const [isSelect, setIsSelect] = useState(false);

  const handleSelect = (event, element) => {
    event.stopPropagation();

    const type = element.dataset.type;
    const text = element.textContent;

    setIsSelect(false);
    setSortByPrice({ type, text });
    document.querySelector(".select__icon").classList.remove("active");
    
    // ACTION TO SERVER
    dispatch(getApartments({ price: type, rooms: roomsFilter }));
    dispatch(setPriceSort(type));
    dispatch(setPriceText(text));
  }

  useEffect(() => {
    if(activeSection !== currentSection) {
      setIsSelect(false);
      document.querySelector(".select__icon").classList.remove("active");
    }
  }, [activeSection]);

  return (
    <div className="select">

      <div className="select__text" onClick={(e) => {
        e.stopPropagation();
        setIsSelect(prev => !prev);
        dispatch(setSection(currentSection));

        document.querySelector(".select__icon").classList.toggle("active");
      }}>
        <span>Сортування цін: {priceText}</span>
        <MdOutlineKeyboardArrowDown className="select__icon"/>
      </div>

      {isSelect && activeSection === currentSection && (
        <div className="select__options">
          <div onClick={(e) => handleSelect(e, e.target)} data-type="default">Стандартне</div>
          <div onClick={(e) => handleSelect(e, e.target)} data-type="asc">Знизу вверх</div>
          <div onClick={(e) => handleSelect(e, e.target)} data-type="desc">Зверху вниз</div>
        </div>
      )}

    </div>
  )
}

export default Select