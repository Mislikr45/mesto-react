// import logo from './logo.svg';
import React from "react";
import { useEffect, useState } from "react";
import "../pages/index.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import AvatarPopup from "../components/AvatarPopup";
import ProfilePopup from "../components/ProfilePopup";
import CardPopup from "../components/CardPopup";
import FormConfirmDeletCard from "../components/FormConfirmDeletCard";
import ImagePopup from "../components/ImagePopup";
import { api } from "../utils/Api";

function App() {

  //{Хуки}
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddCardPopupOpen] = useState(false);
  const [isTrashPopupOpen, setTrashPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
 

  // Открытие попапов
  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddCardPopupOpen(true);
  }

  function handleDeleteCard() {
    setTrashPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  
  // Закрытие попапов
  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setTrashPopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }



  return (
    <div className="App">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onDeleteCard={handleDeleteCard}
          onCardClick={handleCardClick}
          // profile={userProfile}
          // setCards={cards}
        />

        <Footer />

        <ProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

        <CardPopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <FormConfirmDeletCard
          isOpen={isTrashPopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </div>
  );
}

export default App;
