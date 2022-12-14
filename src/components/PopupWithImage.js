import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardFidcaption = this._popup.querySelector('.popup__fidcaption');
    this._cardBigImage = this._popup.querySelector('.popup__image');
  }

  open(cardImage, cardTitle) {
    super.open();

    this._cardFidcaption.textContent = cardTitle.textContent;
    this._cardBigImage.src = cardImage.src;
    this._cardBigImage.alt = cardTitle;
  }
}
