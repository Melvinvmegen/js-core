import type { Comparator } from "../../types/Comparator";
import { swap } from "./swap";

export function bubbleSort<T>(arr: T[], comparator: Comparator<T>): T[] {
  let noSwap = true;
  const sortedArray = [...arr];
  for (let i = sortedArray.length; i > 0; i--) {
    noSwap = true;
    for (let j = 0; j < i - 1; j++) {
      if (comparator(sortedArray[j], sortedArray[j + 1]) > 0) {
        swap(sortedArray, j, j + 1);
        noSwap = false;
      }
    }
    if (noSwap) break;
  }
  return sortedArray;
}
