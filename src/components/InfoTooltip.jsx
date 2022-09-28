import React from "react";
import successfalse from "../images/successfalse.svg";
import successtrue from "../images/successtrue.svg";

export default function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tootlip ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <div className="popup__information">
          <img
            className="popup__success"
            src={props.success ? successtrue : successfalse}
            alt="Попап"
          />
          <h2 className="popup__title popup__title_success">
            {props.success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </div>
  );
}
