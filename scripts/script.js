const popupEditProfile = document.getElementById('popup-edit-profile');
const buttonClose = document.getElementById('close-edit-popup');
const buttonCloseCardPopup = document.getElementById('close-card-popup');
const popupButton = document.querySelector('.profile__edit-button');
const popupForm = document.getElementById('popup-profile-form');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.getElementById('username');
const popupDescription = document.getElementById('description');

popupButton.addEventListener('click', openPopup); // Открытие PopUp

function openPopup() {
    popupEditProfile.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.getElementById('popup-new-card');

addButton.addEventListener('click', openPopupNewCard); // Открытие PopUp карточки

function openPopupNewCard() {
    popupNewCard.classList.add('popup_opened');
}

buttonClose.addEventListener('click', closePopup); // Закрытие PopUp профиля
buttonCloseCardPopup.addEventListener('click', closePopup); // Закрытие PopUp карточки

function closePopup() {
    popupNewCard.classList.remove('popup_opened');
    popupEditProfile.classList.remove('popup_opened');
}

// Записать введенные значения из PopUp в профиль
popupForm.addEventListener('submit', submitProfileButtonReaction);

function submitProfileButtonReaction(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}


/////////////////////////////////////////////////////////////////////////

const popupCardForm = document.getElementById('popup-card-form'); // переменная формы с инпутами и кнопкой сохранить у PopUp-Card
const popupCardTitle = document.getElementById('title'); // переменная инпута текста PopUp-Card
const popupCardImage = document.getElementById('image'); // переменная инпута картинки PopUp-Card
const elements = document.querySelector('.elements'); // переменная для контейнера где хранятся все карточки
const template = document.getElementById('template'); // переменная заготовки карточки

const initialCards = [
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
    const openModal = newElement.getElementById('open-modal');
    const elementImage = newElement.querySelector('.element__image').src = card.link;
    const elementLike = newElement.querySelector('.element__like');
    const deleteCard = newElement.getElementById('delete-card');

    openModal.addEventListener('click', function (evt) {
        let openPopupModal = document.getElementById('popup-modal');
        openPopupModal.classList.add('popup_opened');
        
    }
    );

    elementLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    deleteCard.addEventListener('click', function (event) {
        event.target.closest('.element').remove();
    });



    return newElement; // возвращает готовую карточку

    

}

///

function showCard(newElement) {
    elements.prepend(addNewCard(newElement));
}

/////////////////////

popupCardForm.addEventListener('submit', submitCardButtonReaction); // Добавление новой карточки на страницу

function submitCardButtonReaction(evt) {

    evt.preventDefault();

    const popupObject = {
        name: popupCardTitle.value,
        link: popupCardImage.value,
    };

    evt.target.reset();

    closePopup();

    showCard(popupObject);
}

///////////////



