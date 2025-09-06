import { frequencyCounter, validAnagram } from '../src/algorithms/frequency_counter';
import { describe, expect, it } from 'vitest';

describe('frequency_counter', () => {
  it('should return true for arrays with same elements and frequencies', () => {
    expect(frequencyCounter(['a', 'b', 'c'], ['c', 'b', 'a'])).toBe(true);
    expect(frequencyCounter(['a', 'a', 'b'], ['a', 'b', 'a'])).toBe(true);
  });

  it('should return false for arrays with different lengths', () => {
    expect(frequencyCounter(['a', 'b', 'c'], ['a', 'b'])).toBe(false);
  });

  it('should return false for arrays with same elements but different frequencies', () => {
    expect(frequencyCounter(['a', 'a', 'b'], ['a', 'b', 'b'])).toBe(false);
  });

  it('should return false when arrays have different elements', () => {
    expect(frequencyCounter(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(false);
  });

  it('should return true for empty arrays', () => {
    expect(frequencyCounter([], [])).toBe(true);
  });

  it('should handle arrays with duplicate values correctly', () => {
    expect(frequencyCounter(['a', 'a', 'b', 'b'], ['a', 'b', 'a', 'b'])).toBe(true);
    expect(frequencyCounter(['a', 'a', 'b'], ['a', 'b', 'b'])).toBe(false);
  });

  it('should handle arrays with numbers as strings correctly', () => {
    expect(frequencyCounter(['1', '2', '3'], ['3', '2', '1'])).toBe(true);
    expect(frequencyCounter(['1', '1', '2'], ['1', '2', '2'])).toBe(false);
  });

  it('should be case sensitive for string comparisons', () => {
    expect(frequencyCounter(['A', 'b'], ['a', 'B'])).toBe(false);
    expect(frequencyCounter(['A', 'B'], ['A', 'B'])).toBe(true);
  });

  it('should handle arrays containing empty strings', () => {
    expect(frequencyCounter(['a', '', 'b'], ['', 'b', 'a'])).toBe(true);
    expect(frequencyCounter(['a', '', 'b'], ['', '', 'a'])).toBe(false); // Different frequencies of empty string
  });
});

describe('validAnagram', () => {
  it('should return true for valid anagrams', () => {
    expect(validAnagram('listen', 'silent')).toBe(true);
  });

  it('should return false for strings of different lengths', () => {
    expect(validAnagram('hello', 'hell')).toBe(false);
    expect(validAnagram('a', '')).toBe(false);
  });

  it('should be case insensitive', () => {
    expect(validAnagram('Listen', 'silent')).toBe(true);
    expect(validAnagram('HELLO', 'hello')).toBe(true);
  });

  it('should return false for strings that are not anagrams', () => {
    expect(validAnagram('hello', 'world')).toBe(false);
    expect(validAnagram('apple', 'aple')).toBe(false);
  });

  it('should return true for empty strings', () => {
    expect(validAnagram('', '')).toBe(true);
  });

  it('should handle strings with spaces correctly', () => {
    expect(validAnagram('dormitory', 'dirty room')).toBe(true);
  });

  it('should handle strings with special characters correctly', () => {
    expect(validAnagram('a!b@c', 'c@b!a')).toBe(true);
  });

  it('should handle strings with numbers correctly', () => {
    expect(validAnagram('123', '321')).toBe(true);
  });

  it('should handle Unicode characters correctly', () => {
    expect(validAnagram('café', 'éfac')).toBe(true);
  });
});
