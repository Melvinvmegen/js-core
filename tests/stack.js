import { Stack, Node } from '../src/data-structures/stack';
import { describe, expect, it, beforeEach } from 'vitest';

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('constructor', () => {
    it('should initialize with empty head, tail and length at 0', () => {
      expect(stack.head).toBeNull();
      expect(stack.tail).toBeNull();
      expect(stack.length).toBe(0);
    });
  });

  describe('push', () => {
    it('should add a new element to an empty stack', () => {
      const length = stack.push(10);
      expect(length).toBe(1);
      expect(stack.length).toBe(1);
      expect(stack.head).toBe(stack.tail);
      expect(stack.head?.value).toBe(10);
      expect(stack.head?.next).toBeNull();
    });

    it('should add multiple elements correctly with proper linking', () => {
      stack.push(1);
      expect(stack.head?.value).toBe(1);
      expect(stack.head).toBe(stack.tail);

      stack.push(2);
      expect(stack.head?.value).toBe(2);
      expect(stack.head?.next?.value).toBe(1);
      expect(stack.tail?.value).toBe(1);

      stack.push(3);
      expect(stack.head?.value).toBe(3);
      expect(stack.head?.next?.value).toBe(2);
      expect(stack.head?.next?.next?.value).toBe(1);
      expect(stack.tail?.value).toBe(1);
    });

    it('should maintain correct references between nodes', () => {
      stack.push(1);
      const firstNode = stack.head;
      stack.push(2);
      const secondNode = stack.head;

      expect(secondNode?.next).toBe(firstNode);
      expect(firstNode?.next).toBeNull();
      expect(stack.tail).toBe(firstNode);
    });

    it('should increase length correctly', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.length).toBe(3);
    });

    it('should work with string value types', () => {
      stack.push('a');
      expect(stack.head?.value).toBe('a');

    });

    it('should work with object value types', () => {
      stack.push({id: 1});
      expect(stack.head?.value.id).toBe(1);
    });
  });

  describe('pop', () => {
    it('should return null on an empty stack', () => {
      const result = stack.pop();
      expect(result).toBeNull();
      expect(stack.length).toBe(0);
    });

    it('should remove and return the head element from a single-element stack', () => {
      stack.push(10);
      const popped = stack.pop();

      expect(popped?.value).toBe(10);
      expect(stack.length).toBe(0);
      expect(stack.head).toBeNull();
      expect(stack.tail).toBeNull();
    });

    it('should remove and return the head element from a multi-element stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.head?.value).toBe(3);
      expect(stack.head?.next?.value).toBe(2);
      expect(stack.tail?.value).toBe(1);

      let popped = stack.pop();
      expect(popped?.value).toBe(3);
      expect(stack.length).toBe(2);
      expect(stack.head?.value).toBe(2);
      expect(stack.head?.next?.value).toBe(1);
      expect(stack.tail?.value).toBe(1);

      popped = stack.pop();
      expect(popped?.value).toBe(2);
      expect(stack.length).toBe(1);
      expect(stack.head?.value).toBe(1);
      expect(stack.tail?.value).toBe(1);

      popped = stack.pop();
      expect(popped?.value).toBe(1);
      expect(stack.length).toBe(0);
      expect(stack.head).toBeNull();
      expect(stack.tail).toBeNull();
    });
  });

  describe('push and pop sequence', () => {
    it('should handle alternating push and pop operations', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.pop()?.value).toBe(2);

      stack.push(3);
      stack.push(4);
      expect(stack.pop()?.value).toBe(4);
      expect(stack.pop()?.value).toBe(3);
      expect(stack.pop()?.value).toBe(1);
      expect(stack.pop()).toBeNull();
    });

    it('should maintain correct length after multiple operations', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.length).toBe(2);

      stack.pop();
      expect(stack.length).toBe(1);

      stack.push(3);
      expect(stack.length).toBe(2);

      stack.pop();
      stack.pop();
      expect(stack.length).toBe(0);
    });
  });

  describe('Node class', () => {
    it('should initialize a Node with the correct value', () => {
      const node = new Node(10);
      expect(node.value).toBe(10);
      expect(node.next).toBeNull();
    });
  });

  describe('error cases', () => {
    it('should handle pushing undefined values when type allows it', () => {
      stack.push(null);
      expect(stack.length).toBe(1);
      expect(stack.head?.value).toBeNull();
    });
  });
});
