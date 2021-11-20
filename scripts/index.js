// объявляем переменные и константы

// ищем в документе наш попап
const popupElement = document.querySelector('#popup-edit');

// кнопка закрытия попапа
const closeButton = document.querySelector('#popup-edit__close-button');
// кнопка "редактировать профиль"
const editButton = document.querySelector('#profile__edit-button');

// ищем нашу форму
const formElement = document.querySelector('#popup-edit__form');
// её <input> с именем
const nameInput = formElement.querySelector('#name');
// её <input> с работой
const jobInput = formElement.querySelector('#job');

// ищем в документе поле с именем
const nameProfile = document.querySelector('.profile__name');
// ищем в документе поле с работой
const jobProfile = document.querySelector('.profile__job');

// объявляем функцию открытия поп-ап,а и добавляем модификатор
function openPopup() {

  popupElement.classList.add('popup_opened');

  // значение полей при открытии поп-па,а
  // запишет в поле то значение, которое было сохранено в HTML
  nameInput.value = nameProfile.textContent;

  jobInput.value = jobProfile.textContent;

}

// объявляем функцию закрытия поп-ап,а
function closePopup() {

  popupElement.classList.remove('popup_opened');

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


// рендеринг карточек

// первоначальный массив карточек для template
const initialCards = [
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

// находим шаблон
const cardTemplate = document.querySelector('#cardTemplate');
// находим контейнер, куда будем вставлять клоны шаблона
const cardContainer = document.querySelector('.elements__list');

// функция рендеринга карточек
const createCardDomNode = (card) => {
  const cardTemplateElement = cardTemplate.content.querySelector('.element').cloneNode(true); //клонируем
  cardTemplateElement.querySelector('.element__title').textContent = card.name; // заполняем контентом
  cardTemplateElement.querySelector('.element__photo').src = card.link;
  cardTemplateElement.querySelector('.element__photo').alt = card.name;

  return cardTemplateElement;
}

// функция добавления карточек
const addCard = initialCards.map((card) => { // перебираем массив и создаём новый
  return createCardDomNode(card); // передаём элементы массива функции и вызываем её
});

// добавление в разметку карточек
cardContainer.append(...addCard);
