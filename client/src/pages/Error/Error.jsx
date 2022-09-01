import './Error.scss';

import { TbFaceIdError } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Error() {
  return (
    <div className="error">
      <div className="error__container container">
        <div className="error__content">
          <TbFaceIdError className="error__icon" />
          <div className="error__text">Сторінку не знайдено</div>
          <Link to="/" className="error__redirect">
            <AiOutlineArrowRight />
            <span>На головну</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
