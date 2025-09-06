import { describe, expect, it } from "vitest";
import { swap } from "../src/algorithms/swap";

describe("swap", () => {
  it("should swap elements at given indices", () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 1, 2);
    expect(arr).toEqual([1, 3, 2, 4]);
  });

  it("should not change the array if indices are the same", () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 1, 1);
    expect(arr).toEqual([1, 2, 3, 4]);
  });

  it("should throw an error for out of bounds indices", () => {
    const arr = [1, 2, 3, 4];
    expect(() => swap(arr, 1, 10)).toThrow("Index out of bounds");
    expect(() => swap(arr, -1, 2)).toThrow("Index out of bounds");
    expect(() => swap(arr, 0, arr.length)).toThrow("Index out of bounds");
  });

  it("should throw an error for empty array", () => {
    const arr = [];
    expect(() => swap(arr, 0, 0)).toThrow("Index out of bounds");
  });

  it("should work with different data types", () => {
    const arr = ["a", "b", "c", "d"];
    swap(arr, 0, 3);
    expect(arr).toEqual(["d", "b", "c", "a"]);

    const arrObj = [{ id: 1 }, { id: 2 }];
    swap(arrObj, 0, 1);
    expect(arrObj).toEqual([{ id: 2 }, { id: 1 }]);
  });

  it("should mutate the original array", () => {
    const arr = [1, 2, 3, 4];
    const originalArr = [...arr];
    swap(arr, 1, 2);
    expect(arr).not.toEqual(originalArr);
    expect(arr).toEqual([1, 3, 2, 4]);
  });

  it("should handle boundary indices", () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 0, arr.length - 1); // First and last elements
    expect(arr).toEqual([4, 2, 3, 1]);
  });

  it("should handle single element array with same index", () => {
    const arr = [1];
    swap(arr, 0, 0); // Same index
    expect(arr).toEqual([1]);
  });
});
