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
  handleFormSubmit: (formValues) => {
    userInfo.setUserInfo(formValues);
  }
});

function createCard(item) {
  const card = new Card({
  data: item,
  templateSelector: '#card-template',
  handleCardClick: (cardImage, cardTitle) => {
    picturePopup.open(cardImage, cardTitle);
  }
});
const cardElement = card.createCard();
return cardElement
}

const picturePopup = new PopupWithImage('.popup_picture');

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.rendererItems();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (formValues) => {
    const newCardElement = createCard(formValues);
    cardList.addItem(newCardElement);
  }
});

editPopupBtn.addEventListener('click', () => {
  editPopup.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
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
