import {FormValidator} from './FormValidator.js';
import { popupDescription, openPopup, closePopupByEscape} from './Utils.js';
import { Card } from './Card.js';

/* Общие классы */

const elements = document.querySelector('.elements'); // переменная для контейнера где хранятся все карточки
//const popup = document.querySelector('.popup');
//const popupContainer = document.querySelector('.popup__container');
//const popupCloseButton = document.querySelector('.popup__close-button'); // Кнопка закрытия любого Popup 

/* Блок Profile */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.querySelector('#popup-profile-form')

/* Popup редактирования профия */

const popupEditProfile = document.querySelector('#popup-edit-profile');
const openEditPopup = document.querySelector('.profile__edit-button'); // Открытие popup изменения профиля
//const buttonClose = document.querySelector('#close-edit-popup');
const popupName = document.querySelector('#username');
const popupForm = document.querySelector('#popup-profile-form');

/* Popup добавления карточки */

const openPopupNewCard = document.querySelector('.profile__add-button'); // Открытие popup новой карточки места
const popupNewCard = document.querySelector('#popup-new-card'); // Popup новой карточки места
//const buttonCloseCardPopup = document.querySelector('#close-card-popup');
const popupCardForm = document.querySelector('#popup-card-form'); // переменная формы с инпутами и кнопкой сохранить у PopUp-Card
const popupSubmitButton = document.querySelector('#popup-save-btn');
const popupCardTitle = document.querySelector('#title'); // переменная инпута текста PopUp-Card
const popupCardImage = document.querySelector('#image'); // переменная инпута картинки PopUp-Card
const template = document.querySelector('#template'); // переменная заготовки карточки

/* Popup модального окна картинки */


//const buttonCloseModalPopup = document.querySelector('#close-window-popup');
 

const popups = document.querySelectorAll('.popup'); // Для функции закрытия popup нажатием на фон

const settingsList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_unactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input_redline',
};

const editProfileValidator = new FormValidator(settingsList, profileForm)
const addCardValidator = new FormValidator(settingsList, popupCardForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

/* Закрыть popup кликом вне модального окна */

popups.forEach((popupCloseOverlay) => {
    popupCloseOverlay.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popupCloseOverlay);
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popupCloseOverlay);
        }
    });
});
    
/* //Закрыть popup на Escape 

function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}
*/

/* //Открытие PopUp-ов 

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
}
*/

/* Закрытие Popup-ов */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

/* Открыть Popup профиля + записать значения в инпуты из профиля */

openEditPopup.addEventListener('click', editPopupValue);  // Записывает значения из профиля в PopUp

function editPopupValue() {
    editProfileValidator.toggleButtonState();
    openPopup(popupEditProfile);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

/* Записать введенные значения из PopUp в профиль */

popupForm.addEventListener('submit', submitProfileButtonReaction);

function submitProfileButtonReaction(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupEditProfile);
}

const initialCards = [ // Массив
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

function render(renderCards) {
    renderCards.forEach(showCard); // Выбираем каждый из объект из массива и передаем значения функции showCard
}

render(initialCards); // Запускаем функцию

/* Вывести карточки из массива на страницу */

function showCard(data) {
    console.log(data)
    const card = new Card(data)

    card.createCard();

    elements.prepend(createCard(data));
}

/* Добавление новой карточки на страницу */

openPopupNewCard.addEventListener('click', addNewCard);

function addNewCard() {
    addCardValidator.toggleButtonState();
    openPopup(popupNewCard);
}

/* Добавление карточки из PopUp */
popupCardForm.addEventListener('submit', submitCardButtonReaction);

function submitCardButtonReaction(evt) {

    evt.preventDefault();

    const popupObject = {
        name: popupCardTitle.value,
        link: popupCardImage.value,
    };

    popupSubmitButton.setAttribute('disabled', true);
    popupSubmitButton.classList.add('popup__save-button_unactive');

    closePopup(popupNewCard);

    showCard(popupObject);

    evt.target.reset();
}