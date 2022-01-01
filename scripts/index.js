// импорт классов
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

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

// добавление просмотра картинки на весь экран
const popupPicture = document.querySelector('#popup-picture'); // ищем наш попап
const popupPhotoLink = popupPicture.querySelector('.popup__photo'); // фото в попапе
const popupPhotoName = popupPicture.querySelector('.popup__photo-name'); //подпись к фото
const allPopups = Array.from(document.querySelectorAll('.popup')); // создаём массив из всех попапов
const cardContainer = document.querySelector('.elements__list');

// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_has-error',
//   errorClass: 'popup__error_opened'
// };

// const formValidators = {};

// // Включение валидации
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector))
//   formList.forEach((formElement) => { // проходимся по всем формам
//     const validator = new FormValidator(config, formElement);
//     const formName = formElement.getAttribute('name'); // получаем данные из атрибута `name` у формы

//     formValidators[formName] = validator; // вот тут в объект записываем под именем формы
//     validator.enableValidation();
//   });
// };

// enableValidation(config);

// allPopups.forEach((popup) => { // проходимся по всем попапам
//   popup.addEventListener('click', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) { // если кликнутый элемент содержит написанный класс - закрой попап
//         closePopup(popup) // закрытие по оверлею
//       };
//       if (evt.target.classList.contains('popup__close-button_general')) {
//         closePopup(popup) // закрытие по кнопке "Х"
//       };
//   });
// });

// const setExitPopupByEsc = evt => { // колбэк для закрытия попапа по клавише Escape
//   if (evt.key ==="Escape") {
//     closePopup(document.querySelector(".popup_opened"));
//   };
// };

// const openPopup = popupWindow => { // объявляем функцию открытия попапа и добавляем модификатор
//   popupWindow.classList.add('popup_opened');
//   document.addEventListener('keydown', setExitPopupByEsc); // добавляем слушатель по клавише Esc при открытии попапа
// };

// const closePopup = popupWindow => { // объявляем функцию закрытия попапа
//   document.removeEventListener('keydown', setExitPopupByEsc); // удаляем слушатель перед закрытием попапа
//   popupWindow.classList.remove('popup_opened');
// };

// const handleProfileFormSubmit = evt => { // объявляем функцию сохраниния наших данных по кнопке "сохранить"
//   evt.preventDefault(); // отмена значения по дефолту
//   nameProfile.textContent = nameInput.value; // записываем в HTML значения введённые в форму
//   jobProfile.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// };

// const openPopupEditProfile = () => { // функция открытия попапа открытия редактирования профиля
//   nameInput.value = nameProfile.textContent; // при открытии попапа в полях будут записаны значения из HTML
//   jobInput.value = jobProfile.textContent;
//   formValidators[formElementEditProfile.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
//   openPopup(popupEditProfile);
// };

// const openPopupAddCard = () => { // функция открытия попапа открытия добавления карточки
//   titleInput.value = ''; //делаем поля пустыми при открытии попапа
//   linkInput.value = '';
//   formValidators[formElementCreateCards.getAttribute('name')].resetValidation();
//   openPopup(popupElementCreateCards);
// };

// const handleAddCardFormSubmit = evt => { // объявляем функцию сохраниния наших данных по кнопке "сохранить"
//   evt.preventDefault();
//   const newCardData = { // записываем в объект значения инпутов и передаём его в функцию добавления карточки
//     name: titleInput.value,
//     link: linkInput.value
//   };
//   addCard(newCardData);
//   closePopup(popupElementCreateCards);
// };

// const handleCardClick = (title, image) => {  // объявляем функцию, которая записываем значения в элементы попапа
//   popupPhotoLink.src = image;
//   popupPhotoLink.alt = image;
//   popupPhotoName.textContent = title;
//   openPopup(popupPicture);
// };

// отключил тут

// const createCard = cardData => { // создаём элемент карточки
//   const cardElement = new Card(cardData, '#cardTemplate', handleCardClick).createCard();
//   return cardElement;
// };

// const addCard = cardData => { // добавляем элемент карточки
//   const cardElement = createCard(cardData);
//   cardContainer.prepend(cardElement);
// };

// initialCards.reverse().forEach(cardDataArray => addCard(cardDataArray)); // рендер изначального массива.


// editButton.addEventListener('click', openPopupEditProfile); //обработчик клика по кнопке "редактировать профиль"
// formElementEditProfile.addEventListener('submit', handleProfileFormSubmit); // обработчик события по нажатию на "сохранить"
// addButton.addEventListener('click', openPopupAddCard); // обработчик клика по кнопке (+)
// formElementCreateCards.addEventListener('submit', handleAddCardFormSubmit); // обработчик клике по факту отправки формы


const handleCardClick = (title, image) => {  // объявляем функцию, которая записываем значения в элементы попапа
  popupPhotoLink.src = image;
  popupPhotoLink.alt = image;
  popupPhotoName.textContent = title;
  // popupEdit.open();
};


// вставляем массив карточек в разметку
const cardList = new Section({
  items: initialCards.reverse(),
  renderer: cardData => {
    const card = new Card(cardData, "#cardTemplate", handleCardClick);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
},
".elements__list"
)

// рендерим все карточки разом
cardList.renderItems();

