import { PriorityQueue } from "../src/data-structures/priority_queue";
import { describe, expect, it, beforeEach } from "vitest";

describe("PriorityQueue", () => {
  let queue;

  beforeEach(() => {
    queue = new PriorityQueue();
  });

  describe("constructor", () => {
    it("should initialize with an empty queue", () => {
      expect(queue.values()).toEqual([]);
    });
  });

  describe("enqueue", () => {
    it("should add a single element correctly", () => {
      queue.enqueue("task1", 1);
      const entries = queue.entries();
      expect(entries).toEqual([{ value: "task1", priority: 1 }]);
    });

    it("should maintain heap property with multiple enqueues", () => {
      queue.enqueue("task1", 3);
      queue.enqueue("task2", 1);
      queue.enqueue("task3", 2);

      const entries = queue.entries();
      expect(entries[0].priority).toBe(1);
      expect(entries[0].value).toBe("task2");
    });

    it("should correctly handle elements with equal priorities", () => {
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 2);

      const entries = queue.entries();
      expect(entries[0].priority).toBe(2);
      expect(entries[0].value).toBe("task2");
    });

    it("should handle empty queue", () => {
      expect(queue.values()).toEqual([]);
      expect(queue.entries()).toEqual([]);
    });
  });

  describe("dequeue", () => {
    it("should return undefined for an empty queue", () => {
      expect(queue.dequeue()).toBeUndefined();
    });

    it("should remove and return the highest priority element", () => {
      queue.enqueue("task1", 1);
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 3);

      const dequeued = queue.dequeue();
      expect(dequeued.value).toBe("task1");
      expect(dequeued.priority).toBe(1);

      const entriesAfter = queue.entries();
      expect(entriesAfter.length).toBe(2);
      expect(entriesAfter[0].priority).toBe(2);
      expect(entriesAfter[0].value).toBe("task2");
    });

    it("should maintain heap property after dequeue operations", () => {
      queue.enqueue("task1", 1);
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 3);
      queue.enqueue("task4", 4);

      expect(queue.dequeue().priority).toBe(1);
      expect(queue.dequeue().priority).toBe(2);
      expect(queue.dequeue().priority).toBe(3);
      expect(queue.dequeue().priority).toBe(4);
      expect(queue.dequeue()).toBeUndefined();
    });

    it("should handle queue with one element", () => {
      queue.enqueue("task1", 1);
      const dequeued = queue.dequeue();
      expect(dequeued.value).toBe("task1");
      expect(queue.values()).toEqual([]);
    });

    it("should maintain correct heap structure after multiple dequeue operations", () => {
      queue.enqueue("task1", 1);
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 3);
      queue.enqueue("task4", 4);
      queue.enqueue("task5", 5);

      const dequeuedOrder = [];
      let node;
      while ((node = queue.dequeue())) {
        dequeuedOrder.push(node.priority);
      }

      expect(dequeuedOrder).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("values", () => {
    it("should return an array of values in queue order (not sorted)", () => {
      queue.enqueue("task1", 1);
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 3);

      const values = queue.values();
      expect(values).toEqual(["task1", "task2", "task3"]);
    });

    it("should return an empty array for an empty queue", () => {
      expect(queue.values()).toEqual([]);
    });
  });

  describe("entries", () => {
    it("should return an array of all entries with their priorities", () => {
      queue.enqueue("task1", 1);
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 3);

      expect(queue.entries()).toEqual([
        { value: "task1", priority: 1 },
        { value: "task2", priority: 2 },
        { value: "task3", priority: 3 },
      ]);
    });

    it("should return an empty array for an empty queue", () => {
      expect(queue.entries()).toEqual([]);
    });
  });

  describe("priority queue behavior", () => {
    it("should process elements in correct priority order", () => {
      queue.enqueue("Urgent Task", 1);
      queue.enqueue("Medium Priority", 3);
      queue.enqueue("Low Priority", 5);
      queue.enqueue("High Priority", 2);

      expect(queue.dequeue().value).toBe("Urgent Task");
      expect(queue.dequeue().value).toBe("High Priority");
      expect(queue.dequeue().value).toBe("Medium Priority");
      expect(queue.dequeue().value).toBe("Low Priority");
    });

    it("should handle equal priorities in FIFO order", () => {
      queue.enqueue("task1", 2);
      queue.enqueue("task2", 2);
      queue.enqueue("task3", 1);

      expect(queue.dequeue().value).toBe("task3");
      expect(queue.dequeue().value).toBe("task1");
      expect(queue.dequeue().value).toBe("task2");
    });

    it("should work correctly with negative priorities", () => {
      queue.enqueue("task1", -3);
      queue.enqueue("task2", -2);
      queue.enqueue("task3", -1);

      expect(queue.dequeue().value).toBe("task1");
      expect(queue.dequeue().value).toBe("task2");
      expect(queue.dequeue().value).toBe("task3");
    });
  });

  describe("edge cases", () => {
    it("should work correctly when enqueuing after dequeuing", () => {
      queue.enqueue("task1", 1);
      queue.enqueue("task2", 2);
      expect(queue.dequeue().value).toBe("task1");
      queue.enqueue("task3", 1);
      expect(queue.dequeue().value).toBe("task3");
    });
  });

  describe("bubbleUp and bubbleDown methods", () => {
    it("should correctly bubble up new elements", () => {
      queue.queue = [
        { value: "task1", priority: 3 },
        { value: "task2", priority: 5 },
        { value: "task3", priority: 5 },
        { value: "task4", priority: 7 },
        { value: "task5", priority: 7 },
        { value: "task6", priority: 9 },
        { value: "task7", priority: 9 },
      ];

      queue.enqueue("task8", 1);
      expect(queue.entries()[0].priority).toBe(1);
    });

    it("should correctly bubble down elements when root is removed", () => {
      queue.enqueue("task1", 10);
      queue.enqueue("task2", 20);
      queue.enqueue("task3", 30);
      queue.enqueue("task4", 5);
      queue.dequeue();
      const rootAfter = queue.entries()[0];
      expect(rootAfter.priority).toBe(10);
    });
  });
});
