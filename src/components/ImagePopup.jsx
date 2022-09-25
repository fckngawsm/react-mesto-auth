import React from "react";

export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content-image">
        <button
          className="popup__close  popup__close-image"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__photo-image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup__description-image">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
}
