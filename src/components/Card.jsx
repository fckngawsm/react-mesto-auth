import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {card, onCardClick, onCardLike, onCardDelete} = props;
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn ? "element__delete" : ""}`;
  // првоерка на лайк
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // актинвый лайк
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-row">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
        ></button>
      )}
    </div>
  );
}

export default Card;
