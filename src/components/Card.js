export default class Card {
  constructor({ data, templateSelector, handleCardClick, remove, like, dislike }) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._title = data.name;
    this.id = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._remove = remove;
    this._like = like;
    this._dislike = dislike;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLikes = this._element.querySelector('.card__like-number');
    this._likeButton = this._element.querySelector('.card__like');
    this._trashButton = this._element.querySelector('.card__trash');
    this._newLikes = this._likes;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _handleLike() {
    this._like(this).then((data) => {
      this._newLikes = data.likes;
      this._putLikesNumber(data.likes.length);
      this.fillMyLike();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleDislike() {
    this._dislike(this).then((data) => {
      this._newLikes = data.likes;
      this._putLikesNumber(data.likes.length);
      this._deleteMyLike();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  fillMyLike() {
    this._likeButton.classList.add('card__like_active');
  }

  _deleteMyLike() {
    this._likeButton.classList.remove('card__like_active');
  }

  _handleRemove() {
    this._remove(this);
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => {
      this._handleRemove();
    });

    this._likeButton.addEventListener('click', () => {

      if (!this._newLikes.some((elem) => {
        return elem._id === window.userInfo._id;
      })) {
        this._handleLike();
      } else {
        this._handleDislike();
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage, this._cardTitle);
    });
  }

  delete() {
    this._element.remove();
  }

  _getLikesNumber() {
    return this._likes.length;
  }

  _putLikesNumber(likesNumber) {
    this._cardLikes.textContent = likesNumber;
  }

  removeTrashButton() {
    this._trashButton.classList.add('card__trash_disabled');
  }

  createCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._putLikesNumber(this._getLikesNumber());
    this._setEventListeners();

    return this._element;
  }
}
