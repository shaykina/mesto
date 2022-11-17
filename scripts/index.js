import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const editPopupBtn = document.querySelector('.profile__edit-button');
const addPopupBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job')
const profileForm = document.forms["edit-form"];
const cardForm = document.forms["add-form"];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const cardContainer = document.querySelector('.elements');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeLink = document.querySelector('.popup__input_type_link');
const popups = document.querySelectorAll('.popup');
const cardFidcaption = document.querySelector('.popup__fidcaption');
const cardBigImage = document.querySelector('.popup__image');
const popupPicture = document.querySelector('.popup_picture');

export {cardFidcaption, cardBigImage, popupPicture};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const editFormValidator = new FormValidator(validationObject, '.popup__edit-form');
const addFormValidator = new FormValidator(validationObject, '.popup__add-form');

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleEscapeClick(evt) {
  if (evt.key === 'Escape') {
    hidePopUp(document.querySelector('.popup_opened'));
  }
}

function showPopUp(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeClick);
}

function hidePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeClick);
}

function addCard(item) {
  const card = new Card(item, '#card-template', showPopUp);
  const cardElement = card.createCard(showPopUp);
  cardContainer.prepend(cardElement);
}

function showCards() {
  initialCards.forEach((item) => addCard(item));
}

showCards();

editPopupBtn.addEventListener('click', () => {
  showPopUp(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.clearErrors();
  editFormValidator.toggleButtonState();
});

addPopupBtn.addEventListener('click', () => {
  showPopUp(popupAdd);
  addFormValidator.toggleButtonState();
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      hidePopUp(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      hidePopUp(popup);
    }
  })
})

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  addCard({
    name: placeName.value,
    link: placeLink.value
  });
  evt.target.reset()
  hidePopUp(popupAdd);
}

cardForm.addEventListener('submit', handleNewCardSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newNameValue = nameInput.value;
  const newJobValue = jobInput.value;
  profileName.textContent = newNameValue;
  profileJob.textContent = newJobValue;
  hidePopUp(popupEdit);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);


