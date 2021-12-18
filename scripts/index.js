import { Card } from "./Card.js";
// попап редактирования профиля

const popupEditProfile = document.querySelector('#popup-edit'); // попап ред-ия профиля
const editButton = document.querySelector('#profile__edit-button'); // кнопка "ред-ть профиль"
const formElement = document.querySelector('#popup-edit__form'); // форма попапа ред-ия профиля
const nameInput = formElement.querySelector('#name'); // её <input> с именем;
const jobInput = formElement.querySelector('#job'); // её <input> с работой
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
const closeButtonPicture = popupPicture.querySelector('.popup__close-button_general'); //его кнопка закрытия
const popupPhotoLink = popupPicture.querySelector('.popup__photo'); // фото в попапе
const popupPhotoName = popupPicture.querySelector('.popup__photo-name'); //подпись к фото
const allPopups = Array.from(document.querySelectorAll('.popup')); // создаём массив из всех попапов

// проходимся по всем попапам
allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) { // если кликнутый элемент содержит написанный класс - закрой попап
        closePopup(popup) // закрытие по оверлею
      };
      if (evt.target.classList.contains('popup__close-button_general')) {
        closePopup(popup) // закрытие по кнопке "Х"
      };
  });
});

// // объявляем функцию сброса кнопки сохранения данных
// const disabledButton = button => {
//   button.disabled = true;
//   button.classList.add('popup__save-button_disabled');
// };

// колбэк для закрытия попапа по клавише Escape
const setExitPopupByEsc = evt => {
  if (evt.key ==="Escape") {
    closePopup(document.querySelector(".popup_opened"));
  };
};

// объявляем функцию открытия попапа и добавляем модификатор
const openPopup = popupWindow => {
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', setExitPopupByEsc); // добавляем слушатель по клавише Esc при открытии попапа
};

// объявляем функцию закрытия попапа
const closePopup = popupWindow => {
  document.removeEventListener('keydown', setExitPopupByEsc); // удаляем слушатель перед закрытием попапа
  popupWindow.classList.remove('popup_opened');
};

// объявляем функцию сохраниния наших данных по кнопке "сохранить"
const formSubmitHandlerEditProfile = evt => {
  evt.preventDefault(); // отмена значения по дефолту
  nameProfile.textContent = nameInput.value; // записываем в HTML значения введённые в форму
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

const openPopupEditProfile = () => {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent; // при открытии попапа в полях будут записаны значения из HTML
  jobInput.value = jobProfile.textContent;
  // hideInputError(formElement, nameInput, {inputErrorClass:'popup__input_has-error', errorClass:'popup__error_opened'});
  // hideInputError(formElement, jobInput, {inputErrorClass:'popup__input_has-error', errorClass:'popup__error_opened'});
};

editButton.addEventListener('click', openPopupEditProfile); //обработчик клика по кнопке "редактировать профиль"

formElement.addEventListener('submit', formSubmitHandlerEditProfile); // обработчик события по нажатию на "сохранить"

// // функция рендеринга карточек
// const createCardDomNode = card => {
//   const cardTemplate = document.querySelector('#cardTemplate'); //находим наш шаблон
//   const cardTemplateElement = cardTemplate.content.querySelector('.element').cloneNode(true); //клонируем
//   const picture = cardTemplateElement.querySelector('.element__photo');
//   const text = cardTemplateElement.querySelector('.element__title');
//   text.textContent = card.name; // заполняем контентом
//   picture.src = card.link;
//   picture.alt = card.name;
//   picture.addEventListener("click", () => { //обработчик клика по фото на карточке, для открытия попапа
//     popupPhotoLink.src = picture.src;
//     popupPhotoLink.alt = text.textContent;
//     popupPhotoName.textContent = text.textContent;
//     openPopup(popupPicture);
//   });
//   likeCard(cardTemplateElement);
//   deleteCard(cardTemplateElement);

//   return cardTemplateElement;
// };

// // функция добавления карточек
// const createdCards = initialCards.map(card => createCardDomNode(card) ); // передаём элементы массива функции и вызываем её

// cardContainer.append(...createdCards); // добавление в разметку карточек

const openPopupAddCard = () => { // функция для открытия попапа добавления карточки (+)
  openPopup(popupElementCreateCards);
  titleInput.value = ''; //делаем поля пустыми при открытии попапа
  linkInput.value = '';
  // hideInputError(popupElementCreateCards, titleInput, {inputErrorClass:'popup__input_has-error', errorClass:'popup__error_opened'});
  // hideInputError(popupElementCreateCards, linkInput, {inputErrorClass:'popup__input_has-error', errorClass:'popup__error_opened'});
};

addButton.addEventListener('click', openPopupAddCard); // обработчик клика по кнопке (+)

// объявляем функцию сохраниния наших данных по кнопке "сохранить"
const formSubmitHandlerAddCard = evt => {
  evt.preventDefault();
  const newCardData = {
    name: titleInput.value,
    link: linkInput.value
  };
  addCard(newCardData);
  closePopup(popupElementCreateCards);
  // disabledButton(popupCreateCardButton); // вызываем функцию, которая отключит кнопку добавления карточки после её добавления на страницу
};

formElementCreateCards.addEventListener('submit', formSubmitHandlerAddCard); // обработчик клике по факту отправки формы

// // вызываем функцию, включающую валидацию форм, передаём в неё объект с конфигом (для универсальности)
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_has-error',
//   errorClass: 'popup__error_opened'
// });

const fillPopupFullScreenCard = (picture, text) => { // при клике на карточку - она откроется на весь экран и заполнит данные в разметке
  popupPhotoLink.src = picture.src;
  popupPhotoLink.alt = text.textContent;
  popupPhotoName.textContent = text.textContent;
}

const setPictureClickHandler = card => { // вешаем обработчики по клику на каждую карточку
  const picture = card.querySelector('.element__photo');
  const text = card.querySelector('.element__title');
  picture.addEventListener('click', () => {
    fillPopupFullScreenCard(picture, text);
    openPopup(popupPicture);
  })
}

const instruction = cardElement => setPictureClickHandler(cardElement); // задел на будущее, если инструкций будет много.

const addCard = cardData => {
  const cardList = new Card(cardData, '#cardTemplate', instruction); // передаём данные в класс
  const cardElement = cardList.createCard(); // используем публичный метод класса для создания карточек
  document.querySelector('.elements__list').prepend(cardElement);
}

initialCards.reverse().forEach(cardDataArray => addCard(cardDataArray)); // рендер изначального массива.
// чтобы не писать фунцию под рендер и под добавление новых карт из формы, решил перед проходом по изначальному
// массиву перевернуть его, чтобы prepend одинаково хорошо работал и для новых карт и для массива initialCards
