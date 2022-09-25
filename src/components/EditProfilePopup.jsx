import React from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      onClose={props.onClose}
      name={"profile"}
      isOpen={props.isOpen}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        type="text"
        placeholder="Ваше имя"
        name="name"
        className="popup__text popup__text_type_name"
        value={name}
        maxLength="40"
        minLength="2"
        required
        onChange={handleChangeName}
      />
      <span id="name_error" className="popup__error ">
        Вы пропустили это поле.
      </span>
      <input
        id="job"
        type="text"
        placeholder="Ваша работа"
        name="about"
        className="popup__text popup__text_type_status"
        value={description}
        maxLength="200"
        minLength="2"
        required
        onChange={handleChangeDescription}
      />
      <span id="job_error" className="popup__error ">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}
