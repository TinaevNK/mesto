// импорт классов
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// попап редактирования профиля
const popupEditProfile = document.querySelector('#popup-edit'); // попап ред-ия профиля
const editButton = document.querySelector('#profile__edit-button'); // кнопка "ред-ть профиль"
const formElementEditProfile = document.querySelector('#popup-edit__form'); // форма попапа ред-ия профиля
const nameInput = formElementEditProfile.querySelector('#name'); // её <input> с именем;
const jobInput = formElementEditProfile.querySelector('#job'); // её <input> с работой
const nameProfile = document.querySelector('.profile__name'); // ищем в документе поле с именем
const jobProfile = document.querySelector('.profile__job'); // ищем в документе поле с работой

// рендеринг карточек
const initialCards = [ // первоначальный массив карточек для template (шаблона)
  {
    name: 'Мачу-Пикчу',
    link: './images/machu-piсchu.jpg'
  },
  {
    name: 'Озеро Морейн',
    link: './images/moraine-lake.jpg'
  },
  {
    name: 'Памуккале',
    link: './images/pamukkale.jpg'
  },
  {
    name: 'Скафтафетль',
    link: './images/skaftafell.jpg'
  },
  {
    name: 'Снайфедльсйёкюдль',
    link: './images/svínafellsjökull.jpg'
  },
  {
    name: 'Териберка',
    link: './images/teriberka.jpg'
  }
];

// попап добавления карточек
const popupElementCreateCards = document.querySelector('#popup-create-card'); // находим попап с добавлением карточек
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки (+)
const formElementCreateCards = popupElementCreateCards.querySelector('#popup-create-card__form'); // ищем форму добавления карточек
const titleInput = formElementCreateCards.querySelector('#create-card__title'); // её <input> c названием карточки
const linkInput = formElementCreateCards.querySelector('#create-card__link'); // её <input> с ссылкой на карточку
const popupCreateCardButton = popupElementCreateCards.querySelector('#popup-create-card__save-button'); //  кнопка добавления карточки

// добавление просмотра картинки на весь экран
const popupPicture = document.querySelector('#popup-picture'); // ищем наш попап
const popupPhotoLink = popupPicture.querySelector('.popup__photo'); // фото в попапе
const popupPhotoName = popupPicture.querySelector('.popup__photo-name'); //подпись к фото
const allPopups = Array.from(document.querySelectorAll('.popup')); // создаём массив из всех попапов

allPopups.forEach((popup) => { // проходимся по всем попапам
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) { // если кликнутый элемент содержит написанный класс - закрой попап
        closePopup(popup) // закрытие по оверлею
      };
      if (evt.target.classList.contains('popup__close-button_general')) {
        closePopup(popup) // закрытие по кнопке "Х"
      };
  });
});

const setExitPopupByEsc = evt => { // колбэк для закрытия попапа по клавише Escape
  if (evt.key ==="Escape") {
    closePopup(document.querySelector(".popup_opened"));
  };
};

const openPopup = popupWindow => { // объявляем функцию открытия попапа и добавляем модификатор
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', setExitPopupByEsc); // добавляем слушатель по клавише Esc при открытии попапа
};

const closePopup = popupWindow => { // объявляем функцию закрытия попапа
  document.removeEventListener('keydown', setExitPopupByEsc); // удаляем слушатель перед закрытием попапа
  popupWindow.classList.remove('popup_opened');
};

const formSubmitHandlerEditProfile = evt => { // объявляем функцию сохраниния наших данных по кнопке "сохранить"
  evt.preventDefault(); // отмена значения по дефолту
  nameProfile.textContent = nameInput.value; // записываем в HTML значения введённые в форму
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

const openPopupEditProfile = () => { // функция открытия попапа открытия редактирования профиля
  nameInput.value = nameProfile.textContent; // при открытии попапа в полях будут записаны значения из HTML
  jobInput.value = jobProfile.textContent;
  ValitatorEditProfile.clearErrors(); // убираем ошибки при открытии
  ValitatorEditProfile.disableBtn(); // делаем кнопку сабмита неактивной при открытии
  openPopup(popupEditProfile);
};

const openPopupAddCard = () => { // функция открытия попапа открытия добавления карточки
  titleInput.value = ''; //делаем поля пустыми при открытии попапа
  linkInput.value = '';
  ValitatorAddCard.clearErrors();
  ValitatorAddCard.disableBtn();
  openPopup(popupElementCreateCards);
};

const formSubmitHandlerAddCard = evt => { // объявляем функцию сохраниния наших данных по кнопке "сохранить"
  evt.preventDefault();
  const newCardData = { // записываем в объект значения инпутов и передаём его в функцию добавления карточки
    name: titleInput.value,
    link: linkInput.value
  };
  addCard(newCardData);
  closePopup(popupElementCreateCards);
};

const fillPopupFullScreenCard = (picture, text) => { // при клике на карточку - она откроется на весь экран и заполнит данные в разметке
  popupPhotoLink.src = picture.src;
  popupPhotoLink.alt = text.textContent;
  popupPhotoName.textContent = text.textContent;
};

const setPictureClickHandler = card => { // вешаем обработчики по клику на каждую карточку
  const picture = card.querySelector('.element__photo');
  const text = card.querySelector('.element__title');
  picture.addEventListener('click', () => {
    fillPopupFullScreenCard(picture, text);
    openPopup(popupPicture);
  });
};

const instruction = cardElement => setPictureClickHandler(cardElement); // задел на будущее, если инструкций будет много.

const addCard = cardData => {
  const cardList = new Card(cardData, '#cardTemplate', instruction); // передаём данные в класс
  const cardElement = cardList.createCard(); // используем публичный метод класса для создания карточек
  document.querySelector('.elements__list').prepend(cardElement);
};

initialCards.reverse().forEach(cardDataArray => addCard(cardDataArray)); // рендер изначального массива.
// чтобы не писать фунцию под рендер и под добавление новых карт из формы, решил перед проходом по изначальному
// массиву перевернуть его, чтобы prepend одинаково хорошо работал и для новых карт и для массива initialCards

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error_opened'
};

const ValitatorAddCard = new FormValidator(config, formElementCreateCards);
ValitatorAddCard.enableValidation();

const ValitatorEditProfile = new FormValidator(config, formElementEditProfile);
ValitatorEditProfile.enableValidation();

editButton.addEventListener('click', openPopupEditProfile); //обработчик клика по кнопке "редактировать профиль"
formElementEditProfile.addEventListener('submit', formSubmitHandlerEditProfile); // обработчик события по нажатию на "сохранить"
addButton.addEventListener('click', openPopupAddCard); // обработчик клика по кнопке (+)
formElementCreateCards.addEventListener('submit', formSubmitHandlerAddCard); // обработчик клике по факту отправки формы
