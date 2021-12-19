export {Card};

class Card {
  constructor(data, templateId, handleCardClick) { //данные карточки, id шаблона, инструкцию(слушатели на картинку)
    this._title = data.name;
    this._image = data.link;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate = () =>{ // рендерим карточки
    const cardElement = document
      .querySelector(this._templateId)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  };

  createCard = () => { // создаём карточки, публичный метод. Им будем добавлять новые элементы
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__photo"); // классовая переменная картинки в карточке
    this._setEvantListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  };

  _setEvantListeners = () =>{ // ставим слушатели на кнопку удаления и лайка
    this._element.querySelector(".element__delete-button").addEventListener("click", () => {
      this._element.remove();
    });

    this._element.querySelector(".element__like-button").addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  };
};
