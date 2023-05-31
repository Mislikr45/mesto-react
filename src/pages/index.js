import "./index.css";

import { validationConfig, main } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { api } from "../components/Api.js";
import FormConfirmDeletCard from "../components/FormConfirmDeletCard.js";

const popupEditeProfile = document.querySelector(".popup_edit-profile");
const popupEditeAvater = document.querySelector(".popup_avatar");
const popupNameInput = document.querySelector(".popup__input_type_name");
const poupAboutInput = document.querySelector(".popup__input_type_about");
const buttonOpenEditProfileForm = document.querySelector(".profile__edite");
const template = document.querySelector("#card-item__template");
const cardForm = document.querySelector(".popup_card-form");
const buttonOpenAddCardForm = document.querySelector(".profile__add");
const avatarBtn = document.querySelector(".profile__avatar");
let userId;
// const userId= api.getUserInfo().then(PromiseResult => PromiseResult._id);

Promise.all([api.getUserInfo(), api.getCardInfo()]).then(([user, card]) => {
  userId = user._id;
  userInfo.setUserInfo(user);
  cardList.rendersItem(card, userId);
});

const cardList = new Section({
  items: [],
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
});

// функция создание карточки
const createCard = (element) => {
  const cardElement = new Card(
    element,
    template,
    userId,
    function handleImageClick(name, link) {
      popupWithImage.open(name, link);
    },

    function handleTrashClick() {
      confirmDelete.openConfirmation(cardElement);
    },

    function handleToggleLike() {
      api
        .toggleLike(cardElement.cardId, cardElement.isLiked(cardElement._likes))
        .then((res) => {
          cardElement.toggleLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  return cardElement.getView();
};

//Userinfo
const userInfo = new UserInfo({
  userName: ".profile__name",
  userAbout: ".profile__about",
  userAvatar: ".profile__avatar",
});

// user
// class popup пользователя
const formPopupEditProfile = new PopupWithForm(".popup_edit-profile", {
  submitCallback: (values) => {
    formPopupEditProfile.renderLoading("Сохранение...");
    api
      .editeProfile(values)
      .then((res) => {
        userInfo.setUserInfo(res);
        formPopupAddCard.finalLoading();
      })
      .then(() => {
        formPopupEditProfile.close();        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPopupEditProfile.finalLoading();
      });
  },
});

// слушатель на профиль
formPopupEditProfile.setEventListeners();

// слушатель открытия попапа профиля
buttonOpenEditProfileForm.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  formPopupEditProfile.open();
  popupNameInput.value = user.name;
  poupAboutInput.value = user.about;
});

//  добавление карточки
// попап добавления карточки
const formPopupAddCard = new PopupWithForm(".popup_card-form", {
  submitCallback: (data) => {
    formPopupAddCard.renderLoading("Сохранение...");
    api
      .handleAddCardApi(data)
      .then((cardElement) => {
        cardList.addItemPrepend(createCard(cardElement));
      })
      .then(() => {
        formPopupAddCard.close();
        validationAddCardForm.disableSubmitButton();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPopupAddCard.finalLoading();
      });
  },
});

// слушатель открытия попапа добавления карточки
buttonOpenAddCardForm.addEventListener("click", () => {
  formPopupAddCard.open();
});

// слушатель на добавление карты
formPopupAddCard.setEventListeners();

// удаление карточки
const confirmDelete = new FormConfirmDeletCard(".popup_confirm", {
  submitCallback: ({ card }) => {
    confirmDelete.renderLoading("Удаление...");
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.removeCard();
      })
      .then(() => {
        confirmDelete.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        confirmDelete.finalLoading();
      });
  },
});

confirmDelete.setEventListeners();

//аватар
// изменение аватара
const formPopupChangeAvatar = new PopupWithForm(".popup_avatar", {
  submitCallback: (data) => {
    formPopupChangeAvatar.renderLoading("Сохранение...");
    api
      .editeAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .then(() => {
        formPopupChangeAvatar.close();
        validationEditAvatar.disableSubmitButton();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPopupChangeAvatar.finalLoading();
      });
  },
});

// слушатель открытия попапа аватара
avatarBtn.addEventListener("click", () => {
  formPopupChangeAvatar.open();
});

//слушатель на форму аватара
formPopupChangeAvatar.setEventListeners();

//попапп
// класс попапп image
const popupWithImage = new PopupWithImage(".popup_img-zoom");

// слушатель на попап img
popupWithImage.setEventListeners();

//  Валидация
const validationEditForm = new FormValidator(
  validationConfig,
  popupEditeProfile
);

validationEditForm.enableValidation();

const validationAddCardForm = new FormValidator(validationConfig, cardForm);

validationAddCardForm.enableValidation();

const validationEditAvatar = new FormValidator(
  validationConfig,
  popupEditeAvater
);

validationEditAvatar.enableValidation();
