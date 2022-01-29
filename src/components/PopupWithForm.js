import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._sumbitButton = this._popup.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._callbackSubmit(this._getInputValues(), this._sumbitButton);
    });
  }

  close() { // при закрытии отчистим поля формы
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
