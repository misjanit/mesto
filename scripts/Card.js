import { popupModal, popupImage, popupDescription, openPopup } from './Utils.js';

export class Card {
    constructor(data, cardTemplateSelector) {
        this._cardTemplate = document.querySelector(cardTemplateSelector)
        .content.querySelector('.template');
        this._name = data.name
        this._link = data.link
    }

    _handlePreviewPicture = () => {
        openPopup(popupModal);

        popupImage.src = this._elementImage;
        popupImage.alt = this._elementImageAlt;

        popupDescription.textContent = this._elementTitle;
    };

    _handleLikeIcon = () => {
        this._elementLike.classList.toggle('element__like_active');
    };

    _handleDeleteCard = () => {
        this._cardTemplate.remove();
    };

    _setEventListeners() {
        this._openModal = this._cardTemplate.querySelector('#open-modal');
        this._elementLike = this._cardTemplate.querySelector('.element__like');
        this._deleteCard = this._cardTemplate.querySelector('#delete-card');

        this._openModal.addEventListener('click', this._handlePreviewPicture);
        this._elementLike.addEventListener('click', this._handleLikeIcon);
        this._deleteCard.addEventListener('click', this._handleDeleteCard);
    }

    createCard() {

        const newElement = template.content.cloneNode(true); // клонируем заготовку
        const element = this._cardTemplate.querySelector('.element');
        this._elementTitle = this._cardTemplate.querySelector('.element__title').textContent = this._name;
        this._elementImage = this._cardTemplate.querySelector('.element__image').src = this._link;
        this._elementImageAlt = this._cardTemplate.querySelector('.element__image').alt = this._name;
        
    
        this._setEventListeners();

        return newElement; // возвращает готовую карточку
    }
    
}