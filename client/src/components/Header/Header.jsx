import './Header.scss';

import { BiUserCircle } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createApartment } from '../../app/actions/Apartment';

const Header = () => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(createApartment({ name: "New Apartment", price: 36300, rooms: 4, description: "Some description" }));
  }

  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__logo" onClick={() => navigate("/")}>
          <img src="/assets/logotype.png" alt="logotype" />
          <div>
            <p>
              <span>Endous</span>
              <span>House</span>
            </p>
          </div>
        </div>

        <div className="header__actions">
          <div className="header__user">
            <BiUserCircle className="header__user-icon"/>
            <span>Admin</span>
          </div>
          <button className="header__create-announcement" onClick={() => handleCreate()}>
            <span>Додати оголошення</span>
            <AiOutlinePlus className="header__create-icon"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header