export const elements = document.querySelector('.elements'); // переменная для контейнера где хранятся все карточки

/* Блок Profile */

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileForm = document.querySelector('#popup-profile-form')

/* Popup редактирования профия */

export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const openEditPopup = document.querySelector('.profile__edit-button'); // Открытие popup изменения профиля
export const popupName = document.querySelector('#username');
export const popupForm = document.querySelector('#popup-profile-form');

/* Popup добавления карточки */

export const openPopupNewCard = document.querySelector('.profile__add-button'); // Открытие popup новой карточки места
export const popupNewCard = document.querySelector('#popup-new-card'); // Popup новой карточки места
export const popupCardForm = document.querySelector('#popup-card-form'); // переменная формы с инпутами и кнопкой сохранить у PopUp-Card
export const popupSubmitButton = document.querySelector('#popup-save-btn');
export const popupCardTitle = document.querySelector('#title'); // переменная инпута текста PopUp-Card
export const popupCardImage = document.querySelector('#image'); // переменная инпута картинки PopUp-Card

export const popups = document.querySelectorAll('.popup'); // Для функции закрытия popup нажатием на фон
export const popupDescription = document.querySelector('#description');

export const popupImage = document.querySelector('.popup__image'); // переменная картинки модального окна
export const popupImageName = document.querySelector('.popup__description') // переменная названия картинки
export const popupPreviewPicture = document.querySelector('#popup-modal');
