/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node<T> {
  value: T;
  next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}

export default class Queue<ValueType> implements Iterable<ValueType> {
  private _first: Node<ValueType> | undefined;
  private _last: Node<ValueType> | undefined;
  private _size: number = 0;

  constructor() {
    this.clear();
  }

  clear(): void {
    this._first = undefined;
    this._last = undefined;
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  enqueue(value: ValueType): void {
    const node = new Node<ValueType>(value);

    if (this._first && this._last) {
      this._last.next = node;
    } else {
      this._first = node;
    }

    this._last = node;
    this._size++;
  }

  dequeue(): ValueType | undefined {
    const current = this._first;

    if (!current) {
      return undefined;
    }

    this._first = current.next;
    this._size--;

    return current.value;
  }

  peek(): ValueType | undefined {
    return this._first?.value;
  }

  *[Symbol.iterator](): IterableIterator<ValueType> {
    let current = this._first;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  *drain(): IterableIterator<ValueType | undefined> {
    while (this._first) {
      yield this.dequeue();
    }
  }
}
