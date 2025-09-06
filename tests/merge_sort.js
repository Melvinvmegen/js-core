
import { mergeSort } from '../src/algorithms/merge_sort';
import { describe, expect, it } from 'vitest';

describe('mergeSort', () => {
  it('should sort an array of numbers in ascending order', () => {
    const arr = [4, 2, 5, 1, 3];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
    expect(arr).toEqual([4, 2, 5, 1, 3]); // Original array is unchanged
  });

  it('should return an empty array unchanged', () => {
    const arr = [];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([]);
    expect(arr).toEqual([]); // Original array is unchanged
  });

  it('should return a single-element array unchanged', () => {
    const arr = [1];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1]);
    expect(arr).toEqual([1]); // Original array is unchanged
  });

  it('should leave an already sorted array unchanged', () => {
    const arr = [1, 2, 3, 4, 5];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // Original array is unchanged
  });

  it('should correctly sort a reverse-sorted array', () => {
    const arr = [5, 4, 3, 2, 1];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
    expect(arr).toEqual([5, 4, 3, 2, 1]); // Original array is unchanged
  });

  it('should correctly sort an array with duplicate elements', () => {
    const arr = [3, 1, 2, 3, 1];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1, 1, 2, 3, 3]);
  });

  it('should correctly sort an array of strings in lexicographical order', () => {
    const arr = ['banana', 'apple', 'cherry', 'date'];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual(['apple', 'banana', 'cherry', 'date']);
    expect(arr).toEqual(['banana', 'apple', 'cherry', 'date']); // Original array is unchanged
  });

  it('should correctly sort an array with negative numbers', () => {
    const arr = [-3, -1, -2, 0, 2, 1];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([-3, -2, -1, 0, 1, 2]);
    expect(arr).toEqual([-3, -1, -2, 0, 2, 1]); // Original array is unchanged
  });

  it('should handle an array with all identical elements', () => {
    const arr = [2, 2, 2, 2];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([2, 2, 2, 2]);
    expect(arr).toEqual([2, 2, 2, 2]); // Original array is unchanged
  });

  it('should not mutate the original array', () => {
    const arr = [3, 1, 4, 1, 5];
    const originalArr = [...arr];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1, 1, 3, 4, 5]);
    expect(arr).toEqual(originalArr);
  });
});
