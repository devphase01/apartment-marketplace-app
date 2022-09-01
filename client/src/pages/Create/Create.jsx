import { useState } from 'react';
import './Create.scss';

import { BsImageFill } from 'react-icons/bs';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import isValidForm from '../../utils/isValidForm';
import { createApartment } from '../../app/actions/Apartment';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState({
    name: '',
    price: '',
    rooms: '',
    description: '',
    icon: '',
  });

  const [file, setFile] = useState('');

  const handleChange = (event) => {
    setAnnouncement((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    if (event.target.name === 'description') {
      const descriptionLength = event.target.value.length;
      const descriptionLengthElement = document.querySelector('.create__description-length');

      descriptionLengthElement.classList.remove('normal');
      descriptionLengthElement.classList.remove('danger');
      descriptionLengthElement.classList.remove('sizeError');

      if (descriptionLength > 0 && descriptionLength < 70) {
        descriptionLengthElement.classList.add('normal');
      } else if (descriptionLength >= 70 && descriptionLength < 100) {
        descriptionLengthElement.classList.add('danger');
      } else if (descriptionLength > 99) {
        descriptionLengthElement.classList.add('sizeError');
      }
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setFile(URL.createObjectURL(file));
    setAnnouncement((prev) => ({ ...prev, icon: file }));
  };

  const handleCreate = () => {
    const isValid = isValidForm(announcement);

    const blocks = document.querySelectorAll('.create__card-block');
    blocks.forEach((block) => block.classList.remove('create__card-block_error'));

    if (!isValid.status) {
      const errorTarget = isValid.element;
      let errorBlock;

      if (errorTarget !== 'description') {
        const inputElem = `.create__card-block > input[name='${errorTarget}']`;
        errorBlock = document.querySelector(inputElem).parentElement;
      } else {
        const textareaElem = `.create__card-block > textarea[name='${errorTarget}']`;
        errorBlock = document.querySelector(textareaElem).parentElement;
      }

      errorBlock.classList.add('create__card-block_error');
    } else {
      blocks.forEach((block) => block.classList.remove('create__card-block_error'));

      dispatch(createApartment(announcement));

      navigate('/');
    }
  };

  return (
    <div className="create">
      <div className="create__container container">
        <div className="create__header">
          <h1 className="create__title">
            Додати оголошення
          </h1>

        </div>
        <div className="create__card">
          <div className="create__image">
            {file ? <img src={file} alt={file} /> : <BsImageFill className="create__image-icon" />}
            <input
              className="create__image-input"
              type="file"
              onChange={handleUpload}
              accept=".png,.jpg,.jpeg"
            />
          </div>

          <div className="create__content">

            <form className="create__card-form" autoComplete="off">
              <div className="create__card-block">
                <label htmlFor="create__title-input">Заголовок*</label>
                <input
                  type="text"
                  name="name"
                  className="create__title-input"
                  value={announcement.name}
                  onChange={handleChange}
                />
              </div>
              <div className="create__card-block">
                <label htmlFor="create__price-input">Ціна*</label>
                <input
                  type="number"
                  name="price"
                  className="create__price-input"
                  value={announcement.price}
                  onChange={handleChange}
                />
              </div>
              <div className="create__card-block">
                <label htmlFor="create__rooms-input">Кількість кімнат*</label>
                <input
                  type="number"
                  name="rooms"
                  className="create__rooms-input"
                  value={announcement.rooms}
                  onChange={handleChange}
                />
              </div>
              <div className="create__card-block">
                <label htmlFor="create__description-input">Опис</label>
                <textarea
                  className="create__description-input"
                  value={announcement.description}
                  onChange={handleChange}
                  name="description"
                />
                <span className="create__description-length">
                  {announcement.description.length}
                  /99
                </span>
              </div>

            </form>

            <button className="create__card-submit" onClick={() => handleCreate()}>
              <span>Створити</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Create;
