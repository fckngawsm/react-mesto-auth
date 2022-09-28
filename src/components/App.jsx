import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "../index.css";
import api from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);

  // history
  const history = useHistory();
  //
  const [email, setEmail] = React.useState("");
  // state
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  //
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  //
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  //
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  //
  const [isInfoTooltopOpen, setIsInfoTooltopOpen] = React.useState(false);
  //
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //
  const [isSuccess, setIsSuccess] = React.useState(false);
  //
    React.useEffect(() => {
      if(isLoggedIn){
        api
        .getInitialCards()
        .then((cards) => setCards(cards))
        .catch((err) => console.log(err));
      }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if(isLoggedIn){
      api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Error: ${err}`));
    }
  }, [isLoggedIn]);

  // редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // добавление новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // изменение аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // закрытие попапов
  function closeAllPopups() {
    setIsInfoTooltopOpen(false);
    setIsImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoTooltopOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);


  // чтобы не схлопаывалась картинка!
  React.useEffect(() => {
    if (!isImagePopupOpen) {
      setTimeout(() => {
        setSelectedCard(null);
      }, 400);
    }
  }, [isImagePopupOpen]);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
    console.log("true");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((res) => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .sendCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltopOpen(true);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setIsInfoTooltopOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setIsSuccess(false);
        setIsInfoTooltopOpen(true);
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={email} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              component={Main}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegisterSubmit} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLoginSubmit} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
          <InfoTooltip
            isOpen={isInfoTooltopOpen}
            success={isSuccess}
            onClose={closeAllPopups}
          />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
