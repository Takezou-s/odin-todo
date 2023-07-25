import { Event } from "./EventManagement/Event";

export class List<T> {
  private _list: Array<T> = [];
  private _addedItems: Array<T> = [];
  private _removedItems: Array<T> = [];

  public itemsAddedEvent: Event = new Event(50, this._clearArray.bind(this, this._addedItems));
  public itemsRemovedEvent: Event = new Event(50, this._clearArray.bind(this, this._removedItems));

  add(...items: T[]) {
    this._list.push(...items);
    this._addedItems.push(...items);
    this.itemsAddedEvent.fireEvent(this, this._addedItems);
  }

  remove(...items: T[]) {
    items.forEach((x) => {
      const index = this._list.findIndex((y) => y === x);
      if (index < 0) {
        return;
      }
      this._list.splice(index, 1);
      this._removedItems.push(x);
    });
    this.itemsRemovedEvent.fireEvent(this, this._removedItems);
  }

  items(): T[] {
    return this._list;
  }

  private _clearArray(array: T[]) {
    array.splice(0, array.length);
  }
}
