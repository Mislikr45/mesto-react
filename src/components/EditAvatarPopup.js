import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";
 
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {

  

  useEffect(() => {
    isOpen && (inputRef.current.value = "");
  }, [isOpen]);
  const inputRef = useRef(0);

  function handleSubmit(e) {
    e.preventDefault();  
  
    onUpdateAvatar({
      avatar:inputRef.current.value
    })    
  } 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар?"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_type_link"
        id="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        // defaultValue={inputRef.current.value || ''}
        ref={inputRef}
        
      />
      <span className="url-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
