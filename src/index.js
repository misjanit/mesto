/* Валидация */

import { FormValidator } from '../scripts/FormValidator.js';

/* Массив карточек и настройки для валидации */

import { initialCards, settingsList } from '../scripts/utils.js';

/* Создание карточек */

import { Card } from '../scripts/Card.js';

/* Отрисовка карточек на странице */

import Section from '../scripts/Section.js'

/* Работа с формами попапов */

import PopupWithForm from '../scripts/PopupWithForm.js';

/* Открытие картинки карточки */

import PopupWithImage from '../scripts/PopupWithImage.js';

/* Отображение информации о пользователе на странице */

import UserInfo from '../scripts/UserInfo.js';

/* Переменные */

import {
    elements, profileName, profileDescription, profileForm,
    popupEditProfile, openEditPopup, popupName, popupForm,
    openPopupNewCard, popupNewCard, popupCardForm,
    popupSubmitButton, popupCardTitle, popupCardImage,
    popups, popupDescription, popupPreviewPicture
} from '../scripts/constant.js';

/* Валидация */

const editProfileValidator = new FormValidator(settingsList, profileForm)
const addCardValidator = new FormValidator(settingsList, popupCardForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

/* Вызываем класс и передаём данные */

function createCard(item) {
    const card = new Card(item, '#template', () => {
        popupWithImage.open(item);
    });
    const cardElement = card.generateCard(); 
    return cardElement;
}

/* Отрисовываем карточку */

const renderCards = new Section({
    items: initialCards,
    renderer: (item) => {
        renderCards.addItem(createCard(item));
    },
},
    '.elements'
);

renderCards.renderItems();

const userInfo = new UserInfo({
    selectorElementName: '.profile__name',
    selectorElementDescription: '.profile__description'
});

const popupWithImage = new PopupWithImage('#popup-modal');




const createPopupProfileForm = new PopupWithForm('#popup-edit-profile', (data) => {
    userInfo.setUserInfo(data);
});

openEditPopup.addEventListener('click', () => {
    editProfileValidator.toggleButtonState();

    const data = userInfo.getUserInfo();
    createPopupProfileForm.setInputValues(data);
    createPopupProfileForm.open();
});

const createPopupCardForm = new PopupWithForm('#popup-new-card', (data) => {
    addCardValidator.toggleButtonState()

    const popupObject = {
        name: data['#title'],
        link: data['#image'],
    };
    renderCards.addItem(createCard(popupObject));
});

openPopupNewCard.addEventListener('click', () => {
    addCardValidator.toggleButtonState();
    createPopupCardForm.open();
});
/*
createPopupProfileForm.setEventListeners();
createPopupCardForm.setEventListeners();
popupWithImage.setEventListeners() */












