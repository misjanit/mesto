import { FormValidator } from './FormValidator.js';
import { initialCards, settingsList } from './utils.js';
import { Card } from './Card.js';
import { elements, profileName, profileDescription, profileForm,
     popupEditProfile, openEditPopup, popupName, popupForm, 
     openPopupNewCard, popupNewCard, popupCardForm,
     popupSubmitButton, popupCardTitle, popupCardImage,
     popups, popupDescription, popupImage, popupImageName, 
     popupPreviewPicture } from './Constant.js';


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
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
    editProfileValidator.toggleButtonState();
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

/* Вызываем класс и передаём данные */

function createCard(popupObject) {
    const card = new Card(popupObject, '#template', handlePreviewPicture);
    const cardElement = card.createCard();

    return cardElement;
}

/* Рендер карточки */

function renderElement(item, listcard) {
    listcard.prepend(item)
};

/* Рендер карточек */

function render(renderCards) {
    renderCards.forEach((popupObject) => {
        const cardElement = createCard(popupObject);
        renderElement(cardElement, elements);
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

    addCardValidator.toggleButtonState()

    const cardFromPopup = createCard(popupObject);
    renderElement(cardFromPopup, elements);

    closePopup(popupNewCard);
    evt.target.reset();
}
