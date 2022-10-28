const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPicture = document.querySelector('.popup_picture');
const editPopupBtn = document.querySelector('.profile__edit-button');
const addPopupBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job')
const profileForm = document.forms["edit-form"];
const cardForm = document.forms["add-form"];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const cardContainer = document.querySelector('.elements');
const cardFidcaption = document.querySelector('.popup__fidcaption');
const cardBigImage = document.querySelector('.popup__image');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeLink = document.querySelector('.popup__input_type_link');

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

function openPicture(pictureName, pictureLink) {
  cardFidcaption.textContent = pictureName;
  cardBigImage.src = pictureLink;
  cardBigImage.alt = pictureName;
}

function createCard(placeNameValue, placeLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = placeNameValue;
  cardImage.src = placeLinkValue;
  cardImage.alt = placeNameValue;

  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  })

  cardElement.querySelector('.card__trash').addEventListener('click', () => {
    cardElement.remove();
  })

  cardImage.addEventListener('click', function (evt) {
    showPopUp(popupPicture);
    openPicture(evt.target.nextElementSibling.firstElementChild.textContent, evt.target.src);
  })

  return cardElement
}

function addCard(placeNameValue, placeLinkValue) {
  const cardElement = createCard(placeNameValue, placeLinkValue)
  cardContainer.prepend(cardElement);
}

function showCards() {
  initialCards.forEach(function (item) {
    addCard(item.name, item.link);
  });
}

showCards();

editPopupBtn.addEventListener('click', () => {
  showPopUp(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addPopupBtn.addEventListener('click', () => showPopUp(popupAdd));

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => hidePopUp(popup));
});

document.addEventListener('click', (evt) => {
  const popup = evt.target.closest('.popup');
  const popupContainer = popup.querySelector('.popup__container');
  const popupPictureContainer = popup.querySelector('.popup__figure');
  // для попапов редактирования и удаления существует popupContainer и клик должен быть не по нему, для увеличенной картинки - аналогично с popupPictureContainer
  if ((popupContainer && !popupContainer.contains(evt.target)) || (popupPictureContainer && !popupPictureContainer.contains(evt.target))) {
    hidePopUp(popup);
  }
});

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  addCard(placeName.value, placeLink.value);
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
