import { radixSort } from '../src/algorithms/radix_sort';
import { describe, expect, it } from 'vitest';

describe('radixSort', () => {
  it('should sort an array of numbers with varying digit lengths without mutating the original', () => {
    const arr = [123, 4567, 8, 91011, 0, 1];
    const originalArr = [...arr];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([0, 1, 8, 123, 4567, 91011]);
    expect(arr).toEqual(originalArr); // Original array is unchanged
  });

  it('should return an empty array unchanged', () => {
    const arr = [];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([]);
    expect(arr).toEqual([]);
  });

  it('should return a single-element array unchanged', () => {
    const arr = [42];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([42]);
    expect(arr).toEqual([42]);
  });

  it('should leave an already sorted array unchanged', () => {
    const sortedArr = radixSort([1, 2, 3, 4, 5]);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  it('should correctly sort a reverse-sorted array without mutating the original', () => {
    const arr = [5, 4, 3, 2, 1];
    const originalArr = [...arr];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
    expect(arr).toEqual(originalArr);
  });

  it('should correctly sort an array with duplicate elements without mutating the original', () => {
    const arr = [3, 1, 2, 3, 1];
    const originalArr = [...arr];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([1, 1, 2, 3, 3]);
    expect(arr).toEqual(originalArr);
  });

  it('should handle an array where all numbers have the same number of digits without mutating the original', () => {
    const arr = [321, 123, 213, 231, 132, 312];
    const originalArr = [...arr];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([123, 132, 213, 231, 312, 321]);
    expect(arr).toEqual(originalArr);
  });

  it('should handle zero correctly without mutating the original', () => {
    const arr = [0, 10, 200, 3000];
    const originalArr = [...arr];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([0, 10, 200, 3000]);
    expect(arr).toEqual(originalArr);
  });

  it('should handle large numbers without mutating the original', () => {
    const arr = [123456789, 987654321, 123, 456789];
    const originalArr = [...arr];
    const sortedArr = radixSort(arr);
    expect(sortedArr).toEqual([123, 456789, 123456789, 987654321]);
    expect(arr).toEqual(originalArr);
  });
});