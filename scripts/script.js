const popupElement = document.querySelector('.popup');

const closeButton = document.querySelector('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector("input[name='name']");

const infoInput = formElement.querySelector("input[name='info']");

const nameProfile = document.querySelector('.profile__name');

const descriptionProfile = document.querySelector('.profile__description');

function openPopup() {

  popupElement.classList.add('popup_opened');

}

function closePopup() {

  popupElement.classList.remove('popup_opened');

  nameInput.value = nameProfile.textContent;

  infoInput.value = descriptionProfile.textContent;

}

function formSubmitHandler (evt) {

  evt.preventDefault();

  nameProfile.textContent = nameInput.value;

  descriptionProfile.textContent = infoInput.value;

  closePopup();

}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
