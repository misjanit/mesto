export default class UserInfo {
    constructor( { elementName, elementDescription, elementAvatar } ) {
        this._elementName = document.querySelector(elementName);
        this._elementDescription = document.querySelector(elementDescription);
        this._elementAvatar = document.querySelector(elementAvatar);
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

    setUserAvatar(avatar) {
        this._elementAvatar.src = avatar;
    }
}

