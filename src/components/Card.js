export default class Card {
  constructor(data, templateId, handleCardClick, handleLikeSet, handleLikeDelete, handleCardDelete, UserId) { //данные карточки, id шаблона, инструкцию(слушатели на картинку)
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
    this._handleLikeSet = handleLikeSet;
    this._handleLikeDelete = handleLikeDelete;
    this._handleCardDelete = handleCardDelete;
    this._UserId = UserId;
  }

  _getTemplate = () =>{ // рендерим карточки
    const cardElement = document
      .querySelector(this._templateId)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createCard = () => { // создаём карточки, публичный метод. Им будем добавлять новые элементы
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeElement = this._element.querySelector('.element__like-counter');
    this._cardData = {data: this._data, counterLikes: this._likeElement};
    this._likeElement.textContent = this._likes.length;
    this._cardImage = this._element.querySelector(".element__photo"); // классовая переменная картинки в карточке
    this._setEvantListeners();
    this._isLiked();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;
    // пишем условие для проверки, наша карточка это или нет. Если не наша - убираем корзинку и ссылку на неё в DOM
    if (!this._checkIsOwnerCard()) {
      this._deleteButton.remove();
      this._deleteButton = null // убираем ссылку на DOM элемент
    }
    return this._element;
  }

  _setEvantListeners = () =>{ // ставим слушатели
    this._deleteButton.addEventListener("click", () => {  // слушатель удаления, ссылаемся на колбэк
      this._handleCardDelete({data: this._data, element: this._element});
    });

    this._likeButton.addEventListener('click', evt => { // слушатель на постановку и снятие лайка
      if (evt.target.classList.contains('element__like-button_active')) {
        this._handleLikeDelete(this._cardData, evt);
      } else {
        this._handleLikeSet(this._cardData, evt);
      }
    })

    // Михаил, спасибо за быстрое ревью! Надеюсь правильно понял замечания! в случае чего - готов поправить

    this._cardImage.addEventListener('click', () => { // передаём в колбэк данные карточки при клике на картинку
      const data = {title: this._title, image: this._image};
      this._handleCardClick(data);
    });
  }

  _isLiked() { // проверяем наш ли лайк при рендере
    this._likes.forEach(like => {
      if (like._id === this._UserId) {
        this._likeButton.classList.add('element__like-button_active')
      }
    })
  }

  _checkIsOwnerCard() { // проверка наша карточка или нет. Undefined может быть т.к. при создании новой карты я не передаю UserId
    if ((this._UserId == this._data.owner._id) || (this._UserId == undefined)) {
      return true;
    }
    return false;
  }
}
