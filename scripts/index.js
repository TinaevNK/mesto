// работа редактирования профиля

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

// находим контейнер, куда будем вставлять клоны шаблона
const cardContainer = document.querySelector('.elements__list');

// функция рендеринга карточек
const createCardDomNode = (card) => {
  const cardTemplate = document.querySelector('#cardTemplate'); //находим наш шаблон
  const cardTemplateElement = cardTemplate.content.querySelector('.element').cloneNode(true); //клонируем
  cardTemplateElement.querySelector('.element__title').textContent = card.name; // заполняем контентом
  cardTemplateElement.querySelector('.element__photo').src = card.link;
  cardTemplateElement.querySelector('.element__photo').alt = card.name;

  likeCard(cardTemplateElement);
  deleteCard(cardTemplateElement);
  openPopupPicture(cardTemplateElement);

  return cardTemplateElement;
}

// функция добавления карточек
const addCard = initialCards.map((card) => { // перебираем массив и создаём новый
  return createCardDomNode(card); // передаём элементы массива функции и вызываем её
});

// добавление в разметку карточек
cardContainer.append(...addCard);


// попап добавления новых карточек


// ищем в документе наш попап
const popupElementCreateCards = document.querySelector('#popup-create-card');

// кнопка закрытия попапа
const closeButtonFormCards = popupElementCreateCards.querySelector('#popup-create-card__close-button');
// кнопка добавления карточки (+)
const addButton = document.querySelector('.profile__add-button');

// ищем форму добавления карточек
const formElementCreateCards = popupElementCreateCards.querySelector('#popup-create-card__form');
// её <input> c названием карточки
const titleInput = formElementCreateCards.querySelector('#create-card__title');
// её <input> с ссылкой на карточку
const linkInput = formElementCreateCards.querySelector('#create-card__link');

// объявляем функцию открытия попапа с добавлением карточки
const openPopupCreateCard = () =>  popupElementCreateCards.classList.add('popup_opened');

// объявляем функцию закрытия поп-ап,а
const closePopupCreateCard = () => {
  popupElementCreateCards.classList.remove('popup_opened');
  titleInput.value = ''; //делаем поля пустыми по закрытию попапа
  linkInput.value = '';
}

// обработчик клика по кнопке (+)
addButton.addEventListener('click', openPopupCreateCard);
// обработчик клика по кнопке X
closeButtonFormCards.addEventListener('click', closePopupCreateCard);


// добавление новых карточек


// объявляем функцию сохраниния наших данных по кнопке "сохранить"
function formSubmitHandlerAddCard (evt) {

  evt.preventDefault();

  const inputNameValue = titleInput.value
  const inputLinkValue = linkInput.value
  const newCardName = createCardDomNode( {name: inputNameValue, link: inputLinkValue} );

  cardContainer.prepend(newCardName); //добавляем в начало массива новую карточку

  closePopupCreateCard()

}

// обработчик клике по факту отправки формы
formElementCreateCards.addEventListener('submit', formSubmitHandlerAddCard);


// реализация лайка
function likeCard (cardTemplateElement) {
  cardTemplateElement.querySelector('.element__like-button').addEventListener('click', evt => evt.target.classList.toggle('element__like-button_active'))
};

// реализация удаления карточки
function deleteCard (cardTemplateElement) {
  cardTemplateElement.querySelector('.element__delete-button').addEventListener('click', () => cardTemplateElement.remove())
};


// добавление просмотра картинки на весь экран


const popupPicture = document.querySelector('#popup-picture'); // ищем наш попап
const closeButtonPicture = popupPicture.querySelector('#popup-photo__close-button'); //его кнопка закрытия
const popupPhotoLink = popupPicture.querySelector('.popup__photo'); // фото в попапе
const popupPhotoName = popupPicture.querySelector('.popup__photo-name'); //подпись к фото

// функция открытия попапа
function openPopupPicture(element) {
  const picture = element.querySelector(".element__photo");
  const text = element.querySelector(".element__title");
  picture.addEventListener("click", () => {
    popupPhotoLink.src = picture.src;
    popupPhotoLink.alt = text.textContent;
    popupPhotoName.textContent = text.textContent;
    popupPicture.classList.add('popup_opened');
  })
}

// объявляем функцию закрытия поп-ап,а
const closePopupPicture = () => popupPicture.classList.remove('popup_opened');

// обработчик клика по кнопке X
closeButtonPicture.addEventListener('click', closePopupPicture);


// разместил функционал по блокам, разделил комментариями
// обсуловлено тем, чтобы куча переменных/функций не были в одном месте разом
// не знаю, правильно это или нет, но решил сделать так:)
