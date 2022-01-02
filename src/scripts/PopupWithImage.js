import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = document.querySelector('.popup__photo');
    this._popupText = document.querySelector('.popup__photo-name');
  }

  open({title, image}) {
    super.open();
    this._popupPicture.src = image;
    this._popupPicture.alt = title;
    this._popupText.textContent = title;
  }
}
