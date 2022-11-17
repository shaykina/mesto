export default class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._title = data.name;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _createPicture() {
    const cardFidcaption = document.querySelector('.popup__fidcaption');
    const cardBigImage = document.querySelector('.popup__image');
    cardFidcaption.textContent = this._title;
    cardBigImage.src = this._image;
    cardBigImage.alt = this._title;
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _setEventListeners(cardImage, showPopUp) {
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    const popupPicture = document.querySelector('.popup_picture');
    cardImage.addEventListener('click', () => {
      showPopUp(popupPicture);
      this._createPicture();
    });
  }


  createCard(showPopUp) {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._title;

    this._setEventListeners(cardImage, showPopUp);

    return this._element;
  }

}
