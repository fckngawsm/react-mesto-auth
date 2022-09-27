export const BASE_URL = "https://auth.nomoreparties.co";
// общая функции для проверки ответа с сервера
export function checkServerAnswer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
// регистрация
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkServerAnswer);
};
// вход
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkServerAnswer)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return res;
      }
    });
};
// токен
export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
    }
    })
    .then(res => res.json())
    .then(data => data)
  }
