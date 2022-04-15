import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callBackSubmitForm) {
        super(popupSelector);
        this._callBackSubmitForm = callBackSubmitForm;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._inputList = [...this._popupForm.querySelectorAll('.popup__input')];
        this._submitForm = this._submitForm.bind(this);

        this._submitButton = this._popupSelector.querySelector('.popup__save-button');
        this._text = this._submitButton.textContent;
    }

    /* собирает данные всех полей формы */

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name]
        })
    }

    /* реакция на сабмит формы */

    _submitForm(evt) {
        evt.preventDefault();
        this._callBackSubmitForm(this._getInputValues());
    }

    /* слушатель на сабмит и закрытие формы */

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitForm );
    }

    /* сброс полей и закрытие формы */
    
    close() {
        super.close();
        this._popupForm.reset();
    }

    changeSubmitHandler(submitHandler) {
        this._callBackSubmitForm = submitHandler;
    }

    /* Меняем текст на кнопке при нажатии */

    toggleSavingSubmitLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._text;
        }
    }
}