import { binarySearch } from "../src/algorithms/binary_search";
import { describe, expect, it } from "vitest";

const numberComparator = (a, b) => a - b;
const stringComparator = (a, b) => a?.localeCompare(b);

describe("binarySearch", () => {
  describe("with number arrays", () => {
    const sortedNumbers = [1, 3, 5, 7, 9, 11, 13];

    it("should find an existing value", () => {
      expect(binarySearch(sortedNumbers, 5, numberComparator)).toBe(2);
    });

    it("should return -1 for non-existent values", () => {
      expect(binarySearch(sortedNumbers, 0, numberComparator)).toBe(-1);
    });

    it("should work with empty array", () => {
      expect(binarySearch([], 5, numberComparator)).toBe(-1);
    });

    it("should work with single-element array (matching)", () => {
      expect(binarySearch([5], 5, numberComparator)).toBe(0);
    });

    it("should work with single-element array (non-matching)", () => {
      expect(binarySearch([5], 3, numberComparator)).toBe(-1);
    });

    it("should work with negative numbers", () => {
      const negArr = [-10, -5, 0, 5, 10];
      expect(binarySearch(negArr, -5, numberComparator)).toBe(1);
    });
  });

  describe("with string arrays", () => {
    const sortedStrings = ["apple", "banana", "cherry", "date", "elderberry"];
    it("should find an existing string", () => {
      expect(binarySearch(sortedStrings, "banana", stringComparator)).toBe(1);
    });

    it("should return -1 for non-existent strings", () => {
      expect(binarySearch(sortedStrings, "pear", stringComparator)).toBe(-1);
    });

    it("should be case-sensitive", () => {
      const caseSensitiveArr = ["apple", "Banana", "cherry"];
      const caseComparator = (a, b) => a.localeCompare(b);
      expect(binarySearch(caseSensitiveArr, "banana", caseComparator)).toBe(-1);
      expect(binarySearch(caseSensitiveArr, "Banana", caseComparator)).toBe(1);
    });
  });

  describe("edge cases", () => {
    it("should work with duplicate values", () => {
      const arr = [1, 2, 2, 2, 3, 4, 4, 5];
      const index = binarySearch(arr, 2, numberComparator);
      expect([1, 2, 3].includes(index)).toBe(true);
      expect(arr[index]).toBe(2);
    });

    it("should handle arrays with custom objects", () => {
      const people = [
        { id: 1, name: "Alice" },
        { id: 3, name: "Bob" },
        { id: 5, name: "Charlie" },
        { id: 7, name: "David" },
      ];

      const idComparator = (a, b) => a.id - b.id;
      expect(binarySearch(people, { id: 3, name: "Bob" }, idComparator)).toBe(1);
    });

    it("should return -1 when searching in an empty array", () => {
      expect(binarySearch([], "any", stringComparator)).toBe(-1);
    });
  });

  describe("boundary conditions", () => {
    it("should work when the value is at the beginning of the array", () => {
      const arr = [5, 10, 15, 20];
      expect(binarySearch(arr, 5, numberComparator)).toBe(0);
    });

    it("should work when the value is at the end of the array", () => {
      const arr = [5, 10, 15, 20];
      expect(binarySearch(arr, 20, numberComparator)).toBe(3);
    });

    it("should work when the value is at the middle of the array", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearch(arr, 3, numberComparator)).toBe(2);
    });
  });

  describe("array integrity", () => {
    it("should not modify the original array during search", () => {
      const arr = [1, 2, 3, 4, 5];
      const originalArr = [...arr];
      binarySearch(arr, 3, numberComparator);
      expect(arr).toEqual(originalArr);
    });
  });
});
