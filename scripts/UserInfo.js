export default class UserInfo {
    constructor( { selectorElementName, selectorElementDescription } ) {
        this._selectorElementName = document.querySelector(selectorElementName);
        this._selectorElementDescription = document.querySelector(selectorElementDescription);
    }

    /* Возвращает объект с данными пользователя */
    getUserInfo() {
        return {
            name: this._selectorElementName.textContent,
            description: this._selectorElementDescription.textContent
        };
  
    }

    /* Принимает новые данные и добавляет их в попап */
    setUserInfo(name, description) {
        this._selectorElementName.textContent = name;
        this._selectorElementDescription.textContent = description;
    }
}

