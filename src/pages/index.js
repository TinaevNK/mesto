// импорт
import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  editButton,
  formElementEditProfile,
  nameInput,
  jobInput,
  addButton,
  formElementCreateCards,
  initialCards,
  config
} from '../utils/constants.js';

const popupFullScreen = new PopupWithImage('#popup-picture'); // создаём экземпляр класса попапа на полный экран
popupFullScreen.setEventListeners();

const handleCardClick = data => popupFullScreen.open(data); // объявляем функцию, которая записываем значения в элементы попапа

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

// Денис, спасибо за быстрое и качественное ревью! Вы заставили задуматься!
// Надеюсь я правильно понял замечания, но в случае чего - готов сделать код ещё более чистым и правильным
// С праздниками Вас!

const popupAddCard = new PopupWithForm('#popup-create-card', data => {
  const newCard = new Card(data, '#cardTemplate', handleCardClick); // из данных полей создаём новый экземпляр карточки
  const newCardElement = newCard.createCard(); // отрисовываем карточку
  cardList.addItem(newCardElement);
  popupAddCard.close(); //закрываем попап после сабмита
});

popupAddCard.setEventListeners(); // ставим слушатели

// экземпляр класса, работающего с профилем пользователя
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector:'.profile__job'});

const popupEditProfile = new PopupWithForm('#popup-edit', data => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

const formValidators = {}; // объекты для валидации, первоначально - пустой массив. В него будем записывать нужные формы

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
});

editButton.addEventListener("click", () => { //обработчик клика по кнопке "редактировать профиль"
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;
  formValidators[formElementEditProfile.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupEditProfile.open();
});
