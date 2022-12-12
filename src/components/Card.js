export default class Card {
  constructor( {data, templateSelector, handleCardClick} ) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _setEventListeners(cardImage, cardTitle) {
    this._likeButton = this._element.querySelector('.card__like');
    this._trashButton = this._element.querySelector('.card__trash');

    this._trashButton.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    cardImage.addEventListener('click', () => {
      this._handleCardClick(cardImage, cardTitle);
    });
  }

  createCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    cardTitle.textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._title;

    this._setEventListeners(cardImage, cardTitle);

    return this._element;
  }
}
