// импорт
import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import {
  editButton,
  formElementEditProfile,
  nameInput,
  jobInput,
  addButton,
  formElementCreateCards,
  initialCards,
  config,
  formValidators
} from './constants.js';

const popupFullScr = new PopupWithImage('#popup-picture'); // создаём экземпляр класса попапа на полный экран
popupFullScr.setEventListeners();

const handleCardClick = data => popupFullScr.open(data); // объявляем функцию, которая записываем значения в элементы попапа

// вставляем массив карточек в разметку
const cardList = new Section({
  items: initialCards.reverse(),
  renderer: cardData => {
    const card = new Card(cardData, '#cardTemplate', handleCardClick);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
},
'.elements__list'
);

cardList.renderItems(); // рендерим все карточки

const popupAddCard = new PopupWithForm(
  '#popup-create-card',  // передаём селектор попапа
  evt => { // колбэк по сабмиту
    evt.preventDefault();
    const data = { // получаем данные полей из массива
      name: popupAddCard._getInputValues()[0].value,
      link: popupAddCard._getInputValues()[1].value
    };
    const newCard = new Card(data, '#cardTemplate', handleCardClick); // из данных полей создаём новый экземпляр карточки
    const newCardElement = newCard.createCard(); // отрисовываем карточку
    cardList.addItem(newCardElement); // добавляем её в существующую разметку
    popupAddCard.close(); //закрываем попап после сабмита
  }
);

// экземпляр класса, работающего с профилем пользователя
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector:'.profile__job'});

const popupEditProfile = new PopupWithForm('#popup-edit', evt => { // попап редактирования профиля
  evt.preventDefault();
  const data = {
    name: popupEditProfile._getInputValues()[0].value,
    job: popupEditProfile._getInputValues()[1].value
  }
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});

// Включение валидации
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(formElement => { // проходимся по всем формам
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name'); // получаем данные из атрибута `name` у формы

    formValidators[formName] = validator; // вот тут в объект записываем под именем формы
    validator.enableValidation();
  });
};

enableValidation(config);

addButton.addEventListener('click', () => { // обработчик клика по кнопке (+)
  popupAddCard.open(); // открываем попап
  formValidators[formElementCreateCards.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupAddCard.setEventListeners();// ставим слушатели
});

editButton.addEventListener("click", () => { //обработчик клика по кнопке "редактировать профиль"
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;
  formValidators[formElementEditProfile.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupEditProfile.setEventListeners();
  popupEditProfile.open();
});
