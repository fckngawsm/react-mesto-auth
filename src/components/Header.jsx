import React from "react";
import header from "../images/Vector.svg";
import { Link, Route, Switch } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={header} alt="лого" />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__source">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__source">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{props.email}</p>
            <Link
              to="/sing-in"
              className="header__source"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
