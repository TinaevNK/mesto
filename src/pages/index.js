// импорты
import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
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
} from '../utils/constants.js';

const api = new Api({ // создаём экземляр класса работающего с API сервера
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '19e0a0be-b386-40fd-af16-51b037973d07',
    'Content-Type': 'application/json'
  }
});

api.renderUserAndCards() // рендерим данные с сервера в mesto
  .then(([user, data]) => {
    userInfo.setUserInfo({  name: user.name, about: user.about, avatar: user.avatar});
    cardList.renderCards({ cards: data, userId: user._id, insertMethod: 'append'})
  })
  .catch(err => console.log(err)); // в случае реджекта верни ошибку

const popupFullScreen = new PopupWithImage('#popup-picture'); // создаём экземпляр класса попапа на полный экран
popupFullScreen.setEventListeners();

const handleCardClick = data => popupFullScreen.open(data); // объявляем функцию, которая записываем значения в элементы попапа

// вставляем массив карточек в разметку
const cardList = new Section({
  renderer: data => {
    cardList.addItem(createNewCard(data.card, data.userId), data.insertMethod);
  }
},
'.elements__list'
);

// создаём экземпляр класса отвечающий за попап удаления карточки
const popupDeleteCard = new PopupWithConfirm('#popup-delete-card', cardData => {
  deleteCardsButton.textContent = 'Удаление...';
  api.deleteCard(cardData.data)
    .then(() => {
      cardData.element.remove();
      cardData.element = null;
      popupDeleteCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => deleteCardsButton.textContent = 'Да')
});

popupDeleteCard.setEventListeners();

// создаём экземпляр класса отвечающий за попап добавления карточек
const popupAddCard = new PopupWithForm('#popup-create-card', (data, submitButton) => {
  submitButton.textContent = 'Создание...';
  api.addCard(data)
    .then(card => {
      cardList.addItem(createNewCard(card));
      popupAddCard.close(); //закрываем попап после сабмита
    })
    .catch(err => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Создать'
    })
});

popupAddCard.setEventListeners(); // ставим слушатели

// создаём экземпляр класса отвечающий за попап редактирования аватара
const popupEditAvatar = new PopupWithForm('#popup-avatar', (data, submitButton) => {
  submitButton.textContent = 'Сохранить...';
  api.setUserAvatar(data)
    .then(data => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`
      popupEditAvatar.close(); //закрываем попап после сабмита
    })
    .catch(err => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
});

popupEditAvatar.setEventListeners(); // ставим слушатели

const createNewCard = (data, userId) => { // функция создания новой карточки, чтобы три раза одно и тоже не писать
  const newCard = new Card(data, '#cardTemplate', handleCardClick, handleLikeSet, handleLikeDelete, handleCardDelete, userId);
  return newCard.createCard();
};

const handleCardDelete = element => popupDeleteCard.open(element);

const handleLikeSet = (cardData, evt) => { // колбэк для отправки лайка на сервер
  api.setLike(cardData.data)
    .then(res => {
      cardData.counterLikes.textContent = res.likes.length;
      evt.target.classList.add('element__like-button_active');
    })
    .catch(err => console.log(err))
};

const handleLikeDelete = (cardData, evt) => { // колбэк для удаления лайка с сервера
  api.deleteLike(cardData.data)
    .then(res => {
      cardData.counterLikes.textContent = res.likes.length;
      evt.target.classList.remove('element__like-button_active');
    })
    .catch(err => console.log(err))
};

// экземпляр класса, работающего с профилем пользователя
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: ".profile__avatar"});

const popupEditProfile = new PopupWithForm('#popup-edit', (data, submitButton) => {
  submitButton.textContent = 'Сохранение...';
  api.setUserInfo(data)
    .then(data => {userInfo.setUserInfo(data)})
    .then(() => popupEditProfile.close())
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Сохранить')
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
  jobInput.value = profileInfo.about;
  formValidators[formElementEditProfile.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupEditProfile.open();
});

profileAvatar.addEventListener("click", () => { //обработчик клика по аватару
  formValidators[formElementAvatar.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupEditAvatar.open();
});
