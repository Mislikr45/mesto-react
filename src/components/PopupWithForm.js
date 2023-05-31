import React from "react";

function PopupWithForm(props) {
  const popupClass = `popup popup_type_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`popup__form__${props.name}`}
          className={`popup__form popup__form__${props.name}`}
          noValidate
        >
          {props.children}
          <button
            className={`button popup__save popup__save_place_${props.name}`}
            type="submit"
            aria-label="Сохранить"
          >
            {props.buttonText}
          </button>
        </form>
        <button
          className={`popup__close popup__close_place_${props.name}`}
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
