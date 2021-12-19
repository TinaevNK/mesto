export {FormValidator};
// валидация форм
class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  };

  clearErrors() { // метод очищения ошибок
    this._inputList.forEach(inputElement => {
      const errorElement = this._form.querySelectorAll(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.forEach(errorElementSpan => {
        errorElementSpan.classList.remove(this._config.errorClass);
        errorElementSpan.textContent = '';
      });
    });
  };

  _enableBtn() { // метод включения кнопки сабмита формы
    this._submitButton.
    classList.
    remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  disableBtn() { // метод отключения кнопки сабмита формы
    this._submitButton.
    classList.
    add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  };

  _toggleButtonState = () => { // метод смены состояния кнопки сабмита формы
    const isFormValid = this._form.checkValidity(); // "чекаем" валидна ли форма
    isFormValid ? this._enableBtn() : this.disableBtn(); // если валидна - включаем кнопку сабмита и наоборот
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
    this.disableBtn(); // деактивируем кнопку сабмита при загрузке страницы
    this._inputList.forEach(inputElement => { // ищем все инпуты формы
      inputElement.addEventListener('input', () => { // вешаем обработчики на инпуты
        this._checkInputValidity(inputElement); // проверяем валидны ли поля
        this._toggleButtonState(); // если валидно - уберём ошибки, и наоборот
      });
    });
  };

  enableValidation() { // метод включения валидации формы
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};
