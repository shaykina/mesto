let edit = document.querySelector('.button_edit');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__close');

function showPopUp() {
  popup.classList.add('popup_opened');
}

function hidePopUp() {
  popup.classList.remove('popup_opened');
}

edit.addEventListener('click', showPopUp);
close.addEventListener('click', hidePopUp);

let formName = popup.querySelector('#name');
let currentName = document.querySelector('.profile__name').textContent;

formName.setAttribute('value', currentName);

let formJob = popup.querySelector('#job');
let currentJob = document.querySelector('.profile__job').textContent;

formJob.setAttribute('value', currentJob);

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newNameValue = nameInput.value;
  let newJobValue = jobInput.value;
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job')
  profileName.textContent = newNameValue;
  profileJob.textContent = newJobValue;
}

formElement.addEventListener('submit', formSubmitHandler);
