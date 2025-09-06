import { MaxBinaryHeap } from "../src/data-structures/heap";
import { describe, expect, it, beforeEach } from "vitest";

describe("MaxBinaryHeap", () => {
  let heap;

  beforeEach(() => {
    heap = new MaxBinaryHeap();
  });

  describe("constructor", () => {
    it("should initialize with an empty array", () => {
      expect(heap.size()).toBe(0);
    });
  });

  describe("insert", () => {
    it("should add a single value correctly", () => {
      heap.insert(10);
      expect(heap.peek()).toBe(10);
      expect(heap.size()).toBe(1);
    });

    it("should maintain heap property with multiple inserts", () => {
      heap.insert(10);
      heap.insert(20);
      heap.insert(5);
      heap.insert(30);
      heap.insert(15);

      const values = heap.values;

      for (let i = 1; i < values.length; i++) {
        const parentIndex = Math.round((i - 1) / 2);
        expect(values[i]).toBeLessThanOrEqual(values[parentIndex]);
      }
    });

    it("should maintain heap property with duplicate values", () => {
      heap.insert(10);
      heap.insert(10);
      heap.insert(5);
      heap.insert(10);
      heap.insert(1);

      expect(heap.peek()).toBe(10);
      expect(heap.size()).toBe(5);
    });

    it("should work with negative numbers", () => {
      heap.insert(-5);
      heap.insert(-10);
      heap.insert(-1);
      expect(heap.peek()).toBe(-1);
      expect(heap.size()).toBe(3);
    });

    it("should maintain correct order when inserting in descending order", () => {
      heap.insert(10);
      heap.insert(9);
      heap.insert(8);
      heap.insert(7);

      expect(heap.peek()).toBe(10);
    });

    it("should maintain correct order when inserting in ascending order", () => {
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);
      heap.insert(4);

      expect(heap.peek()).toBe(4);
    });
  });

  describe("extractMax", () => {
    it("should return undefined for an empty heap", () => {
      expect(heap.extractMax()).toBeUndefined();
    });

    it("should remove and return the max value", () => {
      heap.insert(10);
      heap.insert(20);
      heap.insert(5);

      const max = heap.extractMax();
      expect(max).toBe(20);
      expect(heap.peek()).toBe(10);
    });

    it("should maintain heap property after extraction", () => {
      heap.insert(10);
      heap.insert(20);
      heap.insert(5);
      heap.insert(15);

      heap.extractMax();
      const values = heap.values;

      for (let i = 1; i < values.length; i++) {
        const parentIndex = Math.round((i - 1) / 2);
        expect(values[i]).toBeLessThanOrEqual(values[parentIndex]);
      }
    });

    it("should handle extracting all elements from small heap", () => {
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);

      expect(heap.extractMax()).toBe(3);
      expect(heap.extractMax()).toBe(2);
      expect(heap.extractMax()).toBe(1);
      expect(heap.extractMax()).toBeUndefined();
      expect(heap.size()).toBe(0);
    });

    it("should handle multiple extractions correctly", () => {
      heap.insert(5);
      heap.insert(1);
      heap.insert(3);
      heap.insert(2);
      heap.insert(4);

      const sorted = [];
      let max;
      do {
        max = heap.extractMax();
        if (max !== undefined) {
          sorted.push(max);
        }
      } while (max !== undefined);

      expect(sorted).toEqual([5, 4, 3, 2, 1]);
    });

    it("should work with negative numbers", () => {
      heap.insert(-1);
      heap.insert(-5);
      heap.insert(-3);

      expect(heap.extractMax()).toBe(-1);
    });
  });

  describe("peek", () => {
    it("should return undefined for an empty heap", () => {
      expect(heap.peek()).toBeUndefined();
    });

    it("should return the max value without removing it", () => {
      heap.insert(10);
      heap.insert(20);
      heap.insert(5);

      expect(heap.peek()).toBe(20);
      expect(heap.size()).toBe(3);
    });

    it("should return undefined for an empty heap after extractions", () => {
      heap.insert(1);
      heap.extractMax();
      expect(heap.peek()).toBeUndefined();
    });
  });

  describe("size", () => {
    it("should return 0 for an empty heap", () => {
      expect(heap.size()).toBe(0);
    });

    it("should return the correct size after insertions", () => {
      heap.insert(1);
      expect(heap.size()).toBe(1);
      heap.insert(2);
      expect(heap.size()).toBe(2);
    });

    it("should return the correct size after extractions", () => {
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);

      expect(heap.size()).toBe(3);
      heap.extractMax();
      expect(heap.size()).toBe(2);
      heap.extractMax();
      expect(heap.size()).toBe(1);
      heap.extractMax();
      expect(heap.size()).toBe(0);
    });
  });

  describe("heapSort", () => {
    it("should return an empty array for empty heap", () => {
      expect(heap.heapSort()).toEqual([]);
    });

    it("should return a sorted array in descending order", () => {
      heap.insert(5);
      heap.insert(1);
      heap.insert(3);
      heap.insert(2);
      heap.insert(4);

      const sorted = heap.heapSort();
      expect(sorted).toEqual([5, 4, 3, 2, 1]);
    });

    it("should maintain original heap state after sorting", () => {
      heap.insert(5);
      heap.insert(1);
      heap.insert(3);

      const originalValues = heap.values.slice();
      heap.heapSort();
      expect(heap.values).toEqual(originalValues);
    });

    it("should work with duplicate values", () => {
      heap.insert(5);
      heap.insert(5);
      heap.insert(3);
      heap.insert(2);
      heap.insert(2);

      const sorted = heap.heapSort();
      expect(sorted).toEqual([5, 5, 3, 2, 2]);
    });

    it("should work with negative numbers", () => {
      heap.insert(-1);
      heap.insert(-5);
      heap.insert(-3);
      heap.insert(-2);

      const sorted = heap.heapSort();
      expect(sorted).toEqual([-1, -2, -3, -5]);
    });
  });

  describe("edge cases", () => {
    it("should handle inserting and extracting the same value multiple times", () => {
      heap.insert(10);
      heap.insert(10);
      heap.insert(10);

      expect(heap.extractMax()).toBe(10);
      expect(heap.extractMax()).toBe(10);
      expect(heap.extractMax()).toBe(10);
      expect(heap.size()).toBe(0);
    });

    it("should work with zero values", () => {
      heap.insert(0);
      heap.insert(0);
      heap.insert(0);

      expect(heap.extractMax()).toBe(0);
      expect(heap.extractMax()).toBe(0);
      expect(heap.extractMax()).toBe(0);
    });

    it("should maintain heap property with large numbers", () => {
      heap.insert(Number.MAX_SAFE_INTEGER);
      expect(heap.extractMax()).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should handle alternating insertions and extractions", () => {
      heap.insert(1);
      expect(heap.extractMax()).toBe(1);

      heap.insert(2);
      heap.insert(3);
      expect(heap.extractMax()).toBe(3);

      heap.insert(4);
      expect(heap.extractMax()).toBe(4);
      expect(heap.extractMax()).toBe(2);

      expect(heap.size()).toBe(0);
    });
  });

  describe("heap property verification", () => {
    function isValidMaxHeap(heap) {
      const values = heap.values;
      for (let i = 0; i < values.length; i++) {
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;

        if (leftIndex < values.length && values[i] < values[leftIndex]) {
          return false;
        }

        if (rightIndex < values.length && values[i] < values[rightIndex]) {
          return false;
        }
      }
      return true;
    }

    it("should maintain the heap property after insertions", () => {
      heap.insert(10);
      heap.insert(20);
      heap.insert(5);
      heap.insert(15);
      expect(isValidMaxHeap(heap)).toBe(true);
    });

    it("should maintain the heap property after extractions", () => {
      heap.insert(15);
      heap.insert(30);
      heap.extractMax();
      expect(isValidMaxHeap(heap)).toBe(true);
    });
  });
});
