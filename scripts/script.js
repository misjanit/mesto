/* Общие классы */

const elements = document.querySelector('.elements'); // переменная для контейнера где хранятся все карточки
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupClose = document.querySelector('.popup__close-button'); // Кнопка закрытия любого Popup

/* Блок Profile */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

/* Popup редактирования профия */

const popupEditProfile = document.querySelector('#popup-edit-profile');
const openEditPopup = document.querySelector('.profile__edit-button'); // Открытие popup изменения профиля
const buttonClose = document.querySelector('#close-edit-popup');
const popupName = document.querySelector('#username');
const popupDescription = document.querySelector('#description');
const popupForm = document.querySelector('#popup-profile-form');

/* Popup добавления карточки */

const openPopupNewCard = document.querySelector('.profile__add-button'); // Открытие popup новой карточки места
const popupNewCard = document.querySelector('#popup-new-card'); // Popup новой карточки места
const buttonCloseCardPopup = document.querySelector('#close-card-popup');
const popupCardForm = document.querySelector('#popup-card-form'); // переменная формы с инпутами и кнопкой сохранить у PopUp-Card
const popupCardTitle = document.querySelector('#title'); // переменная инпута текста PopUp-Card
const popupCardImage = document.querySelector('#image'); // переменная инпута картинки PopUp-Card
const template = document.querySelector('#template'); // переменная заготовки карточки

/* Popup модального окна картинки */

const popupModal = document.querySelector('#popup-modal');
const buttonCloseModalPopup = document.querySelector('#close-window-popup');


function openPopup(popup) { // Открытие PopUp-ов
    popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрытие Popup-ов
    popup.classList.remove('popup_opened');
}

openEditPopup.addEventListener('click', popupEditValue); // Записывает значения из профиля в PopUp

function popupEditValue() { // Открытие Popup профиля
    openPopup(popupEditProfile);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

// Записать введенные значения из PopUp в профиль
popupForm.addEventListener('submit', submitProfileButtonReaction);

function submitProfileButtonReaction(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupEditProfile);
}

popupClose.addEventListener('click', function () { closePopup(popupEditProfile); }); // Закрыть popup профиля

const initialCards = [ // Массив
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function render(renderCards) {
    renderCards.forEach(showCard); // Выбираем каждый из объект из массива и передаем значения функции showCard
}

render(initialCards); // Запускаем функцию

function addNewCard(card) {

    const newElement = template.content.cloneNode(true); // клонируем заготовку

    // наполняем заготовку содержимым

    const element = newElement.querySelector('.element');
    const elementTitle = newElement.querySelector('.element__title').textContent = card.name;
    const openModal = newElement.querySelector('#open-modal');
    const elementImage = newElement.querySelector('.element__image').src = card.link;
    const elementImageAlt = newElement.querySelector('.element__image').alt = card.name;
    const elementLike = newElement.querySelector('.element__like');
    const deleteCard = newElement.querySelector('#delete-card');

    openModal.addEventListener('click', function (evt) { // Открываем модальное окно при клике на картинку
        const openPopupModal = document.querySelector('#popup-modal');
        openPopup(popupModal);
        buttonCloseModalPopup.addEventListener('click', function () { closePopup(popupModal); });

        const popupImage = document.querySelector('.popup__image'); // Передаем нужную картинку в модальное окно
        popupImage.src = elementImage;
        popupImage.alt = elementImageAlt;

        const popupDescription = document.querySelector('.popup__description');
        popupDescription.textContent = elementTitle;
    });

    elementLike.addEventListener('click', function (evt) { // Ставим лайки, подписываемся на канал
        evt.target.classList.toggle('element__like_active');
    });

    deleteCard.addEventListener('click', function (event) { // Удаляем карточки при клике на корзину
        event.target.closest('.element').remove();
    });

    return newElement; // возвращает готовую карточку

}

function showCard(newElement) {
    elements.prepend(addNewCard(newElement));
}

openPopupNewCard.addEventListener('click', popupCard);

function popupCard() {
    openPopup(popupNewCard);
    popupCardForm.addEventListener('submit', submitCardButtonReaction); // Добавление новой карточки на страницу
    buttonCloseCardPopup.addEventListener('click', function () { closePopup(popupNewCard); });
}

function submitCardButtonReaction(evt) { // Добавление карточки из PopUp

    evt.preventDefault();

    const popupObject = {
        name: popupCardTitle.value,
        link: popupCardImage.value,
    };

    evt.target.reset();

    closePopup(popupNewCard);

    showCard(popupObject);
}

///////// Спринт 6 //////////
/*
const checkInputValidity = (form, input) => {
    const errorMessage = form.querySelector(`#error-${input.id}`);

    if (input.validity.valid) {
        errorMessage.textContent = '';
        input.classList.remove('popup__input_redline');

    } else {
        errorMessage.textContent = input.validationMessage;
        input.classList.add('popup__input_redline'); 
    }
};

const checkButtonValidity = (form, submitButton) => {
    if (form.checkValidity()) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('popup__save-button_unactive');
    } else {
        submitButton.setAttribute('disabled', '');
        submitButton.classList.add('popup__save-button_unactive');
    }
};

function enableValidation() {
    const form = document.querySelector('.popup__form');

    form.addEventListener('submit', formSubmit);

    const inputs = form.querySelectorAll('.popup__input');
    const submitButton = form.querySelector('.popup__save-button');

    checkButtonValidity(form, submitButton);

    inputs.forEach(input => { 
        input.addEventListener('input', (event) => checkInputValidity(form, input));
        checkButtonValidity(form, submitButton);
    });
};

enableValidation();

function formSubmit(event) {
    event.preventDefault();
}
//////////////////// */



const checkInputValidity = (formElement, input) => {

    if (!input.validity.valid) {
        showInputError(formElement, input, input.validationMessage);
    } else {
        hideInputError(formElement, input);
    }
};

const showInputError = (formElement, input) => {

    const errorElement = formElement.querySelector(`#error-${input.id}`);

    input.classList.add('popup__input_redline');
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add('popup__input-error');
};

const hideInputError = (formElement, input) => {
    const errorElement = formElement.querySelector(`#error-${input.id}`);
    input.classList.remove('popup__input_redline');
    errorElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
};

const setEventListeners = (formElement) => {

    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const button = formElement.querySelector('.popup__save-button');

    toggleButtonState(inputs, button);

    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            toggleButtonState(inputs, button);
            checkInputValidity(formElement, input);
        });

    });

};

function enableValidation() {

    const form = Array.from(document.querySelectorAll('.popup__form')); // взяли массив всех форм

    form.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {      // взяли каждую форму и на кнопку повесили обработчика
            evt.preventDefault();
            return formElement;
        });
        setEventListeners(formElement);
        hideInputError(formElement);
        showInputError(formElement);
        checkInputValidity(formElement, input);
    });

}

enableValidation();

function hasInvalidInput(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
}

function toggleButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
        button.classList.add('popup__save-button_unactive');
    } else {
        button.classList.remove('popup__save-button_unactive');
    }
}
