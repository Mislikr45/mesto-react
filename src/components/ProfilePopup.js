import React from "react";
import PopupWithForm from "./PopupWithForm";

function ProfilePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        id="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="name-error popup__input-error"></span>

      <input
        type="text"
        className="popup__input popup__input_type_about"
        id="about"
        name="about"
        placeholder="Вид деятельности"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="about-error popup__input-error"></span>
    </PopupWithForm>
  );
}
 
export default ProfilePopup;
