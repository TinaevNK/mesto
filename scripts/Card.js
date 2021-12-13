export {Card};

class Card {
  constructor(data, templateId){
    this._title = data.name;
    this._image = data.link;
    this._templateId = templateId;
  }

  _getTemplate = () =>{
    const cardElement = document
      .querySelector(this._templateId)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createCard = () => {
    this._element = this._getTemplate();
    // this._setListeners();
    // this._instruction(this._element)
    this._element.querySelector(".element__photo").src = this._image;
    this._element.querySelector(".element__photo").alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }


  // _setListeners = () =>{
  //   // функция удаления карточек
  //   this._element.querySelector(".place__button-delete").addEventListener("click", () => {
  //     this._element.remove();
  //   })

  //   // обработчик лайка
  //   this._element.querySelector(".place__heart-button").addEventListener("click", (evt) => {
  //     evt.target.classList.toggle("place__heart-button_active");
  //   })

  // }

}
