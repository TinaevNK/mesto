import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    return this._inputList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._callbackSubmit);
  }

  close () {
    super.close();
    this._inputList.forEach(input => {
      input.value = "";
    });
  }
}
