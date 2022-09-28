import React from "react";

export default function Login(props) {
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
    props.onLogin(userEmail, userPassword);
  }
  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <div className="auth__content">
        <form className="auth__form" name="form-login" onSubmit={handleSubmit}>
          <fieldset className="auth__information">
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              name="email"
              className="auth__text login__text_type_email"
              value={userEmail}
              maxLength="40"
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
              className="auth__text login__text_type_password"
              value={userPassword}
              onChange={handleChangePassword}
              autoComplete="off"
              required
            />
          </fieldset>
          <button className="auth__submit-btn" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
