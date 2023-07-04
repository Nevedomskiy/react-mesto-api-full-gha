import { BASE_URL } from './constants';

class Api {
  constructor(config) {
    this._url = config.url;
    this._header = config.headers.authorization
  }

  _getResponseData(res) {
    if (res.ok) { return res.json() }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  //получение данных карточек
  getDataCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._header
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  //получение данных пользователя
  getDataProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._header
    })
      .then((res) => {
        return this._getResponseData(res);
      })

  }

  //редактирование данных пользователя
  patchDataProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  //редактирование аватара
  patchAvatarProfile(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  //создание новой карточки
  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  //удаление карточки
  deleteCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: 'DELETE',
      headers: {
        credentials: 'include',
        'content-type': 'application/json',
        authorization: this._authorization
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }


  changeLikeCardStatus(dataId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${dataId}/likes`, {
        method: 'PUT',
        headers: this._header
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    }
    else {
      return fetch(`${this._url}/cards/${dataId}/likes/`, {
        method: 'DELETE',
        headers: this._header
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    }
  }

}

export const instApi = new Api({
  url: BASE_URL,
  headers: {
    credentials: 'include',
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  }
});