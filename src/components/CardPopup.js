import React from "react";
import PopupWithForm from "./PopupWithForm";

function CardPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="card-form"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        type="text"
        className="popup__input popup__input_type_place"
        id="place"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="place-error popup__input-error"></span>

      <input
        type="url"
        className="popup__input popup__input_type_link"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default CardPopup;
 