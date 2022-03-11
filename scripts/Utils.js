export const popupModal = document.querySelector('#popup-modal');
export const popupImage = document.querySelector('.popup__image'); // переменная картинки модального окна
export const popupDescription = document.querySelector('#description');


/* Открытие PopUp-ов */

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
}

/* Закрыть popup на Escape */

export function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}