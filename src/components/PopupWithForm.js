import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._button = this._popup.querySelector('.popup__submit');
    this._submitBtnText = this._button.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.renderLoading(false);
        })
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._submitBtnText;
    }
  }
}
