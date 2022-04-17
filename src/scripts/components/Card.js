export class Card {
    constructor(data, userId, cardTemplate, handleImageClick, handleDeleteClick, handleCardLikeClick) {
        this._id = data._id;
        this._userId = userId;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;

        this._cardTemplate = cardTemplate;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleCardLikeClick = handleCardLikeClick;
    }

    /* Находим template заготовки для карточек */

    _getTemplate() {
        const elementCard = document.querySelector(this._cardTemplate).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }

    /* Проверка на лайк */

    isLiked() {
        const isUserLikeIt = this._likes.find((user) => user._id === this._userId);
        return isUserLikeIt;
    }

    /* Переключатель лайков */

    likeToggle(likeData) { /* передаем данные о лайках с сервера */
        this._likes = likeData;
        this._likeNumber.textContent = this._likes.length;

        if (this.isLiked()) {
            this._elementLike.classList.add('element__like_active');
        } else {
            this._elementLike.classList.remove('element__like_active');
        }
    }

    /* Отрисовка карточек */

    generateCard() {
        this._newElement = this._getTemplate();
        this._element = this._newElement.querySelector('.element');
        this._elementTitle = this._newElement.querySelector('.element__title');
        this._elementImage = this._newElement.querySelector('.element__image');
        this._elementLike = this._newElement.querySelector('.element__like');
        this._deleteCard = this._newElement.querySelector('#delete-card');
        this._likeNumber = this._newElement.querySelector('.element__like-number');
        this._elementTrashBtn = this._newElement.querySelector('.element__delete-container');

        this._checkCardOwner();

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementTitle.textContent = this._name;

        this.likeToggle(this._likes);
        this._setEventListeners();
    
        return this._newElement; // возвращает готовую карточку
    }


    _setEventListeners() {
        this._elementImage.addEventListener('click', () => this._handleImageClick());
        this._elementLike.addEventListener('click', () => this._handleCardLikeClick(this._id));
        this._deleteCard.addEventListener('click', () => this._handleDeleteClick(this._id));
    }

    _checkCardOwner() {
        if (this._userId !== this._ownerId) {
            this._elementTrashBtn.style.display = 'none';
        }
            
    }

    handleDeleteCard() {
        this._newElement.remove();
        this._newElement = null;
    };
}