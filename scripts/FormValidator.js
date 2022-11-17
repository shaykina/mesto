export default class FormValidator {
  constructor(validationObject, formSelector) {
    this._validationObject = validationObject;
    this._formSelector = document.querySelector(formSelector);
  }

  _showInputError(inputSelector, errorMessage) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationObject.errorClass);
  };

  _hideInputError(inputSelector) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._validationObject.inputErrorClass);
    errorElement.classList.remove(this._validationObject.errorClass);
    errorElement.textContent = '';
  };

  //метод сделан публичным, чтобы его можно было вызывать в index.js при открытии попапов
  checkInputValidity(inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some(function (inputSelector) {
      return !inputSelector.validity.valid;
    });
  }

  //метод сделан публичным, чтобы его можно было вызывать в index.js при открытии попапов
  toggleButtonState(inputList, submitButtonSelector) {
    if (this._hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(this._validationObject.inactiveButtonClass);
      submitButtonSelector.disabled = true;
    } else {
      submitButtonSelector.classList.remove(this._validationObject.inactiveButtonClass);
      submitButtonSelector.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._validationObject.inputSelector));
    const submitButtonSelector = this._formSelector.querySelector(this._validationObject.submitButtonSelector);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this.checkInputValidity(inputSelector);
        this.toggleButtonState(inputList, submitButtonSelector);
      });
    });
  };

  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
