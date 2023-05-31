import React from "react";
import { useState } from "react";
import Card from "../components/Card.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  profile,
  setCards,
  onDeleteCard,
  onCardClick,
}) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <button
            className="profile__button-avatar"
            type="button"
            onClick={onEditAvatar}
          >
            <img className="profile__avatar" alt="фото" src={profile.avatar} />
          </button>
          <div className="profile__main">
            <h1 className="profile__name">{profile.name}</h1>
            <button
              className="profile__edite"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{profile.about}</p>
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
        {setCards.map((card) => {
          return (
            <Card
              card={card}
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
