import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._callbackSubmit = callbackSubmit;
    this._submitEventHandler = this._submitEventHandler.bind(this); // иначе в this запишется форма
  }

  setEventListeners() {
    super.setEventListeners();
  }

  _submitEventHandler(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._data);
  }

  open(data) {
    super.open();
    this._form.addEventListener('submit', this._submitEventHandler);
    this._data = data;
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitEventHandler);
  }
}
