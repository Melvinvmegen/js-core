import { swap } from "./swap";

export function selectionSort<T>(arr: T[]): T[] {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (i !== min) swap(arr, i, min);
  }

  return arr;
}

export function selectionSortObjects<T>(arr: T[], key: string | number): T[] {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j][key] < arr[min][key]) min = j;
    }
    if (i !== min) swap(arr, i, min);
  }

  return arr;
}
