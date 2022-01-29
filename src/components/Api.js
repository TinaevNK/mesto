const onError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getInitialCards() { // получаем карточки с сервера
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(onError);
  }

  getUserInfo() {  // получаем данные о пользователе с сервера
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(onError);
  }

  renderUserAndCards() { // если оба промиса зарезолвены - верни массив этих промисов
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  setUserInfo(info) { // записываем данные пользователя на сервер
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then(onError)
  }

  addCard(data) { // добавляем карточку на сервер
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(onError);
  }

  setUserAvatar(input) { // записываем аватарку на сервер
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: input.avatar
      })
    })
    .then(onError)
  }

  setLike(data) { // отправляем лайк на сервер
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(onError);
  }

  deleteLike(data) { // убираем лайк с сервера
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  deleteCard(data) { // удаление карточки
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }
}
