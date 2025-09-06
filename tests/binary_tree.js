import { BinarySearchTree, Node } from "../src/data-structures/binary_tree";
import { describe, expect, it, beforeEach } from "vitest";

describe("BinarySearchTree", () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
  });

  describe("constructor", () => {
    it("should initialize with null root", () => {
      expect(bst.root).toBeNull();
    });
  });

  describe("insert", () => {
    it("should insert a value into an empty tree", () => {
      const result = bst.insert(10);
      expect(result).toBe(bst);
      expect(bst.root?.value).toBe(10);
      expect(bst.root?.left).toBeNull();
      expect(bst.root?.right).toBeNull();
    });

    it("should insert values in correct positions", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);

      //        10
      //    5        15
      // 3    7   12   20

      const root = bst.root;
      expect(root?.value).toBe(10);

      expect(root?.left?.value).toBe(5);
      expect(root?.left?.left?.value).toBe(3);
      expect(root?.left?.right?.value).toBe(7);

      expect(root?.right?.value).toBe(15);
      expect(root?.right?.left?.value).toBe(12);
      expect(root?.right?.right?.value).toBe(20);
    });

    it("should return undefined for duplicate values", () => {
      bst.insert(10);
      const result = bst.insert(10);
      expect(result).toBeUndefined();
      expect(bst.root?.value).toBe(10);
      expect(bst.root?.left).toBeNull();
      expect(bst.root?.right).toBeNull();
    });

    it("should work with string values", () => {
      bst.insert("banana");
      bst.insert("apple");
      bst.insert("cherry");

      const root = bst.root;
      expect(root?.value).toBe("banana");
      expect(root?.left?.value).toBe("apple");
      expect(root?.right?.value).toBe("cherry");
    });
  });

  describe("find", () => {
    it("should return null for an empty tree", () => {
      expect(bst.find(10)).toBeNull();
    });

    it("should return null for non-existent values", () => {
      bst.insert(10);
      expect(bst.find(20)).toBeNull();
    });

    it("should find existing values", () => {
      bst.insert(10).insert(5).insert(15);

      expect(bst.find(10)?.value).toBe(10);
      expect(bst.find(5)?.value).toBe(5);
      expect(bst.find(15)?.value).toBe(15);
    });
  });

  describe("contains", () => {
    it("should return false for an empty tree", () => {
      expect(bst.contains(10)).toBe(false);
    });

    it("should return false for non-existent values", () => {
      bst.insert(10);
      expect(bst.contains(3)).toBe(false);
    });

    it("should return true for existing values", () => {
      bst.insert(10).insert(5).insert(15);

      expect(bst.contains(10)).toBe(true);
      expect(bst.contains(5)).toBe(true);
      expect(bst.contains(15)).toBe(true);
    });
  });

  describe("remove", () => {
    it("should return null for an empty tree", () => {
      expect(bst.remove(10)).toBeNull();
    });

    it("should return null for non-existent values", () => {
      bst.insert(10);
      expect(bst.remove(20)).toBeNull();
    });

    it("should remove leaf nodes", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7);
      const removed = bst.remove(3);
      expect(removed?.value).toBe(3);
      expect(bst.contains(3)).toBe(false);
      expect(bst.root?.left?.left).toBeNull();

      expect(bst.root?.left?.value).toBe(5);
      expect(bst.root?.left?.right?.value).toBe(7);
    });

    it("should remove nodes with one child", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7);
      const removed = bst.remove(5);
      expect(removed?.value).toBe(5);
      expect(bst.contains(5)).toBe(false);
      expect(bst.root?.left?.value).toBe(7);
    });

    it("should remove nodes with two children", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      bst.remove(5);
      expect(bst.contains(5)).toBe(false);
      expect(bst.root?.left?.value).toBe(7);
      expect(bst.root?.left?.left?.value).toBe(3);
    });

    it("should remove the root when it has no children", () => {
      bst.insert(10);
      const removed = bst.remove(10);
      expect(removed?.value).toBe(10);
      expect(bst.root).toBeNull();
      expect(bst.contains(10)).toBe(false);
    });

    it("should remove the root when it has one child", () => {
      bst.insert(10).insert(5);
      const removed = bst.remove(10);
      expect(removed?.value).toBe(10);
      expect(bst.root?.value).toBe(5);
      expect(bst.contains(10)).toBe(false);
    });
  });

  describe("isBalanced", () => {
    it("should return true for empty tree", () => {
      expect(bst.isBalanced()).toBe(true);
    });

    it("should return true for single trees", () => {
      bst.insert(10);
      expect(bst.isBalanced()).toBe(true);
    });

    it("should return true for balanced trees", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      expect(bst.isBalanced()).toBe(true);
    });

    it("should return false for left unbalanced trees", () => {
      bst.insert(10).insert(5).insert(3).insert(2).insert(1);
      expect(bst.isBalanced()).toBe(false);
    });

    it("should return false for right unbalanced trees", () => {
      bst.insert(10).insert(15).insert(20).insert(25).insert(30);
      expect(bst.isBalanced()).toBe(false);
    });
  });

  describe("DFSPreOrder", () => {
    it("should return empty array for empty tree", () => {
      expect(bst.DFSPreOrder()).toEqual([]);
    });

    it("should return correct pre-order traversal", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      const result = bst.DFSPreOrder();
      expect(result).toEqual([10, 5, 3, 7, 15, 12, 20]);
    });

    it("should work with single node", () => {
      bst.insert(10);
      expect(bst.DFSPreOrder()).toEqual([10]);
    });
  });

  describe("DFSInOrder", () => {
    it("should return empty array for empty tree", () => {
      expect(bst.DFSInOrder()).toEqual([]);
    });

    it("should return correct in-order traversal (sorted)", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      const result = bst.DFSInOrder();
      expect(result).toEqual([3, 5, 7, 10, 12, 15, 20]);
    });

    it("should work with single node", () => {
      bst.insert(10);
      expect(bst.DFSInOrder()).toEqual([10]);
    });

    it("should work with left-skewed tree", () => {
      bst.insert(10).insert(5).insert(3).insert(2).insert(1);
      expect(bst.BFS()).toEqual([10, 5, 3, 2, 1]);
    });

    it("should work with right-skewed tree", () => {
      bst.insert(10).insert(15).insert(20).insert(25).insert(30);
      expect(bst.BFS()).toEqual([10, 15, 20, 25, 30]);
    });
  });

  describe("DFSPostOrder", () => {
    it("should return empty array for empty tree", () => {
      expect(bst.DFSPostOrder()).toEqual([]);
    });

    it("should return correct post-order traversal", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      const result = bst.DFSPostOrder();
      expect(result).toEqual([3, 7, 5, 12, 20, 15, 10]);
    });

    it("should work with single node", () => {
      bst.insert(10);
      expect(bst.DFSPostOrder()).toEqual([10]);
    });

    it("should work with left-skewed tree", () => {
      bst.insert(10).insert(5).insert(3).insert(2).insert(1);
      expect(bst.BFS()).toEqual([10, 5, 3, 2, 1]);
    });

    it("should work with right-skewed tree", () => {
      bst.insert(10).insert(15).insert(20).insert(25).insert(30);
      expect(bst.BFS()).toEqual([10, 15, 20, 25, 30]);
    });
  });

  describe("BFS", () => {
    it("should return empty array for empty tree", () => {
      expect(bst.BFS()).toEqual([]);
    });

    it("should return correct level-order traversal", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      const result = bst.BFS();
      expect(result).toEqual([10, 5, 15, 3, 7, 12, 20]);
    });

    it("should work with single node", () => {
      bst.insert(10);
      expect(bst.BFS()).toEqual([10]);
    });

    it("should work with left-skewed tree", () => {
      bst.insert(10).insert(5).insert(3).insert(2).insert(1);
      expect(bst.BFS()).toEqual([10, 5, 3, 2, 1]);
    });

    it("should work with right-skewed tree", () => {
      bst.insert(10).insert(15).insert(20).insert(25).insert(30);
      expect(bst.BFS()).toEqual([10, 15, 20, 25, 30]);
    });
  });

  describe("Node class", () => {
    it("should initialize with correct value and null children", () => {
      const node = new Node(10);
      expect(node.value).toBe(10);
      expect(node.left).toBeNull();
      expect(node.right).toBeNull();
    });

    it("should work with different value types", () => {
      const stringNode = new Node("hello");
      expect(stringNode.value).toBe("hello");

      const objNode = new Node({ id: 1 });
      expect(objNode.value.id).toBe(1);
    });
  });

  describe("complex scenarios", () => {
    it("should maintain BST properties after multiple operations", () => {
      bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);
      expect(bst.DFSInOrder()).toEqual([3, 5, 7, 10, 12, 15, 20]);

      //        10
      //    5        15
      // 3    7   12   20

      bst.remove(5);
      bst.remove(3);
      bst.remove(20);

      //        10
      //    7        15
      //           12

      const inOrder = bst.DFSInOrder();
      expect(inOrder).toEqual([7, 10, 12, 15]);

      // Verify contains works correctly after removals
      expect(bst.contains(7)).toBe(true);
      expect(bst.contains(3)).toBe(false);
    });

    it("should handle duplicate values correctly", () => {
      expect(bst.insert(10)).toBe(bst);
      expect(bst.insert(10)).toBeUndefined();
      expect(bst.contains(10)).toBe(true);
      expect(bst.remove(10)).not.toBeNull();
      expect(bst.contains(10)).toBe(false);
    });

    it("should maintain balance information correctly", () => {
      bst.insert(10).insert(5).insert(15);
      expect(bst.isBalanced()).toBe(true);

      bst.insert(3).insert(4);
      expect(bst.isBalanced()).toBe(false);

      bst.remove(4);
      expect(bst.isBalanced()).toBe(true);
    });
  });
});
