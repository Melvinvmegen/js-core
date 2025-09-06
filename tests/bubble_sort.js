import { bubbleSort } from "../src/algorithms/bubble_sort";
import { describe, expect, it } from "vitest";

describe("bubbleSort", () => {
  const ascendingComparator = (a, b) => a - b;
  const descendingComparator = (a, b) => b - a;
  const stringLengthComparator = (a, b) => a.length - b.length;

  it("should sort an array of numbers in ascending order", () => {
    const arr = [4, 2, 5, 1, 3];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should sort an array of numbers in descending order", () => {
    const arr = [4, 2, 5, 1, 3];
    const sortedArr = bubbleSort(arr, descendingComparator);
    expect(sortedArr).toEqual([5, 4, 3, 2, 1]);
  });

  it("should return an empty array unchanged", () => {
    const arr = [];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([]);
  });

  it("should return a single-element array unchanged", () => {
    const arr = [1];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1]);
  });

  it("should leave an already sorted array unchanged", () => {
    const arr = [1, 2, 3, 4, 5];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort a reverse-sorted array", () => {
    const arr = [5, 4, 3, 2, 1];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort an array with duplicate elements", () => {
    const arr = [3, 1, 2, 3, 1];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1, 1, 2, 3, 3]);
  });

  it("should sort an array of strings in lexicographical order", () => {
    const arr = ["banana", "apple", "cherry", "date"];
    const sortedArr = bubbleSort(arr, (a, b) => a.localeCompare(b));
    expect(sortedArr).toEqual(["apple", "banana", "cherry", "date"]);
  });

  it("should sort an array of strings by length", () => {
    const arr = ["apple", "banana", "cherry", "date"];
    const sortedArr = bubbleSort(arr, stringLengthComparator);
    expect(sortedArr).toEqual(["date", "apple", "banana", "cherry"]);
  });

  it("should sort an array of objects by a numeric property", () => {
    const arr = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alice" },
      { id: 4, name: "David" },
      { id: 2, name: "Bob" },
    ];
    const sortedArr = bubbleSort(arr, (a, b) => a.id - b.id);
    expect(sortedArr).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
      { id: 4, name: "David" },
    ]);
  });

  it("should sort an array of objects by a string property", () => {
    const arr = [
      { name: "Charlie", age: 30 },
      { name: "Alice", age: 25 },
      { name: "David", age: 35 },
      { name: "Bob", age: 28 },
    ];
    const comparator = (a, b) => a.name.localeCompare(b.name);
    const sortedArr = bubbleSort(arr, comparator);
    expect(sortedArr).toEqual([
      { name: "Alice", age: 25 },
      { name: "Bob", age: 28 },
      { name: "Charlie", age: 30 },
      { name: "David", age: 35 },
    ]);
  });

  it("should not modify the original array", () => {
    const arr = [4, 2, 5, 1, 3];
    const originalArr = [...arr];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
    expect(arr).toEqual(originalArr);
  });

  it("should work with negative numbers", () => {
    const arr = [-3, -1, -2, 0, 2, 1];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([-3, -2, -1, 0, 1, 2]);
  });

  it("should work with decimal numbers", () => {
    const arr = [3.99, 1.99, 2.5, 4.2];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([1.99, 2.5, 3.99, 4.2]);
  });

  it("should handle arrays with all identical elements", () => {
    const arr = [42, 42, 42, 42];
    const sortedArr = bubbleSort(arr, ascendingComparator);
    expect(sortedArr).toEqual([42, 42, 42, 42]);
  });

  it("should handle arrays with mixed types (using a custom comparator)", () => {
    const arr = [1, "2", 3, "4"];
    const comparator = (a, b) => {
      const aType = typeof a;
      const bType = typeof b;
      if (aType === "number" && bType === "string") return -1;
      if (aType === "string" && bType === "number") return 1;
      return String(a).localeCompare(String(b));
    };
    const sortedArr = bubbleSort(arr, comparator);
    expect(sortedArr).toEqual([1, 3, "2", "4"]);
  });

  it("should handle comparator that always returns 0 (equal elements)", () => {
    const arr = [4, 2, 5, 1, 3];
    const sortedArr = bubbleSort(arr, () => 0);
    expect(sortedArr).toEqual([4, 2, 5, 1, 3]);
  });
});
