/* Валидация */

import { FormValidator } from '../scripts/components/FormValidator.js';

/* Массив карточек и настройки для валидации */

import { settingsList } from '../scripts/utils.js';

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
    profileForm, openEditPopup,
    openPopupNewCard, popupCardForm, profileAvatarUpd,
    popupChangeAvatarForm
} from '../scripts/constant.js';

/* CSS стили */

import '../pages/index.css';

/* вызов класса Api */

import { api } from '../scripts/components/Api.js';

/* Подтверждение удаления */

import PopupDeleteConfirm from '../scripts/components/PopupDeleteConfirm.js';

/* Подготавливаем константу для запроса на сервер */

const initialDataArray = [api.getProfile(), api.getInitialCards()];

/* Переменная для моего айди */

let userId;

/* Создаем  */

Promise.all(initialDataArray)
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUserAvatar(userData.avatar);
        userId = userData._id;
        renderCards.renderItems(cards);
    })
    .catch((err) => console.log(err));


/* Валидация */

const editProfileValidator = new FormValidator(settingsList, profileForm)
const addCardValidator = new FormValidator(settingsList, popupCardForm)
const editAvatarValidator = new FormValidator(settingsList, popupChangeAvatarForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

/* Вызываем класс и передаём данные */

function createCard(item) {
    const card = new Card(
        item,
        userId,
        '#template',
        () => { popupWithImage.open(item) },

        /* Удаление */

        (id) => {
            popupDeleteConfirm.open();
            popupDeleteConfirm.popupHandlerDeleteFormSubmit(() => {
                popupDeleteConfirm.submitLoading(true);
                api.deleteCard(id)
                    .then((res) => {
                        card.handleDeleteCard();
                        popupDeleteConfirm.close();
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        popupDeleteConfirm.submitLoading(false);
                    })
            })},

        /* Лайки */

        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then((res) => {
                        card.likeToggle(res.likes);
                    })
                    .catch((err) => console.log(err))
            } else {
                api.setLike(id)
                    .then((res) => {
                        card.likeToggle(res.likes)
                    })
                    .catch((err) => console.log(err))
            }
        }
    )
    const cardElement = card.generateCard();
    return cardElement;
}

/* Отрисовываем карточку */

const renderCards = new Section({
    items: [],
    renderer: createCard },
    '.elements'
);

/* Отображение данных пользователя */

const userInfo = new UserInfo({
    elementName: '.profile__name',
    elementDescription: '.profile__description',
    elementAvatar: '.profile__avatar',
});

/* Открытие модалки картинки */

const popupWithImage = new PopupWithImage('#popup-modal');

/* Класс для работы с профилем */

const createPopupProfileForm = new PopupWithForm('#popup-edit-profile', (data) => {
    createPopupProfileForm.toggleSavingSubmitLoading(true);
    const {username, description} = data;
    api.editProfile(username, description)
        .then(() => {
            userInfo.setUserInfo(username, description);
            createPopupProfileForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            createPopupProfileForm.toggleSavingSubmitLoading(false);
        })
});

/* Класс для работы с попапом карточек */

const createPopupCardForm = new PopupWithForm('#popup-new-card', (data) => {
    addCardValidator.toggleButtonState();
    createPopupCardForm.toggleSavingSubmitLoading(true);

    api.addCard(data.title, data.image)
        .then((res) => {
            renderCards.addItem({
                name: res.name,
                link: res.link,
                likes: res.likes,
                _id: res._id,
                userId: userId,
                owner: res.owner,
            });
            createPopupCardForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            createPopupCardForm.toggleSavingSubmitLoading(false);
        })
});

const popupDeleteConfirm = new PopupDeleteConfirm('#popup-agreement-to-delete');

/* Открытие попапа профиля */

openEditPopup.addEventListener('click', () => {
    editProfileValidator.resetErrors();

    const data = userInfo.getUserInfo();
    createPopupProfileForm.setInputValues(data);

    createPopupProfileForm.open();
});

/* Редактирование аватара */

const avatarProfileEdit = new PopupWithForm('#popup-change-avatar', (data) => {
    avatarProfileEdit.toggleSavingSubmitLoading(true);
    api.editAvatar(data)
        .then((res) => {
            userInfo.setUserAvatar(res.avatar);
            avatarProfileEdit.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            avatarProfileEdit.toggleSavingSubmitLoading(false);
        })
})


/* Открытие попапа карточки */

openPopupNewCard.addEventListener('click', () => {
    addCardValidator.resetErrors();
    createPopupCardForm.open();
});

/* Открытие попапа аватара */
profileAvatarUpd.addEventListener('click', () => {
    editAvatarValidator.resetErrors();
    avatarProfileEdit.open();
})

/* Слушатели */

createPopupProfileForm.setEventListeners();
createPopupCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteConfirm.setEventListeners();
avatarProfileEdit.setEventListeners();


