import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { editPopupBtn, addPopupBtn, nameInput, jobInput, validationObject } from '../utils/constants.js';
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

const editFormValidator = new FormValidator(validationObject, '.popup__edit-form');
const addFormValidator = new FormValidator(validationObject, '.popup__add-form');
const avatarFormValitor = new FormValidator(validationObject, '.popup__photo-form');

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValitor.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (formValues) => {
    editPopup.renderLoading(true);
    return api.saveNewUserInfo(formValues).then(() => {
      userInfo.setUserInfo(formValues);
    })
  }
});

const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_photo',
  handleFormSubmit: (formValues) => {
    avatarEditPopup.renderLoading(true);
    return api.uploadAvatar(formValues.photolink).then((res) => {
      userInfo.setAvatar({
        avatar: res.avatar
      })
    })
  }
})

const picturePopup = new PopupWithImage('.popup_picture');
const deletePopup = new PopupWithConfirmation('.popup_delete');

const avatarEditBtn = document.querySelector(userInfo._avatarSelector);

avatarEditBtn.addEventListener('click', () => {
  avatarEditPopup.open();
  avatarFormValitor.toggleButtonState();
})

editPopupBtn.addEventListener('click', () => {
  editPopup.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
  editFormValidator.clearErrors();
  editFormValidator.toggleButtonState();
});

avatarEditPopup.setEventListeners();
editPopup.setEventListeners();
picturePopup.setEventListeners();
deletePopup.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: 'f2e06461-a78f-4c1a-ae98-f26d720c075b',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo().then((user) => {
  window.userInfo = user;
  userInfo.setUserInfo({
    name: user.name,
    job: user.about
  });
  userInfo.setAvatar({
    avatar: user.avatar
  })

  api.getInitialCards().then((cards) => {
    const cardList = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
      }
    }, '.elements');

    cardList.rendererItems(cards.reverse());

    const addPopup = new PopupWithForm({
      popupSelector: '.popup_add',
      handleFormSubmit: (formValues) => {
        addPopup.renderLoading(true);
        return api.addNewCard(formValues).then((data) => {
          const newCardElement = createCard(data);
          cardList.addItem(newCardElement);
        })
      }
    });

    addPopupBtn.addEventListener('click', () => {
      addPopup.open();
      addFormValidator.toggleButtonState();
    });

    addPopup.setEventListeners();

    function isMe(elem) {
      return elem._id === user._id;
    }

    function createCard(item) {
      const card = new Card({
        data: item,
        templateSelector: '#card-template',
        handleCardClick: (cardImage, cardTitle) => {
          picturePopup.open(cardImage, cardTitle);
        },
        remove: () => {
          deletePopup.open({
            thisCard: card,
            handleDelete: () => { return api.deleteCard(card.id) }
          });
        },
        like: (card) => {
          return api.putLike(card.id)
        },
        dislike: (card) => {
          return api.deleteLike(card.id)
        }
      });

      const isMyLike = card.likes.some(isMe);
      if (isMyLike) {
        card.fillMyLike();
      }

      if (item.owner._id !== user._id) {
        card.removeTrashButton();
      }

      const cardElement = card.createCard();
      return cardElement
    }
  })
    .catch((err) => {
      console.log(err);
    });
})
  .catch((err) => {
    console.log(err);
  });
