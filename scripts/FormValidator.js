export {FormValidator};
// валидация форм
class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  };

  _toggleButtonState() {
    const isFormValid = this._form.checkValidity(); // "чекаем" валидна ли форма
    this._submitButton.classList.toggle(this._config.inactiveButtonClass, !isFormValid); // если невалидна - отключаем кнопку. И наоборот
    this._submitButton.disabled = !isFormValid; // если невалидна - добавляем кнопке класс. И наоборот
  };

  _hideInputError = inputElement => { // метод для скрытия ошибок
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`); // ищем span с ошибкой
    inputElement.classList.remove(this._config.inputErrorClass); // удаляем класс "ошибочного поля"
    errorElement.classList.remove(this._config.errorClass); // удаляем класс ошибки
    errorElement.textContent = ''; // удаляем текст ошибки
  };

  _showInputError = inputElement => { // метод для показа ошибок
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`); // ищем span с ошибкой
    inputElement.classList.add(this._config.inputErrorClass); // добавим класс ошибки полю
    errorElement.textContent = inputElement.validationMessage; // текст сообщения оставляем стандартным
    errorElement.classList.add(this._config.errorClass); // добавим стилизационный класс ошибке
  };

  _checkInputValidity = inputElement => { // метод проверки валиден инпут или нет
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement); // если валиден - скроем ошибки
    } else {
      this._showInputError(inputElement); // если невалиден - подсветим ошибки
    };
  };

  _setEventListeners = () => { // вешаем обработчики на форму
    this._inputList.forEach(inputElement => { // ищем все инпуты формы
      inputElement.addEventListener('input', () => { // вешаем обработчики на инпуты
        this._checkInputValidity(inputElement); // проверяем валидны ли поля
        this._toggleButtonState(); // если валидно - уберём ошибки, и наоборот
      });
    });
  };

  resetValidation() {
    this._toggleButtonState(); // управление кнопкой сабмита
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  enableValidation() { // метод включения валидации формы
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};
