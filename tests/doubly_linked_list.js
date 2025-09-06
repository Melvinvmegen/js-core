import { DoublyLinkedList, Node } from "../src/data-structures/doubly_linked_list";
import { describe, it, expect, beforeEach } from "vitest";

describe("DoublyLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new DoublyLinkedList();
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
      expect(list.head?.value).toBe(10);
      expect(list.tail?.value).toBe(10);
      expect(list.head).toBe(list.tail);
    });

    it("should add multiple elements correctly", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.length).toBe(3);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(3);

      expect(list.head?.next?.value).toBe(2);
      expect(list.head?.next?.next?.value).toBe(3);
      expect(list.head?.next?.next?.next).toBeNull();
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
      expect(popped?.value).toBe(10);
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it("should remove and return the tail element from a multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const popped = list.pop();
      expect(popped?.value).toBe(3);
      expect(list.length).toBe(2);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(2);
      expect(list.head?.next).toBe(list.tail);
      expect(list.tail?.prev).toBe(list.head);
      expect(list.tail?.next).toBeNull();
    });

    it("should correctly update tail reference when popping", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      list.pop();
      expect(list.tail?.value).toBe(2);
      expect(list.length).toBe(2);
      expect(list.tail?.next).toBeNull();
    });
  });

  describe("shift", () => {
    it("should return undefined for an empty list", () => {
      expect(list.shift()).toBeUndefined();
    });

    it("should remove and return the head element from a single-element list", () => {
      list.push(10);
      const shifted = list.shift();
      expect(shifted?.value).toBe(10);
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it("should remove and return the head element from a multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const shifted = list.shift();
      expect(shifted?.value).toBe(1);
      expect(list.length).toBe(2);
      expect(list.head?.value).toBe(2);
      expect(list.tail?.value).toBe(3);
      expect(list.head.next.value).toBe(3);
      expect(list.head?.next).toBe(list.tail);
      expect(list.tail?.prev).toBe(list.head);
    });

    it("should correctly update head and tail references when shifting to last element", () => {
      list.push(1);
      list.push(2);
      list.shift();
      list.shift();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });

  describe("unshift", () => {
    it("should add an element to an empty list", () => {
      list.unshift(10);
      expect(list.length).toBe(1);
      expect(list.head?.value).toBe(10);
      expect(list.tail?.value).toBe(10);
    });

    it("should add elements to the beginning of the list", () => {
      list.unshift(1);
      list.unshift(2);
      list.unshift(3);

      expect(list.length).toBe(3);
      expect(list.head?.value).toBe(3);
      expect(list.tail?.value).toBe(1);

      expect(list.head?.next?.value).toBe(2);
      expect(list.head?.next?.next?.value).toBe(1);

      expect(list.tail?.prev?.value).toBe(2);
      expect(list.tail?.prev?.prev?.value).toBe(3);
    });

    it("should return the list instance for chaining", () => {
      const result = list.unshift(1).unshift(2);
      expect(result).toBe(list);
      expect(list.length).toBe(2);
      expect(list.head?.value).toBe(2);
    });
  });

  describe("get", () => {
    it("should return null for an empty list", () => {
      expect(list.get(0)).toBeNull();
    });

    it("should return null for an out-of-bounds index", () => {
      list.push(1);
      expect(list.get(-1)).toBeNull();
      expect(list.get(1)).toBeNull();
    });

    it("should return the correct node at a valid index", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      const node0 = list.get(0);
      const node1 = list.get(1);
      const node2 = list.get(2);
      const node3 = list.get(3);

      expect(node0?.value).toBe(1);
      expect(node1?.value).toBe(2);
      expect(node2?.value).toBe(3);
      expect(node3?.value).toBe(4);

      expect(node0?.next).toBe(node1);
      expect(node1?.prev).toBe(node0);
      expect(node1?.next).toBe(node2);
      expect(node2?.prev).toBe(node1);
      expect(node2?.next).toBe(node3);
      expect(node3?.prev).toBe(node2);
    });

    it("should use optimized path for indices in the second half of the list", () => {
      for (let i = 1; i <= 10; i++) {
        list.push(i);
      }

      const node7 = list.get(7);
      expect(node7?.value).toBe(8);
    });
  });

  describe("set", () => {
    it("should return false for invalid indices", () => {
      list.push(1);
      expect(list.set(-1, 2)).toBe(false);
      expect(list.set(1, 2)).toBe(false);
      expect(list.length).toBe(1);
    });

    it("should update the value at a valid index", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.set(1, 20)).toBe(true);
      expect(list.get(1)?.value).toBe(20);

      expect(list.get(0)?.value).toBe(1);
      expect(list.get(2)?.value).toBe(3);
      expect(list.length).toBe(3);
    });

    it("should update the head value when setting index 0", () => {
      list.push(1);
      list.push(2);

      expect(list.set(0, 10)).toBe(true);
      expect(list.head?.value).toBe(10);
      expect(list.get(0)?.value).toBe(10);
    });

    it("should update the tail value when setting the last index", () => {
      list.push(1);
      list.push(2);

      expect(list.set(1, 20)).toBe(true);
      expect(list.tail?.value).toBe(20);
      expect(list.get(1)?.value).toBe(20);
    });
  });

  describe("insert", () => {
    it("should insert at the beginning if index <= 0", () => {
      expect(list.insert(1, 0)).toBe(true);
      expect(list.head?.value).toBe(1);
      expect(list.length).toBe(1);
      expect(list.insert(2, -10)).toBe(true);
      expect(list.head?.value).toBe(2);
      expect(list.length).toBe(2);
    });

    it("should insert at the end if index >= length", () => {
      expect(list.insert(2, 5)).toBe(true);
      expect(list.tail?.value).toBe(2);
      expect(list.length).toBe(1);
    });

    it("should insert at the correct position in the middle", () => {
      list.push(1);
      list.push(3);

      expect(list.insert(2, 1)).toBe(true);
      expect(list.length).toBe(3);
      const node1 = list.get(0);
      const node2 = list.get(1);
      const node3 = list.get(2);

      expect(node1?.value).toBe(1);
      expect(node2?.value).toBe(2);
      expect(node3?.value).toBe(3);

      expect(node1?.next).toBe(node2);
      expect(node2?.prev).toBe(node1);
      expect(node2?.next).toBe(node3);
      expect(node3?.prev).toBe(node2);
    });

    it("should correctly handle insertion in a single-element list", () => {
      list.push(1);
      expect(list.insert(0, 0)).toBe(true);
      expect(list.head?.value).toBe(0);
      expect(list.tail?.value).toBe(1);
      expect(list.length).toBe(2);
    });
  });

  describe("remove", () => {
    it("should return undefined for invalid indices", () => {
      expect(list.remove(-1)).toBeUndefined();
    });

    it("should use shift() when removing the first element", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const removed = list.remove(0);
      expect(removed?.value).toBe(1);
      expect(list.head?.value).toBe(2);
      expect(list.tail?.value).toBe(3);
      expect(list.length).toBe(2);
    });

    it("should use pop() when removing the last element", () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const removed = list.remove(2);
      expect(removed?.value).toBe(3);
      expect(list.tail?.value).toBe(2);
      expect(list.length).toBe(2);
    });

    it("should correctly remove elements from the middle", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);

      const removed = list.remove(2);
      expect(removed?.value).toBe(3);
      expect(list.length).toBe(4);

      expect(list.head?.value).toBe(1);
      const node2 = list.get(1);
      const node4 = list.get(2);
      expect(node2?.value).toBe(2);
      expect(node4?.value).toBe(4);
      expect(list.get(3)?.value).toBe(5);
      expect(node2?.next).toBe(node4);
      expect(node4?.prev).toBe(node2);
    });

    it("should correctly update head and tail when removing elements", () => {
      list.push(1);
      list.push(2);
      list.remove(0);

      expect(list.head?.value).toBe(2);
      expect(list.tail?.value).toBe(2);
      expect(list.head).toBe(list.tail);
      expect(list.length).toBe(1);
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
      list.push(4);

      list.reverse();

      const node1 = list.head;
      const node2 = list.head?.next;
      const node3 = list.head?.next?.next;
      const node4 = list.tail;
      expect(node1?.value).toBe(4);
      expect(node2?.value).toBe(3);
      expect(node3?.value).toBe(2);
      expect(node4?.value).toBe(1);

      // Verify next pointers
      expect(node1?.next).toBe(node2);
      expect(node2?.next).toBe(node3);
      expect(node3?.next).toBe(node4);
      expect(node4?.next).toBeNull();

      // Verify prev pointers
      expect(node4?.prev).toBe(node3);
      expect(node3?.prev).toBe(node2);
      expect(node2?.prev).toBe(node1);
      expect(node1?.prev).toBeNull();
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
  });

  describe("edge cases", () => {
    it("should maintain consistency after multiple operations", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      list.remove(1);
      list.remove(1); // Now list is [1,4]

      // Add elements at both ends
      list.unshift(0);
      list.push(5); // Now list is [0,1,4,5]

      // Verify the final list state
      expect(list.get(0)?.value).toBe(0);
      expect(list.get(1)?.value).toBe(1);
      expect(list.get(2)?.value).toBe(4);
      expect(list.get(3)?.value).toBe(5);
      expect(list.length).toBe(4);

      // Verify head and tail
      expect(list.head?.value).toBe(0);
      expect(list.tail?.value).toBe(5);

      // Verify links
      const node0 = list.get(0);
      const node1 = list.get(1);
      const node4 = list.get(2);
      const node5 = list.get(3);

      expect(node0?.next).toBe(node1);
      expect(node1?.prev).toBe(node0);
      expect(node1?.next).toBe(node4);
      expect(node4?.prev).toBe(node1);
      expect(node4?.next).toBe(node5);
      expect(node5?.prev).toBe(node4);
    });

    it("should handle operations on a list with one element", () => {
      list.push(1);

      // Test pop
      const popped = list.pop();
      expect(popped?.value).toBe(1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);

      // Reset
      list.push(2);

      // Test shift
      const shifted = list.shift();
      expect(shifted?.value).toBe(2);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);

      list.insert(3, 0);
      expect(list.head?.value).toBe(3);
      expect(list.tail?.value).toBe(3);

      list.insert(4, 1);
      expect(list.head?.value).toBe(3);
      expect(list.tail?.value).toBe(4);
      expect(list.length).toBe(2);
    });

    it("should correctly handle multiple consecutive operations", () => {
      // Test sequence: push, push, pop, shift, unshift, insert, remove, reverse
      list.push(1); // [1]
      list.push(2); // [1, 2]
      expect(list.pop()?.value).toBe(2); // [1]
      expect(list.shift()?.value).toBe(1); // []
      list.unshift(3); // [3]
      list.insert(4, 1); // [3, 4]
      list.remove(1); // [3]
      list.reverse();

      expect(list.head?.value).toBe(3);
      expect(list.tail?.value).toBe(3);
      expect(list.length).toBe(1);
    });

    it("should handle empty list operations correctly", () => {
      expect(list.pop()).toBeUndefined();
      expect(list.shift()).toBeUndefined();
      expect(list.remove(0)).toBeUndefined();
      expect(list.get(0)).toBeNull();
      expect(list.set(0, 10)).toBe(false);

      const result1 = list.push(1);
      expect(result1).toBe(list);
      const result2 = list.unshift(0);
      expect(result2).toBe(list);

      expect(list.length).toBe(2);
      expect(list.head?.value).toBe(0);
      expect(list.tail?.value).toBe(1);
    });
  });

  describe("Node class", () => {
    it("should initialize with correct value and null prev/next", () => {
      const node = new Node(10);
      expect(node.value).toBe(10);
      expect(node.prev).toBeNull();
      expect(node.next).toBeNull();
    });

    it("should work with different value types", () => {
      const stringNode = new Node("hello");
      expect(stringNode.value).toBe("hello");

      const objNode = new Node({ id: 1 });
      expect(objNode.value.id).toBe(1);
    });
  });
});
