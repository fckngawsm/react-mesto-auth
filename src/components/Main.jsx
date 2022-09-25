import React from "react";
import plus from "../images/plus.svg";

import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const { cards } = props;
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__column">
          <img
            src={currentUser.avatar}
            alt="аватар"
            className="profile__avatar"
          />
          <button
            type="button"
            className="profile__edit-avatar"
            onClick={props.onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img src={plus} alt="плюс" className="profile__plus" />
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
