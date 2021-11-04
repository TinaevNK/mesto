// объявляем переменные и константы

// ищем в документе наш попап
const popupElement = document.querySelector('.popup');
// кнопка закрытия попапа
const closeButton = document.querySelector('.popup__close-button');
// кнопка "редактировать профиль"
const editButton = document.querySelector('.profile__edit-button');
// ищем нашу форму
const formElement = document.querySelector('.popup__form');
// её поле c именем
const nameInput = formElement.querySelector('#name');
// её полен с работой
const jobInput = formElement.querySelector('#job');
// ищем в документе <input> с именем
const nameProfile = document.querySelector('.profile__name');
// ищем в документе <input> с работой
const jobProfile = document.querySelector('.profile__job');


// объявляем функцию открытия поп-ап,а и добавляем модификатор
function openPopup() {

  popupElement.classList.add('popup_opened');

}

// объявляем функцию закрытия поп-ап,а
function closePopup() {

  popupElement.classList.remove('popup_opened');

  // значение полей при закрытии попапа по кнопке X запишет
  // в поле то значение, которое было сохранено в HTML
  nameInput.value = nameProfile.textContent;

  jobInput.value = jobProfile.textContent;

}

// объявляем функцию сохраниния наших данных по кнопке "сохранить"
function formSubmitHandler (evt) {

  evt.preventDefault();

  // меняем значение в HTML на то, что мы пишем в полях
  nameProfile.textContent = nameInput.value;

  jobProfile.textContent = jobInput.value;

  // вызываем функцию закрытия поп-ап,а
  closePopup();

}

// обработчик клика по кнопке "редактировать профиль"
editButton.addEventListener('click', openPopup);
// обработчик клика по кнопке X
closeButton.addEventListener('click', closePopup);
// обработчик события отправки данных на сервер, в нашем случае при нажатии
// кнопки "сохранить", т.к. её type=submit
formElement.addEventListener('submit', formSubmitHandler);
