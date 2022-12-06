import Popup from './Popup.js';

const cardFidcaption = document.querySelector('.popup__fidcaption');
const cardBigImage = document.querySelector('.popup__image');

export default class PopupWithImage extends Popup {
  open(cardImage, cardTitle) {
    document.querySelector(this._popupSelector).classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    cardFidcaption.textContent = cardTitle.textContent;
    cardBigImage.src = cardImage.src;
    cardBigImage.alt = cardTitle;
  }
}
