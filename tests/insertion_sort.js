import { insertionSort } from '../src/algorithms/insertion_sort';
import { describe, expect, it } from 'vitest';

describe('insertionSort', () => {
  it('should sort an array of objects by a numeric key in ascending order', () => {
    const arr = [
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 4, name: 'David' },
      { id: 2, name: 'Bob' }
    ];
    const result = insertionSort(arr, 'id');
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' }
    ]);
  });

  it('should sort an array of objects by a string key in lexicographical order', () => {
    const arr = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'David', age: 35 },
      { name: 'Bob', age: 28 }
    ];
    const result = insertionSort(arr, 'name');
    expect(result).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 28 },
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 35 }
    ]);
  });

  it('should return an empty array unchanged', () => {
    const arr = [];
    const result = insertionSort(arr, 'id');
    expect(result).toEqual([]);
  });

  it('should return a single-element array unchanged', () => {
    const arr = [{ id: 1, name: 'Alice' }];
    const result = insertionSort(arr, 'id');
    expect(result).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('should leave an already sorted array unchanged', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    const result = insertionSort(arr, 'id');
    expect(result).toEqual(arr);
  });

  it('should correctly sort a reverse-sorted array', () => {
    const arr = [
      { id: 5, name: 'Eve' },
      { id: 4, name: 'David' },
      { id: 3, name: 'Charlie' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' }
    ];
    const result = insertionSort(arr, 'id');
    expect(result[0].id).toBe(1);
    expect(result[4].id).toBe(5);
  });

  it('should sort an array with duplicate values for the key', () => {
    const arr = [
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Carol' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Anna' }
    ];
    const result = insertionSort(arr, 'id');
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 1, name: 'Anna' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 3, name: 'Carol' }
    ]);
  });

  it('should handle arrays with objects that have missing keys', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { name: 'David' }
    ];

    expect(() => insertionSort(arr, 'id')).toThrow();
  });

  it('should sort objects with negative numeric values', () => {
    const arr = [
      { value: -3 },
      { value: -1 },
      { value: -4 },
      { value: -2 }
    ];
    const result = insertionSort(arr, 'value');
    expect(result.map(obj => obj.value)).toEqual([-4, -3, -2, -1]);
  });

  it('should sort objects with decimal numeric values', () => {
    const arr = [
      { price: 3.99 },
      { price: 1.99 },
      { price: 2.50 },
      { price: 4.20 }
    ];
    const result = insertionSort(arr, 'price');
    expect(result.map(obj => obj.price)).toEqual([1.99, 2.50, 3.99, 4.20]);
  });

  it('should mutate the original array', () => {
    const arr = [
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
    const originalArr = [...arr];
    const result = insertionSort(arr, 'id');

    expect(result).toBe(arr);
    expect(arr).not.toEqual(originalArr);
    expect(arr).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ]);
  });

  it('should handle string keys with case sensitivity', () => {
    const arr = [
      { name: 'apple' },
      { name: 'Banana' },
      { name: 'cherry' },
      { name: 'Date' }
    ];
    const result = insertionSort(arr, 'name');
    expect(result.map(obj => obj.name)).toEqual(['Banana', 'Date', 'apple', 'cherry']);
  });

  it('should handle date objects when comparing', () => {
    const arr = [
      { date: new Date('2022-01-01') },
      { date: new Date('2021-01-01') },
      { date: new Date('2023-01-01') }
    ];
    const result = insertionSort(arr, 'date');
    const dates = result.map(obj => obj.date.getFullYear());
    expect(dates).toEqual([2021, 2022, 2023]);
  });

  it('should work with arrays containing only one key', () => {
    const arr = [
      { age: 30 },
      { age: 25 },
      { age: 35 }
    ];
    const result = insertionSort(arr, 'age');
    expect(result.map(obj => obj.age)).toEqual([25, 30, 35]);
  });

  it('should handle objects with undefined/null values for the key', () => {
    const arr = [
      { id: undefined, name: 'Undefined' },
      { id: null, name: 'Null' },
      { id: 5, name: 'Five' },
      { id: null, name: 'Another Null' },
      { id: undefined, name: 'Another Undefined' },
      { id: 3, name: 'Three' }
    ];

    expect(() => insertionSort(arr, 'id')).toThrow();
  });

  it('should throw an error when key is an empty string', () => {
    const arr = [{ id: 1 }];
    expect(() => insertionSort(arr, '')).toThrow();
  });

  it('should throw an error when key doesn\'t exist in any object', () => {
    const arr = [{ id: 1 }];
    expect(() => insertionSort(arr, 'nonexistentKey')).toThrow();
  });

  it('should handle non-primitive key values', () => {
    const obj1 = {};
    const obj2 = {};
    const arr = [
      { value: obj1 },
      { value: obj2 }
    ];

    const result = insertionSort(arr, 'value');
    expect(result.length).toBe(2);
  });
});