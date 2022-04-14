import Popup from './Popup.js';

export default class PopupDeleteConfirm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._submitButton = this._popupSelector.querySelector('.popup__save-button');
        this._text = this._submitButton.textContent;
    }

    popupHandlerDeleteFormSubmit(handlerDeleteFormSubmit) {
        this._formSubmit = handlerDeleteFormSubmit;
    }

    submitLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Удаление...';
        } else {
            this._submitButton.textContent = this._text;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._formSubmit();
        })
    }

}