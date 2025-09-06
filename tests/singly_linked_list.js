import { SinglyLinkedList, Node } from "../src/data-structures/singly_linked_list";
import { describe, expect, it, beforeEach } from "vitest";

describe("SinglyLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  describe("constructor", () => {
    it("should initialize with empty head, tail, and length 0", () => {
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });

  describe("push", () => {
    it("should add an element to an empty list", () => {
      list.push(10);
      expect(list.length).toBe(1);
      expect(list.head.value).toBe(10);
      expect(list.tail.value).toBe(10);
    });

    it("should add multiple elements correctly", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.length).toBe(3);
      expect(list.head.value).toBe(1);
      expect(list.tail.value).toBe(3);
      expect(list.head.next.value).toBe(2);
      expect(list.head.next.next.value).toBe(3);
      expect(list.head.next.next.next).toBeNull();
    });

    it("should return the list instance for chaining", () => {
      const result = list.push(1).push(2);
      expect(result).toBe(list);
      expect(list.length).toBe(2);
    });
  });

  describe("pop", () => {
    it("should return undefined for an empty list", () => {
      expect(list.pop()).toBeUndefined();
    });

    it("should remove and return the tail element from a single-element list", () => {
      list.push(10);
      const popped = list.pop();
      expect(popped.value).toBe(10);
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it("should remove and return the tail element from a multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const popped = list.pop();
      expect(popped.value).toBe(3);
      expect(list.length).toBe(2);
      expect(list.head.value).toBe(1);
      expect(list.tail.value).toBe(2);
      expect(list.tail.next).toBeNull();
    });

    it("should correctly update tail reference when popping", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();
      expect(list.tail.value).toBe(2);
      expect(list.length).toBe(2);

      list.pop();
      expect(list.tail.value).toBe(1);
      expect(list.length).toBe(1);

      list.pop();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });

  describe("shift", () => {
    it("should return undefined for an empty list", () => {
      expect(list.shift()).toBeUndefined();
    });

    it("should remove and return the head element from a single-element list", () => {
      list.push(10);
      const shifted = list.shift();
      expect(shifted.value).toBe(10);
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it("should remove and return the head element from a multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const shifted = list.shift();
      expect(shifted.value).toBe(1);
      expect(list.length).toBe(2);
      expect(list.head.value).toBe(2);
      expect(list.tail.value).toBe(3);
    });

    it("should correctly update tail reference when shifting to last element", () => {
      list.push(1);
      list.push(2);

      list.shift();
      expect(list.head.value).toBe(2);
      expect(list.tail.value).toBe(2);
      expect(list.head).toBe(list.tail);
      expect(list.length).toBe(1);
    });
  });

  describe("unshift", () => {
    it("should add an element to an empty list", () => {
      list.unshift(10);
      expect(list.length).toBe(1);
      expect(list.head.value).toBe(10);
      expect(list.tail.value).toBe(10);
    });

    it("should add elements to the beginning of the list", () => {
      list.unshift(1);
      list.unshift(2);
      list.unshift(3);

      expect(list.length).toBe(3);
      expect(list.head.value).toBe(3);
      expect(list.tail.value).toBe(1);
      expect(list.head.next.value).toBe(2);
      expect(list.head.next.next.value).toBe(1);
    });

    it("should return the list instance for chaining", () => {
      const result = list.unshift(1).unshift(2);
      expect(result).toBe(list);
      expect(list.length).toBe(2);
      expect(list.head.value).toBe(2);
    });
  });

  describe("get", () => {
    it("should return null for an empty list", () => {
      expect(list.get(0)).toBeNull();
    });

    it("should return null for an out-of-bounds index", () => {
      expect(list.get(-1)).toBeNull();
      expect(list.get(1)).toBeNull();
    });

    it("should return the correct node at a valid index", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const node0 = list.get(0);
      const node1 = list.get(1);
      const node2 = list.get(2);

      expect(node0.value).toBe(1);
      expect(node1.value).toBe(2);
      expect(node2.value).toBe(3);
    });
  });

  describe("set", () => {
    it("should return false for invalid indexes", () => {
      expect(list.set(-1, 2)).toBe(false);
      expect(list.set(1, 2)).toBe(false);
      expect(list.length).toBe(0);
    });

    it("should update the value at a valid index", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.set(1, 20)).toBe(true);
      expect(list.get(1).value).toBe(20);
      expect(list.get(0).value).toBe(1);
      expect(list.get(2).value).toBe(3);
      expect(list.length).toBe(3);
    });

    it("should update the head value when setting index 0", () => {
      list.push(1);
      expect(list.set(0, 10)).toBe(true);
      expect(list.head.value).toBe(10);
      expect(list.get(0).value).toBe(10);
    });

    it("should update the tail value when setting the last index", () => {
      list.push(1);
      list.push(2);

      expect(list.set(1, 20)).toBe(true);
      expect(list.tail.value).toBe(20);
      expect(list.get(1).value).toBe(20);
    });
  });

  describe("insert", () => {
    it("should insert at start if index <= 0", () => {
      list.insert(1, -1);
      expect(list.head.value).toBe(1);
    });

    it("should insert at end if index <= 0", () => {
      list.insert(1, 0);
      list.insert(2, 5);
      expect(list.tail.value).toBe(2);
    });

    it("should insert at the correct position in the middle", () => {
      list.push(1);
      list.push(3);

      expect(list.insert(2, 1)).toBe(true);
      expect(list.length).toBe(3);
      expect(list.get(0).value).toBe(1);
      expect(list.get(1).value).toBe(2);
      expect(list.get(2).value).toBe(3);
      expect(list.head.next.value).toBe(2);
      expect(list.head.next.next.value).toBe(3);
      expect(list.tail.value).toBe(3);
    });

    it("should correctly handle insertion in a single-element list", () => {
      list.push(1);
      list.insert(0, 0);
      expect(list.head.value).toBe(0);
      expect(list.tail.value).toBe(1);
      expect(list.length).toBe(2);
    });
  });

  describe("remove", () => {
    it("should return undefined for invalid indexes", () => {
      expect(list.remove(-1)).toBeUndefined();
      expect(list.remove(0)).toBeUndefined();
    });

    it("should use shift() when removing the first element", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const removed = list.remove(0);
      expect(removed.value).toBe(1);
      expect(list.head.value).toBe(2);
      expect(list.length).toBe(2);
    });

    it("should use pop() when removing the last element", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const removed = list.remove(2);
      expect(removed.value).toBe(3);
      expect(list.tail.value).toBe(2);
      expect(list.length).toBe(2);
    });

    it("should correctly remove elements from the middle", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      const removed = list.remove(2);
      expect(removed.value).toBe(3);
      expect(list.length).toBe(3);
      expect(list.get(0).value).toBe(1);
      expect(list.get(1).value).toBe(2);
      expect(list.get(2).value).toBe(4);
      expect(list.get(2).next).toBeNull();
    });

    it("should correctly update head and tail when removing elements", () => {
      list.push(1);
      list.push(2);
      list.remove(0);
      expect(list.head.value).toBe(2);
      expect(list.tail.value).toBe(2);
    });
  });

  describe("reverse", () => {
    it("should do nothing for an empty list", () => {
      list.reverse();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });

    it("should do nothing for a single-element list", () => {
      list.push(1);
      const originalHead = list.head;
      list.reverse();
      expect(list.head).toBe(originalHead);
      expect(list.tail).toBe(originalHead);
      expect(list.length).toBe(1);
    });

    it("should reverse a multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.reverse();

      expect(list.head.value).toBe(3);
      expect(list.head.next.value).toBe(2);
      expect(list.tail.value).toBe(1);
      expect(list.head.next.next).toBe(list.tail);
      expect(list.tail.next).toBeNull();
    });

    it("should correctly update head and tail pointers after reversal", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      const originalHead = list.head;
      const originalTail = list.tail;
      list.reverse();
      expect(list.head).toBe(originalTail);
      expect(list.tail).toBe(originalHead);
    });

    it("should handle a two-element list correctly", () => {
      list.push(1);
      list.push(2);
      list.reverse();
      expect(list.head.value).toBe(2);
      expect(list.tail.value).toBe(1);
      expect(list.head.next).toBe(list.tail);
      expect(list.tail.next).toBeNull();
    });
  });

  describe("traverse", () => {
    it("should return an empty array for an empty list", () => {
      expect(list.traverse()).toEqual([]);
    });

    it("should return all values in order for a populated list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.traverse()).toEqual([1, 2, 3]);
    });

    it("should work correctly after operations that modify the list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.pop();
      list.shift();

      expect(list.traverse()).toEqual([2]);
    });
  });

  describe("edge cases", () => {
    it("should maintain consistency after multiple operations", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      // [1,2,3,4]
      list.remove(1);
      list.remove(1);
      // [1,4]
      list.unshift(0);
      // [0,1,4]
      list.push(5);
      // [0,1,4,5]
      expect(list.traverse()).toEqual([0, 1, 4, 5]);
      expect(list.length).toBe(4);
      expect(list.head.value).toBe(0);
      expect(list.tail.value).toBe(5);
    });

    it("should handle operations on a list with one element", () => {
      list.push(1);
      expect(list.pop().value).toBe(1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
      list.push(2);

      expect(list.shift().value).toBe(2);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);

      list.insert(3, 0);
      expect(list.head.value).toBe(3);
      expect(list.tail.value).toBe(3);

      list.insert(4, 1);
      expect(list.head.value).toBe(3);
      expect(list.tail.value).toBe(4);
      expect(list.length).toBe(2);
    });

    it("should correctly handle multiple consecutive operations", () => {
      // Test sequence: push, push, pop, shift, unshift, insert, remove, reverse
      list.push(1);
      list.push(2);
      expect(list.pop().value).toBe(2);
      expect(list.shift().value).toBe(1);
      list.unshift(3);
      list.insert(4, 1); // Insert after position 0
      list.remove(1); // Remove the 4 we just added
      list.reverse(); // Should do nothing for single-element list

      expect(list.traverse()).toEqual([3]);
    });
  });

  describe("Node class", () => {
    it("should initialize with the correct value and null next", () => {
      const node = new Node(10);
      expect(node.value).toBe(10);
      expect(node.next).toBeNull();
    });

    it("should work with string value types", () => {
      const stringNode = new Node("hello");
      expect(stringNode.value).toBe("hello");
      expect(stringNode.next).toBeNull();
    });

    it("should work with object value types", () => {
      const objNode = new Node({ id: 1 });
      expect(objNode.value.id).toBe(1);
      expect(objNode.next).toBeNull();
    });
  });
});
