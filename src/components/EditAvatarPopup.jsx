import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    if (avatarRef && avatarRef.current) {
      avatarRef.current.value = "";
    }
  }, [props.isOpen]);

  return(
    <PopupWithForm
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    name={"avatar"}
    title={"Обновить аватар"}
    buttonText={"Сохранить"}
  >
    <input
      ref={avatarRef}
      id="avatar_input"
      type="url"
      name="avatar"
      required
      placeholder="Ссылка на картинку"
      className="popup__text popup__text_type_avatar"
    />
    <span id="avatar-input_error" className="popup__error">
      Ошибка!
    </span>
  </PopupWithForm>
  )
}
