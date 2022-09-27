import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setUserPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(userEmail, userPassword);
  }
  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <div className="auth__content">
        <form
          className="auth__form"
          name="form-retgistr"
          onSubmit={handleSubmit}
        >
          <fieldset className="auth__information">
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              name="email"
              className="auth__text auth__text_type_email"
              value={userEmail}
              maxLength="50"
              minLength="2"
              onChange={handleChangeEmail}
              autoComplete="off"
              required
            />
            <input
              id="login-password"
              type="password"
              placeholder="Пароль"
              name="password"
              className="auth__text auth__text_type_password"
              value={userPassword}
              onChange={handleChangePassword}
              autoComplete="off"
              required
            />
            <button
              className="auth__submit-btn"
              type="submit"
              onClick={props.onClose}
            >
              Зарегестрироваться
            </button>
          </fieldset>
          <div className="auth__signin">
            <p className="auth__submit-text">Уже зарегистрированы?</p>
            <Link to="/sing-in" className="auth__submit-source">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
