import Queue from "../src";

describe("Queue", () => {
  describe("enqueue()", () => {
    it("should enqueue and dequeue values in FIFO order", () => {
      const queue = new Queue<string>();
      queue.enqueue("🦄");
      expect(queue.dequeue()).toBe("🦄");
      queue.enqueue("🌈");
      queue.enqueue("❤️");
      expect(queue.dequeue()).toBe("🌈");
      expect(queue.dequeue()).toBe("❤️");
    });
  });

  describe("dequeue()", () => {
    it("should return undefined when queue is empty", () => {
      const queue = new Queue<string>();
      expect(queue.dequeue()).toBeUndefined();
      expect(queue.dequeue()).toBeUndefined();
    });

    it("should dequeue the first value and return undefined when empty", () => {
      const queue = new Queue<string>();
      queue.enqueue("🦄");
      expect(queue.dequeue()).toBe("🦄");
      expect(queue.dequeue()).toBeUndefined();
    });
  });

  describe("peek()", () => {
    it("should return undefined when queue is empty", () => {
      const queue = new Queue<string>();
      expect(queue.peek()).toBeUndefined();
    });

    it("should return the first value without removing it", () => {
      const queue = new Queue<string>();
      queue.enqueue("🦄");
      expect(queue.peek()).toBe("🦄");
      queue.enqueue("🌈");
      expect(queue.peek()).toBe("🦄");
      queue.dequeue();
      expect(queue.peek()).toBe("🌈");
      queue.dequeue();
      expect(queue.peek()).toBeUndefined();
    });
  });

  describe("clear()", () => {
    it("should clear the queue", () => {
      const queue = new Queue<number>();
      queue.clear();
      queue.enqueue(1);
      queue.clear();
      expect(queue.size).toBe(0);
    });

    it("should clear multiple values", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.clear();
      expect(queue.size).toBe(0);
    });
  });

  describe("size", () => {
    it("should track the queue size correctly", () => {
      const queue = new Queue<string>();
      expect(queue.size).toBe(0);
      queue.clear();
      expect(queue.size).toBe(0);
      queue.enqueue("🦄");
      expect(queue.size).toBe(1);
      queue.enqueue("🦄");
      expect(queue.size).toBe(2);
      queue.dequeue();
      expect(queue.size).toBe(1);
      queue.dequeue();
      expect(queue.size).toBe(0);
      queue.dequeue();
      expect(queue.size).toBe(0);
    });
  });

  describe("iterable", () => {
    it("should be iterable with spread operator", () => {
      const queue = new Queue<string>();
      queue.enqueue("🦄");
      queue.enqueue("🌈");
      expect([...queue]).toEqual(["🦄", "🌈"]);
    });
  });

  describe("drain()", () => {
    it("should drain all values including undefined", () => {
      const queue = new Queue<string | undefined>();
      queue.enqueue("🦄");
      queue.enqueue(undefined);
      queue.enqueue("🌈");
      expect([...queue.drain()]).toEqual(["🦄", undefined, "🌈"]);
      expect([...queue]).toEqual([]);
      expect(queue.size).toBe(0);
    });
  });
});
