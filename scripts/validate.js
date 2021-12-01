// валидация

// функция навешивания обработчиков
const setEventListeners = (formElementGeneral, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  formElementGeneral.addEventListener('submit', e => e.preventDefault());
  const inputList = Array.from(formElementGeneral.querySelectorAll(inputSelector));
  const buttonElement =  formElementGeneral.querySelector(submitButtonSelector);
  toggleButtonState(formElementGeneral, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElementGeneral, inputElement, { inputErrorClass, errorClass });
      toggleButtonState(formElementGeneral, buttonElement, inactiveButtonClass);
    })
  })
}

const checkInputValidity = (formElementGeneral, inputElement, { inputErrorClass, errorClass }) => {
  if (inputElement.validity.valid) {
    hideInputError(formElementGeneral, inputElement, { inputErrorClass, errorClass })
  }
  else {
    showInputError(formElementGeneral, inputElement, inputElement.validationMessage, { inputErrorClass, errorClass })
  }
};

const hideInputError = (formElementGeneral, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElementGeneral.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const showInputError = (formElementGeneral, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElementGeneral.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const toggleButtonState = (formElementGeneral, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElementGeneral.checkValidity();
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
  buttonElement.disabled = !isFormValid;
};


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error_opened'
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = config;
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
    const objParameters = { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass };
    setEventListeners(form, objParameters)
  })
}


