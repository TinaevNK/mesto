// валидация форм

// функция для скрытия ошибок
const hideInputError = (formElementGeneral, inputElement, config) => {
  const { inputErrorClass, errorClass } = config // деструктуризируем объяект со свойствами
  const errorElement = formElementGeneral.querySelector(`#${inputElement.id}-error`); // находим инпут с ошибкой
  inputElement.classList.remove(inputErrorClass); // удаляем класс "ошибочного поля"
  errorElement.classList.remove(errorClass); // удаляем класс ошибки
  errorElement.textContent = ''; // удаляем текст ошибки
};

// функция для показа ошибок
const showInputError = (inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = inputElement.closest('.popup__form').querySelector(`#${inputElement.id}-error`); // ищем span с ошибкой
  inputElement.classList.add(inputErrorClass); // добавим класс ошибки полю
  errorElement.textContent = inputElement.validationMessage; // текст сообщения оставляем стандартным
  errorElement.classList.add(errorClass); // добавим стилизационный класс ошибке
};

// функция проверки валидна форма или нет
const checkInputValidity = (formElementGeneral, inputElement, config) => {
  if (inputElement.validity.valid) { // если валидна - скроем ошибки
    hideInputError(formElementGeneral, inputElement, config);
  } else { // если невалидна - подсветим ошибки
    showInputError(inputElement, config);
  };
};

// функция смены состояния кнопки сабмита формы
const toggleButtonState = (formElementGeneral, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElementGeneral.checkValidity(); // "чекаем" валидна ли форма
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid); // если невалидна - отключаем кнопку. И наоборот
  buttonElement.disabled = !isFormValid; // если невалидна - добавляем кнопке класс. И наоборот
};

// функция навешивания обработчиков
const setEventListeners = (formElementGeneral, config) => {
  // разбиваем наши props(config) на составляющие, чтобы далее передать по коду
  const { inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass } = config;
  const inputList = Array.from(formElementGeneral.querySelectorAll(inputSelector)); // находим все поля формы и делаем из них массив
  const buttonElement =  formElementGeneral.querySelector(submitButtonSelector); // ищем кнопку сабмита
  toggleButtonState(formElementGeneral, buttonElement, inactiveButtonClass); // делаем кнопку неактивной, при открытии страницы
  inputList.forEach((inputElement) => { //слушатель на ввод в поля(инпуты)
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElementGeneral, inputElement, { inputErrorClass, errorClass }); // проверяем валидно ли
      toggleButtonState(formElementGeneral, buttonElement, inactiveButtonClass); // если валидно то уберём ошибки, если нет - подсветим их
    });
  });
};

// функция включения валидации по всем формам на странице
const enableValidation = (config) => {
  const { formSelector, ...props} = config; // извлекаем formSelector, а остальные свойства помещаем в объект props.
  const forms = Array.from(document.querySelectorAll(formSelector)); // ищем все формы и делаем из них массив
  forms.forEach(form => { // проходимся по массиву и выделяем отдельные формы
    form.addEventListener('submit', evt => evt.preventDefault()); // отменяем действие по умолчанию у события submit каждой формы
    setEventListeners(form, props); //объект props передаём дальше и вызываем функцию
  });
};
