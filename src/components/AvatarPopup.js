import React from "react";
import PopupWithForm from "./PopupWithForm";

function AvatarPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар?"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        type="url"
        className="popup__input popup__input_type_link"
        id="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="url-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AvatarPopup;
