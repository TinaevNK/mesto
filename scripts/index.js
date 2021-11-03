const popupElement = document.querySelector('.popup');

const closeButton = document.querySelector('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector("input[name='name']");

const jobInput = formElement.querySelector("input[name='job']");

const nameProfile = document.querySelector('.profile__name');

const jobProfile = document.querySelector('.profile__job');

function openPopup() {

  popupElement.classList.add('popup_opened');

}

function closePopup() {

  popupElement.classList.remove('popup_opened');

  nameInput.value = nameProfile.textContent;

  jobInput.value = jobProfile.textContent;

}

function formSubmitHandler (evt) {

  evt.preventDefault();

  nameProfile.textContent = nameInput.value;

  jobProfile.textContent = jobInput.value;

  closePopup();

}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
