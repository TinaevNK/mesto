export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards = cardsObject => {
    cardsObject.cards.forEach(item => {
      const objItem = {card: item, userId: cardsObject.userId, insertMethod: cardsObject.insertMethod };
      this._renderer(objItem);
    });
  }

  addItem = (element, insertMethod) => { // это для того, чтобы рендер отобразился как следует, а добавление новой карточки было в начало списка
    if (insertMethod == 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
