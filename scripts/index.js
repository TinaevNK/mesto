// попап редактирования профиля

const popupEditProfile = document.querySelector('#popup-edit'); // попап ред-ия профиля
const closeButtonEditProfile = popupEditProfile.querySelector('.popup__close-button_general'); // кнопка закрытия попапа ред-ия профиля
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
const cardContainer = document.querySelector('.elements__list'); // находим контейнер, куда будем вставлять клоны шаблона

// попап добавления карточек
const popupElementCreateCards = document.querySelector('#popup-create-card'); // находим попап с добавлением карточек
const closeButtonFormCards = popupElementCreateCards.querySelector('.popup__close-button_general'); // кнопка закрытия этого попапа
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки (+)
const formElementCreateCards = popupElementCreateCards.querySelector('#popup-create-card__form'); // ищем форму добавления карточек
const titleInput = formElementCreateCards.querySelector('#create-card__title'); // её <input> c названием карточки
const linkInput = formElementCreateCards.querySelector('#create-card__link'); // её <input> с ссылкой на карточку

// добавление просмотра картинки на весь экран
const popupPicture = document.querySelector('#popup-picture'); // ищем наш попап
const closeButtonPicture = popupPicture.querySelector('.popup__close-button_general'); //его кнопка закрытия
const popupPhotoLink = popupPicture.querySelector('.popup__photo'); // фото в попапе
const popupPhotoName = popupPicture.querySelector('.popup__photo-name'); //подпись к фото

// объявляем функцию открытия поп-ап,а и добавляем модификатор
const openPopup = popupWindow => popupWindow.classList.add('popup_opened');

// объявляем функцию закрытия поп-ап,а
const closePopup = popupWindow => popupWindow.classList.remove('popup_opened');

// объявляем функцию сохраниния наших данных по кнопке "сохранить"
const formSubmitHandlerEditProfile = evt => {
  evt.preventDefault(); // отмена значения по дефолту
  nameProfile.textContent = nameInput.value; // записываем в HTML значения введённые в форму
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//обработчик клика по кнопке "ред-ть профиль"
editButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent; // при открытии попапа в полях будут записаны значения из HTML
  jobInput.value = jobProfile.textContent;
} );

closeButtonEditProfile.addEventListener('click', () => closePopup(popupEditProfile) ); // обработчик клика по кнопке X

formElement.addEventListener('submit', formSubmitHandlerEditProfile); // обработчик события по нажатию на "сохранить"

// реализация лайка
const likeCard = cardTemplateElement => {
  cardTemplateElement.querySelector('.element__like-button').addEventListener('click', evt => evt.target.classList.toggle('element__like-button_active') );
};

// реализация удаления карточки
const deleteCard = cardTemplateElement => {
  cardTemplateElement.querySelector('.element__delete-button').addEventListener('click', () => cardTemplateElement.remove() );
};

// функция рендеринга карточек
const createCardDomNode = card => {
  const cardTemplate = document.querySelector('#cardTemplate'); //находим наш шаблон
  const cardTemplateElement = cardTemplate.content.querySelector('.element').cloneNode(true); //клонируем
  const picture = cardTemplateElement.querySelector('.element__photo');
  const text = cardTemplateElement.querySelector('.element__title');
  text.textContent = card.name; // заполняем контентом
  picture.src = card.link;
  picture.alt = card.name;
  picture.addEventListener("click", () => { //обработчик клика по фото на карточке, для открытия попапа
    popupPhotoLink.src = picture.src;
    popupPhotoLink.alt = text.textContent;
    popupPhotoName.textContent = text.textContent;
    openPopup(popupPicture);
  });
  likeCard(cardTemplateElement);
  deleteCard(cardTemplateElement);

  return cardTemplateElement;
};

// функция добавления карточек
const addCard = initialCards.map(card => createCardDomNode(card) ); // передаём элементы массива функции и вызываем её

cardContainer.append(...addCard); // добавление в разметку карточек

// обработчик клика по кнопке (+)
addButton.addEventListener('click', () => {
  openPopup(popupElementCreateCards);
  titleInput.value = ''; //делаем поля пустыми при открытии попапа
  linkInput.value = '';
} );

closeButtonFormCards.addEventListener('click', () => closePopup(popupElementCreateCards) ); // обработчик клика по кнопке "X"

// объявляем функцию сохраниния наших данных по кнопке "сохранить"
const formSubmitHandlerAddCard = evt => {
  evt.preventDefault();
  const inputNameValue = titleInput.value;
  const inputLinkValue = linkInput.value;
  const newCardName = createCardDomNode( {name: inputNameValue, link: inputLinkValue} ); // передаём новый элемент массива
  cardContainer.prepend(newCardName); //добавляем в начало массива новую карточку
  closePopup(popupElementCreateCards);
};

formElementCreateCards.addEventListener('submit', formSubmitHandlerAddCard); // обработчик клике по факту отправки формы

closeButtonPicture.addEventListener('click', () => closePopup(popupPicture) ); // обработчик клика по кнопке X попапа картинки на полный экран

// валидация

// функция навешивания обработчиков
const setEventListeners = (formElementGeneral) => {
  // const formElementGeneral = document.querySelector('.popup__form');
  formElementGeneral.addEventListener('submit', e => e.preventDefault());
  const inputList = Array.from(formElementGeneral.querySelectorAll('.popup__input'));
  const buttonElement =  formElementGeneral.querySelector('.popup__save-button');
  toggleButtonState(formElementGeneral, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElementGeneral, inputElement);
      toggleButtonState(formElementGeneral, buttonElement);
    })
  })
}

const checkInputValidity = (formElementGeneral, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElementGeneral, inputElement)
  }
  else {
    showInputError(formElementGeneral, inputElement, inputElement.validationMessage)
  }
};

const hideInputError = (formElementGeneral, inputElement) => {
  const errorElement = formElementGeneral.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_has-error');
  errorElement.classList.remove('popup__error_opened');
  errorElement.textContent = '';
};

const showInputError = (formElementGeneral, inputElement, errorMessage) => {
  const errorElement = formElementGeneral.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_has-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_opened');
};

const toggleButtonState = (formElementGeneral, buttonElement) => {
  const isFormValid = formElementGeneral.checkValidity();
  buttonElement.classList.toggle('popup__save-button_disabled', !isFormValid);
  buttonElement.disabled = !isFormValid;
};


const enableValidation = () => {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach(form => {
    setEventListeners(form)
  })
}

enableValidation();
