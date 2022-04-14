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
} from '../scripts/constant.js';

/* CSS стили */

import '../pages/index.css';

/* вызов класса Api */

import { api } from '../scripts/Api.js';

/* Подтверждение удаления */

import PopupDeleteConfirm from '../scripts/components/PopupDeleteConfirm.js';

/* Подготавливаем константу для запроса на сервер */

const initialDataArray = [api.getProfile(), api.getInitialCards()];

/* Переменная для моего айди */

let userId;

/* Создаем  */

Promise.all(initialDataArray)
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUserAvatar(userData.avatar);
        userId = userData._id;

        cards.forEach((data) => {
            renderCards.addItem({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id,
            })
        })
    })

/* Валидация */

const editProfileValidator = new FormValidator(settingsList, profileForm)
const addCardValidator = new FormValidator(settingsList, popupCardForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

/* Вызываем класс и передаём данные */

function createCard(item) {
    const card = new Card(
        item,
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

const renderCards = new Section(
    { items: [],
    renderer: createCard },
    '.elements'
);

renderCards.renderItems();

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
    createPopupCardForm.toggleSavingSubmitLoading(true);
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
                id: res._id,
                ownerId: res.ownerId,
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
    editProfileValidator.toggleButtonState();

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
    addCardValidator.toggleButtonState();
    createPopupCardForm.open();
});

/* Открытие попапа аватара */
profileAvatarUpd.addEventListener('click', () => {
    avatarProfileEdit.open();
})

/* Слушатели */

createPopupProfileForm.setEventListeners();
createPopupCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteConfirm.setEventListeners();
avatarProfileEdit.setEventListeners();


