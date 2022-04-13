export default class UserInfo {
    constructor( { elementName, elementDescription } ) {
        this._elementName = document.querySelector(elementName);
        this._elementDescription = document.querySelector(elementDescription);
    }

    /* Возвращает объект с данными пользователя */
    getUserInfo() {
        return {
            username: this._elementName.textContent,
            description: this._elementDescription.textContent
        };
    }

    /* Принимает новые данные и добавляет их в попап */
    setUserInfo(username, description) {
        this._elementName.textContent = username;
        this._elementDescription.textContent = description;
    }

    /* Меняем аватар */

    setUserAvatar() {
        
    }
}

