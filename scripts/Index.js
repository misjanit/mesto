import { FormValidator } from './FormValidator.js';
import { initialCards, settingsList } from './Utils.js';
import { Card } from './Card.js';

/* Общие классы */

const elements = document.querySelector('.elements'); // переменная для контейнера где хранятся все карточки

/* Блок Profile */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.querySelector('#popup-profile-form')

/* Popup редактирования профия */

const popupEditProfile = document.querySelector('#popup-edit-profile');
const openEditPopup = document.querySelector('.profile__edit-button'); // Открытие popup изменения профиля
const popupName = document.querySelector('#username');
const popupForm = document.querySelector('#popup-profile-form');

/* Popup добавления карточки */

const openPopupNewCard = document.querySelector('.profile__add-button'); // Открытие popup новой карточки места
const popupNewCard = document.querySelector('#popup-new-card'); // Popup новой карточки места
const popupCardForm = document.querySelector('#popup-card-form'); // переменная формы с инпутами и кнопкой сохранить у PopUp-Card
const popupSubmitButton = document.querySelector('#popup-save-btn');
const popupCardTitle = document.querySelector('#title'); // переменная инпута текста PopUp-Card
const popupCardImage = document.querySelector('#image'); // переменная инпута картинки PopUp-Card

const popups = document.querySelectorAll('.popup'); // Для функции закрытия popup нажатием на фон
const popupDescription = document.querySelector('#description');


const popupImage = document.querySelector('.popup__image'); // переменная картинки модального окна
const popupImageName = document.querySelector('.popup__description') // переменная названия картинки
const popupPreviewPicture = document.querySelector('#popup-modal');

/* Валидация */

const editProfileValidator = new FormValidator(settingsList, profileForm)
const addCardValidator = new FormValidator(settingsList, popupCardForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

//Открытие PopUp-ов 

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
}

/* Закрытие Popup-ов */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

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
    
//Закрыть popup на Escape 

function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

/* Записать данные из профиля в инпуты формы */

openEditPopup.addEventListener('click', editPopupValue);

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

/* Открытие полноразмерной картинки */

function handlePreviewPicture(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
    openPopup(popupPreviewPicture);
}

function createCard(popupObject) {
    console.log(data)

    const card = new Card(popupObject, '#template', handlePreviewPicture);
    const cardElement = card.createCard();

    return cardElement;

    //elements.prepend(cardElement);
}

function renderElement() {
    if () {

    } else {

    }
};

function render(renderCards) {
    renderCards.forEach((popupObject) => {
        const cardElement = createCard(popupObject);
        renderElement(cardElement, elements, true);
    });
}
render(initialCards); 

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
    createCard(popupObject);
    evt.target.reset();
}
