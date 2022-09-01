import './Navbar.scss';

import { BiUserCircle } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__container container">
        <div className="navbar__logo" onClick={() => navigate('/')}>
          <img src="/assets/logotype.png" alt="logotype" />
          <div>
            <p>
              <span>Endous</span>
              <span>House</span>
            </p>
          </div>
        </div>

        <div className="navbar__actions">
          <div className="navbar__user">
            <BiUserCircle className="navbar__user-icon" />
            <span>Admin</span>
          </div>
          <Link to="/create" className="navbar__create-announcement">
            <span>Додати оголошення</span>
            <AiOutlinePlus className="navbar__create-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
