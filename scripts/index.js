let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job')
let formElement = document.querySelector('.popup__edit-form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

function showPopUp() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function hidePopUp() {
  popup.classList.remove('popup_opened');
}

edit.addEventListener('click', showPopUp);
close.addEventListener('click', hidePopUp);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newNameValue = nameInput.value;
  let newJobValue = jobInput.value;
  profileName.textContent = newNameValue;
  profileJob.textContent = newJobValue;
  hidePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);
