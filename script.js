const popup = document.querySelector('.popup');
const page = document.querySelector('.page');
const buttonClose = document.querySelector('.popup__close-button');
const popupButton = document.querySelector('.profile__edit-button');
const buttonSave = document.querySelector('.popup__save-button');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.getElementById('username');
const popupDescription = document.getElementById('description');

popupButton.addEventListener('click', openPopup);

function openPopup() {
    page.classList.add('page_popup-on');
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

buttonClose.addEventListener('click', closePopup);

function closePopup() {
    page.classList.remove('page_popup-on');
    popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', submitButtonReaction);

function submitButtonReaction (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}