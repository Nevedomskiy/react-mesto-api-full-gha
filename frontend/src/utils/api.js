import { BASE_URL } from './constants';

class Api {
  constructor({ url, mode, credentials, headers }) {
    this._url = url;
    this._config = { mode, credentials, headers };
  }

  _getResponseData(res) {
    if (res.ok) { return res.json() }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  //получение данных карточек
  getDataCards() {
    return fetch(`${this._url}/cards`, {
      ...this._config,
      method: 'GET',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  //получение данных пользователя
  getDataProfile() {
    return fetch(`${this._url}/users/me`, {
      ...this._config,
      method: 'GET',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  //редактирование данных пользователя
  patchDataProfile(data) {
    return fetch(`${this._url}/users/me`, {
      ...this._config,
      method: 'PATCH',
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
      ...this._config,
      method: 'PATCH',
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
      ...this._config,
      method: 'POST',
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
      ...this._config,
      method: 'DELETE',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }


  changeLikeCardStatus(dataId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${dataId}/likes`, {
        ...this._config,
        method: 'PUT',
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    } else {
      return fetch(`${this._url}/cards/${dataId}/likes/`, {
        ...this._config,
        method: 'DELETE',
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    }
  }

}

export const instApi = new Api({
  url: BASE_URL,
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});