import React from "react";
import {  useEffect, useState } from "react";
import Card from "../components/Card.js";
import { api } from "../utils/Api";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onDeleteCard,
  onCardClick,
}) {

  const [userProfile, setUserProfile] = useState({});
  const [cards, setCards] = useState([]);

    // Профиль с сервера
    React.useEffect(() => {
      api.getUserInfo().then((user) => {
        setUserProfile(user);
      }).catch((err) => {
        console.log(err);
      })
    }, []);
  
  
    // Карточки с сервера
    React.useEffect(() => {
      api.getCardInfo().then((cards) => {        
        setCards(cards);
      }).catch((err) => {
        console.log(err);
      })
    }, []);
 

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <button
            className="profile__button-avatar"
            type="button"
            onClick={onEditAvatar}
          >
            <img className="profile__avatar" alt="фото" src={userProfile.avatar} />
          </button>
          <div className="profile__main">
            <h1 className="profile__name">{userProfile.name}</h1>
            <button
              className="profile__edite"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{userProfile.about}</p>
          </div>
        </div>
        <button
          className="button profile__add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              deleteCard={onDeleteCard}
              onCardClick={onCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}
 
export default Main;
