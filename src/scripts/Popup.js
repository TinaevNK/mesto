export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key ==="Escape" && this._popup.classList.contains('popup_opened')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('click', evt => { // если кликнутый элемент содержит написанный класс - закрой попап
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-button_general'))) {
        this.close(); // закрытие по оверлею
      };
    });
  }
}
