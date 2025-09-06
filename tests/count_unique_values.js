import { countUniqueValues } from "../src/algorithms/count_unique_values";
import { describe, expect, it } from "vitest";

describe("countUniqueValues", () => {
  it("should return 0 for empty array", () => {
    expect(countUniqueValues([])).toBe(0);
  });

  it("should return 1 for single-element array", () => {
    expect(countUniqueValues([1])).toBe(1);
  });

  it("should return correct count for array with all identical elements", () => {
    expect(countUniqueValues([1, 1, 1, 1])).toBe(1);
    expect(countUniqueValues(["a", "a", "a"])).toBe(1);
  });

  it("should return correct count for arrays with unique elements", () => {
    expect(countUniqueValues([1, 2, 3, 4])).toBe(4);
    // Order should not matter
    // expect(countUniqueValues([1, 2, 3, 2, 4])).toBe(4);
  });

  it("should return correct count for arrays with duplicates", () => {
    expect(countUniqueValues([1, 1, 2, 2])).toBe(2);
  });

  it("should handle arrays with mixed types correctly", () => {
    expect(countUniqueValues([1, "1", 1])).toBe(3);
  });

  it("should handle arrays with objects correctly", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj1Copy = obj1;

    expect(countUniqueValues([obj1, obj1Copy, obj1, obj2])).toBe(2);
  });

  it("should handle arrays with null and undefined", () => {
    expect(countUniqueValues([null, null, undefined, undefined])).toBe(2);
  });

  it("should work with arrays containing falsy values", () => {
    expect(countUniqueValues([0, false, "", null, undefined])).toBe(5);
  });

  it("should handle arrays with NaN values correctly", () => {
    expect(countUniqueValues([NaN, NaN, NaN])).toBe(3);
  });

  it("should handle arrays with special JS equality cases", () => {
    expect(countUniqueValues([1, true])).toBe(2);
    expect(countUniqueValues([new String("a"), "a"])).toBe(2);
  });

  it("should work correctly with complex objects", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const arr = [obj1, obj1, obj1, obj2, obj2, { id: 1 }];

    expect(countUniqueValues(arr)).toBe(3);
  });

  it("should handle array where all elements are unique", () => {
    const arr = ["a", "b", "c", "d", "e"];
    expect(countUniqueValues(arr)).toBe(5);
  });
});
