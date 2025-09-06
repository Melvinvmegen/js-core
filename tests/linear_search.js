import { linearSearch } from '../src/algorithms/linear_search';
import { describe, expect, it } from 'vitest';

describe('linearSearch', () => {
  it('should find the index of an existing number in an array', () => {
    const arr = [3, 7, 2, 9, 5];
    expect(linearSearch(arr, 9)).toBe(3);
  });

  it('should find the index of an existing string in an array', () => {
    const arr = ['apple', 'banana', 'cherry', 'date'];
    expect(linearSearch(arr, 'banana')).toBe(1);
  });

  it('should return -1 when value is not found in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(linearSearch(arr, 6)).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    const arr = [];
    expect(linearSearch(arr, 5)).toBe(-1);
  });

  it('should handle duplicate values by returning the first occurrence', () => {
    const arr = [1, 2, 3, 2, 4, 2];
    expect(linearSearch(arr, 2)).toBe(1);
  });

  it('should work with boolean values', () => {
    const arr = [true, false, true, false];
    expect(linearSearch(arr, true)).toBe(0);
    expect(linearSearch(arr, false)).toBe(1);
  });

  it('should work with object references', () => {
    const obj1 = { id: 1 };
    const arr = [obj1];
    expect(linearSearch(arr, obj1)).toBe(0);
  });

  it('should handle null and undefined values correctly', () => {
    const arr = [null, undefined, 0, false, ''];
    expect(linearSearch(arr, null)).toBe(0);
    expect(linearSearch(arr, undefined)).toBe(1);
    expect(linearSearch(arr, 0)).toBe(2);
    expect(linearSearch(arr, false)).toBe(3);
    expect(linearSearch(arr, '')).toBe(4);
  });

  it('should handle NaN values correctly', () => {
    const arr = [1, NaN, 3, NaN];
    expect(linearSearch(arr, NaN)).toBe(-1);
  });

  it('should work with mixed types in the array', () => {
    const arr = [42, 'hello', true, null];
    expect(linearSearch(arr, 'hello')).toBe(1);
    expect(linearSearch(arr, true)).toBe(2);
    expect(linearSearch(arr, null)).toBe(3);
  });

  it('should return -1 when searching for undefined in an array without undefined', () => {
    const arr = [1, 2, 3];
    expect(linearSearch(arr, undefined)).toBe(-1);
  });

  it('should return -1 when searching for null in an array without null', () => {
    const arr = [1, 2, 3];
    expect(linearSearch(arr, null)).toBe(-1);
  });

  it('should find 0 in an array that contains 0', () => {
    const arr = [1, 0, 3, 0, 5];
    expect(linearSearch(arr, 0)).toBe(1);
  });

  it('should find false in an array that contains false', () => {
    const arr = [true, false, true];
    expect(linearSearch(arr, false)).toBe(1);
  });

  it('should find an empty string in an array', () => {
    const arr = ['a', '', 'b', '', 'c'];
    expect(linearSearch(arr, '')).toBe(1);
  });

  it('should work with custom objects that have valueOf or toString methods', () => {
    const obj1 = { id: 1, valueOf: () => 1 };
    const obj2 = { id: 2, valueOf: () => 2 };
    const arr = [obj1, obj2];
    expect(linearSearch(arr, obj1)).toBe(0);
    expect(linearSearch(arr, obj2)).toBe(1);
  });
});
