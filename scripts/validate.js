const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formSelector, inputSelector, errorMessage, validationObject) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject.errorClass);
};

const hideInputError = (formSelector, inputSelector, validationObject) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector, validationObject) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, validationObject);
  } else {
    hideInputError(formSelector, inputSelector, validationObject);
  }
};

const setEventListeners = (formSelector, validationObject) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationObject.inputSelector));
  const submitButtonSelector = formSelector.querySelector(validationObject.submitButtonSelector);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector, validationObject);
      toggleButtonState(inputList, submitButtonSelector, validationObject);
    });
  });
};

function enableValidation(validationObject) {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector, validationObject);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputSelector) {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState(inputList, submitButtonSelector, validationObject) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(validationObject.inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove(validationObject.inactiveButtonClass);
    submitButtonSelector.disabled = false;
  }
}

enableValidation(validationObject);
