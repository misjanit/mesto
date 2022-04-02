import Popup from './Popup.js';

/* Отвечает за модалку просмотра картинки */
export default class PopupWithImage extends Popup {
/* конструктор можно опустить из-за обращения к родителю */
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupImageName = this._popupSelector.querySelector('.popup__description');
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupImageName.textContent = data.name;
        super.open();
    }
}