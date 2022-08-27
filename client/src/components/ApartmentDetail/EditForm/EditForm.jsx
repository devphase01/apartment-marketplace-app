import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEditingMode } from '../../../app/reducers/apartmentReducer';
import './EditForm.scss';

import { AiFillDelete } from 'react-icons/ai';
import { deleteApartment, updateApartment } from '../../../app/actions/Apartment';
import { useNavigate } from 'react-router-dom';
import isValidForm from '../../../utils/isValidForm';

const ApartmentEdit = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apartment, setApartment] = useState({
    id: data._id,
    name: data.name,
    price: data.price,
    rooms: data.rooms,
    description: data.description,
    icon: data.icon
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = isValidForm(apartment);

    const blocks = document.querySelectorAll('.edit__form-block');

    blocks.forEach(block => block.classList.contains("edit__form-block_error")
      ? block.classList.remove("edit__form-block_error")
      : "");

    if (!isValid.status) {
      const errorTarget = isValid.element;
      let errorBlock;

      if(errorTarget !== "description") {
       errorBlock = document.querySelector(`.edit__form-block > input[name="${errorTarget}"]`).parentElement;
      } else {
        errorBlock = document.querySelector(`.edit__form-block > textarea[name="${errorTarget}"]`).parentElement;
      }

      errorBlock.classList.add("edit__form-block_error");
    } else {
      dispatch(updateApartment(apartment));
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteApartment(data._id));
    navigate("/");
  }

  const handleChange = (event) => {
    setApartment(prev => ({ ...prev, [event.target.name]: event.target.value }));

    if(event.target.name === "description") {
      let descriptionLength = event.target.value.length;
      const descriptionLengthElement = document.querySelector(".edit__description-length");

      descriptionLengthElement.classList.remove("normal");
      descriptionLengthElement.classList.remove("danger");
      descriptionLengthElement.classList.remove("sizeError");

      if(descriptionLength > 0 && descriptionLength < 70) {
        descriptionLengthElement.classList.add("normal");
      } else if (descriptionLength >= 70 && descriptionLength < 100) {
        descriptionLengthElement.classList.add("danger");
      } else if (descriptionLength > 99) {
        descriptionLengthElement.classList.add("sizeError");
      }
    }
  }

  return (
    <div className="edit">
      <div className="edit__modal">

        <form className="edit__form" onSubmit={handleSubmit} autoComplete="off">
          <div className="edit__form-inputs">
            <div className="edit__form-block">
              <label>Заголовок</label>
              <input
                type="text"
                name="name"
                value={apartment.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit__form-block">
              <label>Ціна</label>
              <input
                type="number"
                name="price"
                value={apartment.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit__form-block">
              <label>Кімнати</label>
              <input
                type="number"
                name="rooms"
                value={apartment.rooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit__form-block">
              <label>Опис</label>
              <textarea
                type="text"
                name="description"
                className="edit__description"
                value={apartment.description}
                onChange={handleChange}
              />
              <span className="edit__description-length">
                {apartment.description.length}/99
              </span>
            </div>
          </div>

          <div className="edit__form-footer">
            <button type="delete" className="edit__delete" onClick={handleDelete}>
              <AiFillDelete className="edit__delete-icon" />
            </button>

            <div className="edit__buttons">
              <button className="edit__cancel" onClick={() => dispatch(setEditingMode(false))}><span>Скасувати</span></button>
              <button type="submit" className="edit__submit"><span>Зберегти</span></button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ApartmentEdit