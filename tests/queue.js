import { Queue, Node } from '../src/data-structures/queue';
import { describe, expect, it, beforeEach } from 'vitest';

describe('Queue', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  describe('constructor', () => {
    it('should initialize with empty first, last, and length 0', () => {
      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.length).toBe(0);
    });
  });

  describe('enqueue', () => {
    it('should add a new element to an empty queue', () => {
      const length = queue.queue(10);
      expect(length).toBe(1);
      expect(queue.length).toBe(1);
      expect(queue.first).toBe(queue.last);
      expect(queue.first?.value).toBe(10);
      expect(queue.first?.next).toBeNull();
    });

    it('should add multiple elements correctly with proper linking', () => {
      expect(queue.queue(1)).toBe(1);
      expect(queue.first?.value).toBe(1);
      expect(queue.last?.value).toBe(1);

      expect(queue.queue(2)).toBe(2);
      expect(queue.first?.value).toBe(1);
      expect(queue.last?.value).toBe(2);
      expect(queue.first?.next?.value).toBe(2);

      expect(queue.queue(3)).toBe(3);
      expect(queue.first?.value).toBe(1);
      expect(queue.last?.value).toBe(3);
      expect(queue.first?.next?.value).toBe(2);
      expect(queue.first?.next?.next?.value).toBe(3);
    });

    it('should increase length correctly', () => {
      queue.queue(1);
      queue.queue(2);
      queue.queue(3);
      expect(queue.length).toBe(3);
    });

    it('should work with string values', () => {
      expect(queue.queue('a')).toBe(1);
      expect(queue.first?.value).toBe('a');
    });

    it('should work with object values', () => {
      queue.queue({id: 1});
      expect(queue.first?.value.id).toBe(1);
    });
  });

  describe('dequeue', () => {
    it('should return undefined on an empty queue', () => {
      const result = queue.dequeue();
      expect(result).toBeUndefined();
      expect(queue.length).toBe(0);
    });

    it('should remove and return the first element from a single-element queue', () => {
      queue.queue(10);
      const dequeued = queue.dequeue();

      expect(dequeued).toBe(10);
      expect(queue.length).toBe(0);
      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
    });

    it('should remove and return the first element from a multi-element queue', () => {
      queue.queue(1);
      queue.queue(2);
      queue.queue(3);

      let dequeued = queue.dequeue();
      expect(dequeued).toBe(1);
      expect(queue.length).toBe(2);
      expect(queue.first?.value).toBe(2);
      expect(queue.last?.value).toBe(3);

      dequeued = queue.dequeue();
      expect(dequeued).toBe(2);
      expect(queue.length).toBe(1);
      expect(queue.first?.value).toBe(3);
      expect(queue.last?.value).toBe(3);

      dequeued = queue.dequeue();
      expect(dequeued).toBe(3);
      expect(queue.length).toBe(0);
      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
    });

    it('should work with string values', () => {
      queue.queue('a');
      expect(queue.dequeue()).toBe('a');
    });

    it('should work with object values', () => {
      queue.queue({id: 1});
      let dequeued = queue.dequeue();
      expect(dequeued?.id).toBe(1);
    });
  });

  describe('FIFO behavior', () => {
    it('should handle interleaved queue and dequeue operations', () => {
      queue.queue(1);
      queue.queue(2);
      expect(queue.dequeue()).toBe(1);

      queue.queue(3);
      expect(queue.dequeue()).toBe(2);

      queue.queue(4);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.dequeue()).toBeUndefined();
    });
  });

  describe('Node class', () => {
    it('should initialize a Node with the correct value', () => {
      const node = new Node(10);
      expect(node.value).toBe(10);
      expect(node.next).toBeNull();
    });

    it('should work with different value types', () => {
      const stringNode = new Node('hello');
      expect(stringNode.value).toBe('hello');

      const objNode = new Node({id: 1});
      expect(objNode.value.id).toBe(1);
    });
  });

  describe('error cases', () => {
    it('should handle null/undefined values when type allows it', () => {
      queue.queue(null);
      expect(queue.length).toBe(1);
      expect(queue.dequeue()).toBeNull();
    });
  });

  describe('linked list structure', () => {
    it('should maintain correct next references after multiple operations', () => {
      queue.queue(1);
      queue.queue(2);
      queue.queue(3);

      let current = queue.first;
      expect(current?.value).toBe(1);
      expect(current?.next?.value).toBe(2);
      expect(current?.next?.next?.value).toBe(3);
      expect(current?.next?.next?.next).toBeNull();

      queue.dequeue();
      current = queue.first;
      expect(current?.value).toBe(2);
      expect(current?.next?.value).toBe(3);
      expect(current?.next?.next).toBeNull();

      queue.queue(4);
      current = queue.first;
      expect(current?.value).toBe(2);
      expect(current?.next?.value).toBe(3);
      expect(current?.next?.next?.value).toBe(4);
      expect(current?.next?.next?.next).toBeNull();
    });
  });
});
