import { describe, expect, it } from "vitest";
import { selectionSort, selectionSortObjects } from "../src/algorithms/selection_sort";

describe("selectionSort", () => {
  it("should sort an array of numbers in ascending order", () => {
    const arr = [4, 2, 5, 1, 3];
    selectionSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return an empty array unchanged", () => {
    const arr = [];
    selectionSort(arr);
    expect(arr).toEqual([]);
  });

  it("should return a single-element array unchanged", () => {
    const arr = [1];
    selectionSort(arr);
    expect(arr).toEqual([1]);
  });

  it("should leave an already sorted array unchanged", () => {
    const arr = [1, 2, 3, 4, 5];
    selectionSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort a reverse-sorted array", () => {
    const arr = [5, 4, 3, 2, 1];
    selectionSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort an array with duplicate elements", () => {
    const arr = [3, 1, 2, 3, 1];
    selectionSort(arr);
    expect(arr).toEqual([1, 1, 2, 3, 3]);
  });

  it("should correctly sort an array of strings", () => {
    const arr = ["banana", "apple", "cherry", "date"];
    selectionSort(arr);
    expect(arr).toEqual(["apple", "banana", "cherry", "date"]);
  });

  it("should mutate the original array", () => {
    const arr = [3, 1, 4, 1, 5];
    const originalArr = [...arr];
    selectionSort(arr);
    expect(arr).not.toEqual(originalArr);
    expect(arr).toEqual([1, 1, 3, 4, 5]);
  });
});

describe("selectionSortObjects", () => {
  it("should sort an array of objects by a numeric key in ascending order", () => {
    const arr = [{ id: 3 }, { id: 1 }, { id: 4 }, { id: 2 }];
    selectionSortObjects(arr, "id");
    expect(arr).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });

  it("should sort an array of objects by a string key in ascending order", () => {
    const arr = [{ name: "banana" }, { name: "apple" }, { name: "cherry" }];
    selectionSortObjects(arr, "name");
    expect(arr).toEqual([{ name: "apple" }, { name: "banana" }, { name: "cherry" }]);
  });

  it("should return an empty array unchanged", () => {
    const arr = [];
    selectionSortObjects(arr, "id");
    expect(arr).toEqual([]);
  });

  it("should return a single-element array unchanged", () => {
    const arr = [{ id: 1 }];
    selectionSortObjects(arr, "id");
    expect(arr).toEqual([{ id: 1 }]);
  });

  it("should leave an already sorted array unchanged", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    selectionSortObjects(arr, "id");
    expect(arr).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("should correctly sort a reverse-sorted array of objects", () => {
    const arr = [{ id: 3 }, { id: 2 }, { id: 1 }];
    selectionSortObjects(arr, "id");
    expect(arr).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("should correctly sort an array of objects with duplicate key values", () => {
    const arr = [{ id: 2 }, { id: 1 }, { id: 2 }, { id: 1 }];
    selectionSortObjects(arr, "id");
    expect(arr).toEqual([{ id: 1 }, { id: 1 }, { id: 2 }, { id: 2 }]);
  });

  it("should mutate the original array", () => {
    const arr = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const originalArr = [...arr];
    selectionSortObjects(arr, "id");
    expect(arr).not.toEqual(originalArr);
    expect(arr).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});
