// попап редактирования профиля
const editButton = document.querySelector('#profile__edit-button'); // кнопка "ред-ть профиль"
const formElementEditProfile = document.querySelector('#popup-edit__form'); // форма попапа ред-ия профиля
const nameInput = formElementEditProfile.querySelector('#name'); // её <input> с именем;
const jobInput = formElementEditProfile.querySelector('#about'); // её <input> с работой

// попап добавления карточек
const popupElementCreateCards = document.querySelector('#popup-create-card'); // находим попап с добавлением карточек
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки (+)
const formElementCreateCards = popupElementCreateCards.querySelector('#popup-create-card__form'); // ищем форму добавления карточек

// попап редактирования аватарки
const profileAvatar = document.querySelector('.profile__avatar'); // автарка
const formElementAvatar = document.querySelector('#popup-avatar__form'); // форма измениния аватара

// попап удаления карточки
const deleteCardsButton = document.querySelector('#popup-delete-card__save-button');

const config = { // конфиг для валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error_opened'
};

export {
  editButton,
  formElementEditProfile,
  nameInput,
  jobInput,
  addButton,
  formElementCreateCards,
  profileAvatar,
  formElementAvatar,
  deleteCardsButton,
  config
};
