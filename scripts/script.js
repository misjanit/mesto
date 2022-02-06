/* Общие классы */
const elements = document.querySelector('.elements'); // переменная для контейнера где хранятся все карточки
const popup = document.querySelector('.popup');
const popupClose = document.querySelectorAll('.popup__close-button'); // Кнопка закрытия любого Popup
/* Блок Profile */
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
/* Popup редактирования профия */
const popupEditProfile = document.getElementById('popup-edit-profile');
const openEditPopup = document.querySelector('.profile__edit-button'); // Открытие popup изменения профиля
const buttonClose = document.getElementById('close-edit-popup');
const popupName = document.getElementById('username');
const popupDescription = document.getElementById('description');
const popupForm = document.getElementById('popup-profile-form');
/* Popup добавления карточки */
const openPopupNewCard = document.querySelector('.profile__add-button'); // Открытие popup новой карточки места
const popupNewCard = document.getElementById('popup-new-card'); // Popup новой карточки места
const buttonCloseCardPopup = document.getElementById('close-card-popup'); 
const popupCardForm = document.getElementById('popup-card-form'); // переменная формы с инпутами и кнопкой сохранить у PopUp-Card
const popupCardTitle = document.getElementById('title'); // переменная инпута текста PopUp-Card
const popupCardImage = document.getElementById('image'); // переменная инпута картинки PopUp-Card
const template = document.getElementById('template'); // переменная заготовки карточки
/* Popup модального окна картинки */
const popupModal = document.getElementById('popup-modal');
const buttonCloseWindowPopup = document.getElementById('close-window-popup');


/*popupButton.addEventListener('click', popupEditValue); // Записывает значения из профиля в PopUp

function popupEditValue() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
} */

function addListeners(el) {
    el.querySelector('.profile__edit-button');
    el.querySelector('.profile__add-button');
}








popup.addEventListener('click', function(event) { // Закрытие любого PopUp при клике мимо него
    if(!event.defaultPrevented) {
      closePopup();
    }
  }); 

// Записать введенные значения из PopUp в профиль
popupForm.addEventListener('submit', submitProfileButtonReaction);

function submitProfileButtonReaction(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}

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
    const openModal = newElement.getElementById('open-modal');
    const elementImage = newElement.querySelector('.element__image').src = card.link;
    const elementLike = newElement.querySelector('.element__like');
    const deleteCard = newElement.getElementById('delete-card');

    openModal.addEventListener('click', function (evt) { // Открываем модальное окно при клике на картинку
        const openPopupModal = document.getElementById('popup-modal');
        openPopupModal.classList.add('popup_opened'); 

        const popupImage = document.querySelector('.popup__image'); // Передаем нужную картинку в модальное окно
        popupImage.src = elementImage;
        popupImage.alt = elementTitle;

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

popupCardForm.addEventListener('submit', submitCardButtonReaction); // Добавление новой карточки на страницу

function submitCardButtonReaction(evt) { // Добавление карточки из PopUp

    evt.preventDefault();

    const popupObject = {
        name: popupCardTitle.value,
        link: popupCardImage.value,
    };

    evt.target.reset();

    closePopup();

    showCard(popupObject);
}