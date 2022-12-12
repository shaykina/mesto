import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(cardImage, cardTitle) {
    super.open();

    this._cardFidcaption.textContent = cardTitle.textContent;
    this._cardBigImage.src = cardImage.src;
    this._cardBigImage.alt = cardTitle;
  }
}
