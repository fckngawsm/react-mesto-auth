class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  // обющая функция для проверки ответа сервера
  _checkServerAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка информации об юзере
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkServerAnswer(res));
  }

  //загржаем карточки из севера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkServerAnswer(res));
  }

  //обновляем аватар
  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkServerAnswer(res));
  }

  //редактиурем профиль
  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkServerAnswer(res));
  }

  //добавляем карточку
  sendCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkServerAnswer(res));
  }

  //удаляем карточку
  deleteCard(card) {
    return fetch(`${this._url}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkServerAnswer(res));
  }

  //ставим лайк
  setLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkServerAnswer(res));
  }

  //удаляем лайк
  deleteLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkServerAnswer(res));
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "80d9c849-c96a-4d0e-9998-43bbe94da9ed",
    "Content-Type": "application/json",
  },
});

export default api
