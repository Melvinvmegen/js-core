import { maxSubarraySum } from "../src/algorithms/max_sub_array";
import { describe, expect, it } from "vitest";

describe("maxSubarraySum", () => {
  it("should return the correct max sum for a positive number array", () => {
    const arr = [1, 2, 5, 2, 8, 1, 5];
    expect(maxSubarraySum(arr, 2)).toBe(10);
  });

  it("should return the correct max sum for a larger subarray length", () => {
    const arr = [4, 2, 1, 6, 2];
    expect(maxSubarraySum(arr, 4)).toBe(13);
  });

  it("should return 0 when array length is less than num", () => {
    const arr = [1, 2, 3];
    expect(maxSubarraySum(arr, 4)).toBe(0);
  });

  it("should handle negative numbers correctly", () => {
    const arr = [-3, -2, -1, -4, -5];
    expect(maxSubarraySum(arr, 3)).toBe(-6);
  });

  it("should handle mixed positive and negative numbers", () => {
    const arr = [1, -2, 3, -1, 2];
    expect(maxSubarraySum(arr, 3)).toBe(4);
  });

  it("should work when num equals array length", () => {
    const arr = [1, 2, 3, 4];
    expect(maxSubarraySum(arr, 4)).toBe(10);
  });

  it("should work with num = 1", () => {
    const arr = [4, 2, 1, 6, 2];
    expect(maxSubarraySum(arr, 1)).toBe(6);
  });

  it("should work with large numbers", () => {
    const arr = [1000, 2000, 3000, 4000, 5000];
    expect(maxSubarraySum(arr, 3)).toBe(12000);
  });

  it("should return 0 for empty array", () => {
    const arr = [];
    expect(maxSubarraySum(arr, 2)).toBe(0);
  });

  it("should handle arrays with zeros", () => {
    const arr = [0, 0, 0, 1, 0];
    expect(maxSubarraySum(arr, 3)).toBe(1);
  });

  it("should work when all numbers are the same", () => {
    const arr = [5, 5, 5, 5, 5];
    expect(maxSubarraySum(arr, 2)).toBe(10);
  });

  it("should return 0 when num is 0", () => {
    const arr = [1, 2, 3, 4];
    expect(maxSubarraySum(arr, 0)).toBe(0);
  });

  it("should return 0 when num is negative", () => {
    const arr = [1, 2, 3, 4];
    expect(maxSubarraySum(arr, -1)).toBe(0);
  });

  it("should work with all negative numbers and small window", () => {
    const arr = [-1, -2, -3, -4];
    expect(maxSubarraySum(arr, 2)).toBe(-3);
  });

  it("should work when the array length is exactly equal to num", () => {
    const arr = [1, 2, 3];
    expect(maxSubarraySum(arr, 3)).toBe(6);
  });
});
