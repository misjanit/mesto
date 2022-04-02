export class FormValidator {

    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._button = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const { errorClass, inputErrorClass } = this._settings

        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);

        inputElement.classList.add(errorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(inputErrorClass);
    };

    _hideInputError(inputElement) {
        const { errorClass, inputErrorClass } = this._settings

        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);

        inputElement.classList.remove(errorClass);
        errorElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _isInputInvalid() {
        return this._inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // метод публичный потому что я к нему обращаюсь из index js
    toggleButtonState() {
        if (this._isInputInvalid()) {
            this._button.classList.add(this._settings.inactiveButtonClass);
            this._button.setAttribute('disabled', true);
        } else {
            this._button.classList.remove(this._settings.inactiveButtonClass);
            this._button.removeAttribute('disabled', '');
        }
    }

    _setEventListeners() {
        this.toggleButtonState();

        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    resetErrors() {
        this._form.reset()
        this._inputs.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
};