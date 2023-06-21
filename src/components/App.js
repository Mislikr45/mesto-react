import React from "react";
import { useEffect, useState } from "react";
import "../pages/index.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import EditAvatarPopup from "../components/EditAvatarPopup";
import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import FormConfirmDeletCard from "../components/FormConfirmDeletCard";
import ImagePopup from "../components/ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //{Хуки}
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddCardPopupOpen] = useState(false);
  const [isTrashPopupOpen, setTrashPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Профиль
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Карточки с сервера
  useEffect(() => {
    api
      .getCardInfo()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    //   // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then((item) => {
      setCards(cards.filter((item) => item._id !== card._id));
    });
  }

  function handleUpdateUser(name, about) {
    api.editeProfile(name, about).then((profile) => {
      setCurrentUser(profile);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddCard = (value) => {
    api
      .handleAddCardApi(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteCard}
            onCardClick={handleCardClick}
            currentUser={currentUser}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddCard}
          />

          <FormConfirmDeletCard
            isOpen={isTrashPopupOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
