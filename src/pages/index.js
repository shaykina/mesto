import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { editPopupBtn, addPopupBtn, nameInput, jobInput, placeName, placeLink, initialCards, validationObject } from '../utils/constants.js';

const editFormValidator = new FormValidator(validationObject, '.popup__edit-form');
const addFormValidator = new FormValidator(validationObject, '.popup__add-form');

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput, jobInput);
  }
});

const newCard = new Section({
  items: [{
    name: placeName.value,
    link: placeLink.value
  }],
  renderer: () => {
    const card = new Card({
      data: {
        name: placeName.value,
        link: placeLink.value
      },
      templateSelector: '#card-template',
      handleCardClick: (cardImage, cardTitle) => {
        picturePopup.open(cardImage, cardTitle);
      }
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.elements');

const addPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: () => {
    newCard.rendererItems();
  }
});

const picturePopup = new PopupWithImage('.popup_picture');

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      templateSelector: '#card-template',
      handleCardClick: (cardImage, cardTitle) => {
        picturePopup.open(cardImage, cardTitle);
      }
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.rendererItems();

editPopupBtn.addEventListener('click', () => {
  editPopup.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editFormValidator.clearErrors();
  editFormValidator.toggleButtonState();
});

addPopupBtn.addEventListener('click', () => {
  addPopup.open();
  addFormValidator.toggleButtonState();
});

addPopup.setEventListeners();
editPopup.setEventListeners();
picturePopup.setEventListeners();
