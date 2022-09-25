import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__information">
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className="popup__submit-btn" type="submit">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
