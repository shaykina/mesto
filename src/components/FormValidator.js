export default class FormValidator {
  constructor(validationObject, formSelector) {
    this._validationObject = validationObject;
    this._formSelector = document.querySelector(formSelector);
    this._submitButton = this._formSelector.querySelector(this._validationObject.submitButtonSelector);
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._validationObject.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationObject.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationObject.inputErrorClass);
    errorElement.classList.remove(this._validationObject.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  clearErrors() {
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
    });
  }

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  //метод сделан публичным, чтобы его можно было вызывать в index.js при открытии попапов
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._validationObject.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._validationObject.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
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
