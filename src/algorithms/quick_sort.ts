import { swap } from "./swap";

function pivot<T>(arr: T[], start = 0, end = arr.length - 1): number {
  const pivot = arr[Math.floor((end + start) / 2)];
  let i = start;
  let j = end;
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}

export function quickSort<T>(arr: T[], start_index = 0, end_index = arr.length - 1): T[] {
  if (start_index >= end_index) return arr;
  const pivot_index = pivot(arr, start_index, end_index);
  quickSort(arr, start_index, pivot_index - 1);
  quickSort(arr, pivot_index + 1, end_index);

  return arr;
}
