const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPicture = document.querySelector('.popup_picture');
const closeEditBtn = document.querySelector('.popup__close');
const closeAddBtn = popupAdd.querySelector('.popup__close');
const closePictureBtn = popupPicture.querySelector('.popup__close');
const makeBtn = popupAdd.querySelector('.popup__submit_make');
const edit = document.querySelector('.profile__edit-button');
const add = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job')
const formElement = document.querySelector('.popup__edit-form');
const addFormElement = document.querySelector('.popup__add-form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const cardContainer = document.querySelector('.elements');
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

function deleteCard() {
  const deleteButtons = document.querySelectorAll('.card__trash');
  deleteButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      const card = item.closest('.card');
      card.remove();
    });
  })
}

function showPopUp(popup) {
  popup.classList.add('popup_opened');
}

function hidePopUp(popup) {
  popup.classList.remove('popup_opened');
}

function openPicture(pictureName, pictureLink) {
  document.querySelector('.popup__fidcaption').textContent = pictureName;
  document.querySelector('.popup__image').src = pictureLink;
}

function makePicturePopup() {
  const pictures = document.querySelectorAll('.card__image');
  pictures.forEach(function (item) {
    item.addEventListener('click', () => showPopUp(popupPicture));
    item.addEventListener('click', (evt) => openPicture(evt.target.nextElementSibling.firstElementChild.textContent, evt.target.src))
  })
}

function addCard(placeNameValue, placeLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = placeNameValue;
  cardElement.querySelector('.card__image').src = placeLinkValue;
  cardElement.querySelector('.card__image').alt = placeNameValue;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  })
  cardContainer.prepend(cardElement);
  deleteCard();
  makePicturePopup();
}

function showCards() {
  initialCards.forEach(function (item) {
    addCard(item.name, item.link);
  });
}

showCards();

edit.addEventListener('click', () => showPopUp(popupEdit));
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

add.addEventListener('click', () => showPopUp(popupAdd));

function closePopup(button, popup) {
  button.addEventListener('click', () => hidePopUp(popup));
}

closePopup(closeEditBtn, popupEdit);
closePopup(closeAddBtn, popupAdd);
closePopup(closePictureBtn, popupPicture);

function formMakeHandler(evt) {
  evt.preventDefault();
  const placeName = document.querySelector('.popup__input_type_place-name');
  const placeLink = document.querySelector('.popup__input_type_link');
  addCard(placeName.value, placeLink.value);
  placeName.value = "";
  placeLink.value = "";
  hidePopUp(popupAdd);
}

addFormElement.addEventListener('submit', formMakeHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newNameValue = nameInput.value;
  let newJobValue = jobInput.value;
  profileName.textContent = newNameValue;
  profileJob.textContent = newJobValue;
  hidePopUp(popupEdit);
}

formElement.addEventListener('submit', formSubmitHandler);
