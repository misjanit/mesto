/* Валидация */


// Проверка input на валидность 

const checkInputValidity = (formElement, inputElement, validation) => {

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validation);
    } else {
        hideInputError(formElement, inputElement, validation);
    }
};

// Показать ошибку

const showInputError = (formElement, inputElement, validation) => {

    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    inputElement.classList.add(validation.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validation.inputErrorClass);
};

// Убрать ошибку

const hideInputError = (formElement, inputElement, validation) => {

    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    inputElement.classList.remove(validation.errorClass);
    errorElement.classList.remove(validation.inputErrorClass);
    errorElement.textContent = '';
};

// Собираем все инпуты

const setEventListeners = (formElement, validation) => {

    const inputs = Array.from(formElement.querySelectorAll(validation.inputSelector));
    const button = formElement.querySelector(validation.submitButtonSelector);

    toggleButtonState(inputs, button, validation);

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validation);
            toggleButtonState(inputs, button, validation);
        });
    });
};

// Валидация для каждой из форм

const enableValidation = (validation) => {

    const form = Array.from(document.querySelectorAll(validation.formSelector));

    form.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validation);
    });
};


// Проверить есть ли невалидные поля заполнения

function hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

// Включение и выключение кнопки submit

function toggleButtonState(inputs, button, validation) {
    if (hasInvalidInput(inputs)) {
        button.classList.add(validation.inactiveButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(validation.inactiveButtonClass);
        button.removeAttribute('disabled', true);
    }
}

// Вызывали функцию и задали аргумент

enableValidation(validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_unactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input_redline',
});