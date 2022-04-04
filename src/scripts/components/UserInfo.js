export default class UserInfo {
    constructor( { elementName, elementDescription } ) {
        this._elementName = document.querySelector(elementName);
        this._elementDescription = document.querySelector(elementDescription);
    }

    /* Возвращает объект с данными пользователя */
    getUserInfo() {
        return {
            name: this._elementName.textContent,
            description: this._elementDescription.textContent
        };
    }

    /* Принимает новые данные и добавляет их в попап */
    setUserInfo(data) {
        this._elementName.textContent = data.username;
        this._elementDescription.textContent = data.description;
    }
}

