import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = document.querySelector(this._popupSelector).querySelector('.popup__submit');
  }

  open({thisCard, handleDelete}) {
    super.open();
    this._card = thisCard;
    this._handleDelete = handleDelete;
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDelete().then(() => {
        this._card.delete();
      })
      .catch((err) => {
        console.log(err);
      })

      this.close();
    })
  }
}
