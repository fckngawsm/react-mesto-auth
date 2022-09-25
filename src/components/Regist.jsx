import React from "react";
import { Link } from "react-router-dom";

export default function Registr() {
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    console.log(setUserEmail)
    function handleChangeEmail(e) {
        setUserEmail(e.target.value);
    }
      function handleChangePassword(e) {
        setUserPassword(e.target.value);
    }
  return (
    <div className="registr">
      <h1 className="registr__title">Регистрация</h1>
      <div className="registr__content">
        <form className="registr__form " name="form-retgistr">
          <fieldset className="registr__information">
            <input
              id="registr-email"
              type="email"
              placeholder="Email"
              name="email"
              className="registr__text registr__text_type_email"
              value={userEmail}
              maxLength="50"
              minLength="2"
              required
              onChange={handleChangeEmail}
            />
            <input
              id="registr-password"
              type="password"
              placeholder="Пароль"
              name="password"
              className="registr__text registr__text_type_password"
              value={userPassword}
              required
              onChange={handleChangePassword}
            />
          </fieldset>
        </form>
        <div className=""></div>
        <div className="registr__submit">
          <button className="registr__submit-btn" type="submit">
            Зарегестрироваться
          </button>
          <Link to="/sing-in" className="registr__submit-source" >
            <p className="registr__submit-text">Уже зарегистрированы? Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
