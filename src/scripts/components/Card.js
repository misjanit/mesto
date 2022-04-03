export class Card {
    constructor(data, cardTemplate, handleImageClick) {
        this._name = data.name;
        this._link = data.link;

        this._cardTemplate = cardTemplate;

        this._handleImageClick = handleImageClick;
    }

    /* Находим template заготовки для карточек */
    _getTemplate() {
        const elementCard = document.querySelector(this._cardTemplate).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }

    generateCard() {
        this._newElement = this._getTemplate();
        this._element = this._newElement.querySelector('.element');
        this._elementTitle = this._newElement.querySelector('.element__title');
        this._elementImage = this._newElement.querySelector('.element__image');
        this._elementLike = this._newElement.querySelector('.element__like');
        this._deleteCard = this._newElement.querySelector('#delete-card');

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementTitle.textContent = this._name;

        this._setEventListeners();

        return this._newElement; // возвращает готовую карточку
    }

    _setEventListeners() {
        this._elementImage.addEventListener('click', () => this._handleImageClick() );
        this._elementLike.addEventListener('click', () => this._handleLikeIcon() );
        this._deleteCard.addEventListener('click', () => this._handleDeleteCard() );
    }

    _handleLikeIcon = () => {
        this._elementLike.classList.toggle('element__like_active');
    };

    _handleDeleteCard() {
        this._newElement.remove();
        //this._newElement = null
    };
}