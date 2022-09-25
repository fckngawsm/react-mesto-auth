import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setLink(e.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name, link });
  }
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);
  return (
    <PopupWithForm
      onClose={props.onClose}
      name={"add"}
      isOpen={props.isOpen}
      title={"Новое место"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="title-input"
        type="text"
        placeholder="Название"
        name="name"
        className="popup__text popup__text_type_name"
        value={name}
        maxLength="30"
        minLength="2"
        onChange={handleChangeName}
        required
      />
      <span id="title-input_error" className="popup__error">
        Ошибка!
      </span>
      <input
        id="source-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__text popup__text_type_status"
        value={link}
        onChange={handleChangeDescription}
        required
      />
      <span id="source-input_error" className="popup__error">
        Ошибка!
      </span>
    </PopupWithForm>
  );
}
