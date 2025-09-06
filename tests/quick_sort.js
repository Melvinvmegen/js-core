import { describe, expect, it } from "vitest";
import { quickSort } from "../src/algorithms/quick_sort";

describe("quickSort", () => {
  it("should sort an array of numbers in ascending order", () => {
    const arr = [4, 2, 5, 1, 3];
    quickSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return an empty array unchanged", () => {
    const arr = [];
    quickSort(arr);
    expect(arr).toEqual([]);
  });

  it("should return a single-element array unchanged", () => {
    const arr = [1];
    quickSort(arr);
    expect(arr).toEqual([1]);
  });

  it("should leave an already sorted array unchanged", () => {
    const arr = [1, 2, 3, 4, 5];
    quickSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort a reverse-sorted array", () => {
    const arr = [5, 4, 3, 2, 1];
    quickSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort an array with duplicate elements", () => {
    const arr = [3, 1, 2, 3, 1];
    quickSort(arr);
    expect(arr).toEqual([1, 1, 2, 3, 3]);
  });

  it("should correctly sort an array of strings in lexicographical order", () => {
    const arr = ["banana", "apple", "cherry", "date"];
    quickSort(arr);
    expect(arr).toEqual(["apple", "banana", "cherry", "date"]);
  });

  it("should correctly sort an array with negative numbers", () => {
    const arr = [-3, -1, -2, 0, 2, 1];
    quickSort(arr);
    expect(arr).toEqual([-3, -2, -1, 0, 1, 2]);
  });

  it("should handle an array with all identical elements", () => {
    const arr = [2, 2, 2, 2];
    quickSort(arr);
    expect(arr).toEqual([2, 2, 2, 2]);
  });

  it("should mutate the original array (in-place sorting)", () => {
    const arr = [3, 1, 4, 1, 5];
    const originalArrReference = arr;
    const originalArrValues = [...arr];
    quickSort(arr);
    expect(arr).toEqual([1, 1, 3, 4, 5]);
    expect(arr).toBe(originalArrReference);
    expect(arr).not.toEqual(originalArrValues);
  });
});
