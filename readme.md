# yoctoqueue2

> Tiny, efficient queue data structure for JavaScript and TypeScript

Use this package instead of an array when you need to do a lot of `Array#push()` and `Array#shift()` on large arrays. Unlike `Array#shift()` which has [linear time complexity](<https://medium.com/@ariel.salem1989/an-easy-to-use-guide-to-big-o-time-complexity-5dcf4be8a444#:~:text=O(N)%E2%80%94Linear%20Time>) _O(n)_, `Queue#dequeue()` has [constant time complexity](<https://medium.com/@ariel.salem1989/an-easy-to-use-guide-to-big-o-time-complexity-5dcf4be8a444#:~:text=O(1)%20%E2%80%94%20Constant%20Time>) _O(1)_, which makes a huge difference for large collections.

> A [queue](<https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>) is an ordered list where elements are inserted at the end and removed from the front (FIFO — first-in, first-out).

This implementation keeps references to both the first (`_first`) and last (`_last`) nodes internally to allow **efficient enqueue and dequeue operations** without iterating through the entire queue.

It can be used in **CommonJS, ESM, and IIFE** environments. When used as an IIFE, it exposes a global variable named `yoctoqueue2`.

## Install

```sh
npm install yoctoqueue2
```

## Usage

### Node / ESM

```ts
import Queue from "yoctoqueue2";

const queue = new Queue<string>();

queue.enqueue("🦄");
queue.enqueue("🌈");

console.log(queue.size);
//=> 2

console.log(...queue);
//=> '🦄 🌈'

console.log(queue.dequeue());
//=> '🦄'

console.log(queue.dequeue());
//=> '🌈'
```

### Browser (via script injection)

```ts
// Open browser console and run:
const s = document.createElement("script");
s.src =
  "https://cdn.jsdelivr.net/gh/maanimis/yoctoqueue2@main/dist/index.global.js";
s.onload = () => {
  console.log("✅ yoctoqueue2 loaded");

  // Create a new queue instance
  const queue = new yoctoqueue2.default();

  queue.enqueue("🦄");
  queue.enqueue("🌈");

  console.log(queue.size);
  //=> 2

  console.log(...queue);
  //=> '🦄 🌈'

  console.log(queue.dequeue());
  //=> '🦄'

  console.log(queue.dequeue());
  //=> '🌈'
};
document.head.appendChild(s);
```

## API

### `queue = new Queue<ValueType>()`

The instance is an [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), so you can iterate over it front to back with a `for…of` loop. Iterating **does not remove items**. If you want to consume and remove items at the same time, use [`drain()`](#drain).

You can also spread the queue into an array, e.g., `[...queue]`, but avoid doing this on large queues frequently, as it copies all items.

#### `.enqueue(value: ValueType)`

Add a value to the end of the queue.
Time complexity: **O(1)**.

#### `.dequeue(): ValueType | undefined`

Remove and return the next value in the queue. Returns `undefined` if the queue is empty.
Time complexity: **O(1)**.

#### `.peek(): ValueType | undefined`

Get the next value in the queue without removing it. Returns `undefined` if the queue is empty.

#### `.drain(): IterableIterator<ValueType | undefined>`

Returns an iterator that **removes items as you consume them**. Useful for processing and emptying the queue at the same time.

#### `.clear(): void`

Remove all items from the queue.

#### `.size: number`

The number of items currently in the queue.

## Related

- [quick-lru](https://github.com/sindresorhus/quick-lru) - Simple “Least Recently Used” (LRU) cache
