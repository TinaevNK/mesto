export {
  editButton,
  formElementEditProfile,
  nameInput,
  jobInput,
  addButton,
  formElementCreateCards,
  initialCards,
  config,
  formValidators
};

// попап редактирования профиля
const editButton = document.querySelector('#profile__edit-button'); // кнопка "ред-ть профиль"
const formElementEditProfile = document.querySelector('#popup-edit__form'); // форма попапа ред-ия профиля
const nameInput = formElementEditProfile.querySelector('#name'); // её <input> с именем;
const jobInput = formElementEditProfile.querySelector('#job'); // её <input> с работой

// попап добавления карточек
const popupElementCreateCards = document.querySelector('#popup-create-card'); // находим попап с добавлением карточек
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки (+)
const formElementCreateCards = popupElementCreateCards.querySelector('#popup-create-card__form'); // ищем форму добавления карточек

const machuPiсchu = new URL('../images/machu-piсchu.jpg', import.meta.url);
const moraineLake = new URL('../images/moraine-lake.jpg', import.meta.url);
const pamukkale = new URL('../images/pamukkale.jpg', import.meta.url);
const skaftafell = new URL('../images/skaftafell.jpg', import.meta.url);
const svínafellsjökull = new URL('../images/svínafellsjökull.jpg', import.meta.url);
const teriberka = new URL('../images/teriberka.jpg', import.meta.url);


// массив данных с дефолтными карточками
const initialCards = [ // первоначальный массив карточек для template (шаблона)
  {
    name: 'Мачу-Пикчу',
    link: machuPiсchu
  },
  {
    name: 'Озеро Морейн',
    link: moraineLake
  },
  {
    name: 'Памуккале',
    link: pamukkale
  },
  {
    name: 'Скафтафетль',
    link: skaftafell
  },
  {
    name: 'Снайфедльсйёкюдль',
    link: svínafellsjökull
  },
  {
    name: 'Териберка',
    link: teriberka
  }
];

const config = { // конфиг для валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error_opened'
};

const formValidators = {}; // объекты для валидации, первоначально - пустой массив. В него будем записывать нужные формы
