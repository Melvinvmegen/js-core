import type { Comparator } from "../../types/Comparator";

export function binarySearch<T>(sortedArr: T[], value: T, comparator: Comparator<T>): number {
  let start = 0;
  let end = sortedArr.length - 1;
  let middle = Math.floor((end + start) / 2);
  while (end >= start) {
    const comparison = comparator(sortedArr[middle], value);
    if (comparison === 0) return middle;
    if (comparison < 0) start = middle + 1;
    if (comparison > 0) end = middle - 1;
    middle = Math.floor((end + start) / 2);
  }

  return comparator(sortedArr[middle], value) === 0 ? middle : -1;
}
