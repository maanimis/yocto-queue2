declare class Queue<ValueType> implements Iterable<ValueType> {
    private _first;
    private _last;
    private _size;
    constructor();
    clear(): void;
    get size(): number;
    enqueue(value: ValueType): void;
    dequeue(): ValueType | undefined;
    peek(): ValueType | undefined;
    [Symbol.iterator](): IterableIterator<ValueType>;
    drain(): IterableIterator<ValueType | undefined>;
}

export { Queue as default };
