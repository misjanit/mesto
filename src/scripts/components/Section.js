/* класс отвечает за отрисовку элементов на странице */

export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;

        this._containerSelector = document.querySelector(containerSelector);
    }

    /* Отрисовываем */

    renderItems() {
        this._items.forEach((item) => {
            this.addItem(item);
        });
    }

    /* Показываем */
    
    addItem(item) {
        const card = this._renderer(item);
        this._containerSelector.append(card);
    }
}