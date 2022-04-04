/* Валидация */

import { FormValidator } from '../scripts/components/FormValidator.js';

/* Массив карточек и настройки для валидации */

import { initialCards, settingsList } from '../scripts/utils.js';

/* Создание карточек */

import { Card } from '../scripts/components/Card.js';

/* Отрисовка карточек на странице */

import Section from '../scripts/components/Section.js'

/* Работа с формами попапов */

import PopupWithForm from '../scripts/components/PopupWithForm.js';

/* Открытие картинки карточки */

import PopupWithImage from '../scripts/components/PopupWithImage.js';

/* Отображение информации о пользователе на странице */

import UserInfo from '../scripts/components/UserInfo.js';

/* Переменные */

import {
    profileForm, openEditPopup, popupName,
    openPopupNewCard, popupCardForm, popupDescription
} from '../scripts/constant.js';

/* CSS стили */

import '../pages/index.css';

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

/* Отображение данных пользователя */

const userInfo = new UserInfo({
    elementName: '.profile__name',
    elementDescription: '.profile__description'
});

/* Открытие модалки картинки */

const popupWithImage = new PopupWithImage('#popup-modal');

/* Класс для работы с профилем */

const createPopupProfileForm = new PopupWithForm('#popup-edit-profile', (data) => {
    userInfo.setUserInfo(data);
});

/* Класс для работы с попапом карточек */

const createPopupCardForm = new PopupWithForm('#popup-new-card', (data) => {
    addCardValidator.toggleButtonState()

    const popupObject = {
        name: data.title,
        link: data.image,
    };
    renderCards.addItem(createCard(popupObject));
});

/* Слушатели */

createPopupProfileForm.setEventListeners();
createPopupCardForm.setEventListeners();
popupWithImage.setEventListeners();

/* Открытие попапа профиля */
openEditPopup.addEventListener('click', () => {
    editProfileValidator.toggleButtonState();

    const data = userInfo.getUserInfo();
    popupName.value = data.name;
    popupDescription.value = data.description;

    createPopupProfileForm.open();
});

/* Открытие попапа карточки */

openPopupNewCard.addEventListener('click', () => {
    addCardValidator.toggleButtonState();
    createPopupCardForm.open();
});