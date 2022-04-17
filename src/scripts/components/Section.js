/* класс отвечает за отрисовку элементов на странице */

export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;

        this._containerElement = document.querySelector(containerSelector);
    }

    /* Отрисовываем */

    renderItems(items) {
        items.forEach((item) => {
            this.addItem(item);
        });
    }

    /* Показываем */
    
    addItem(item) {
        const card = this._renderer(item);
        this._containerElement.prepend(card);
    }
}