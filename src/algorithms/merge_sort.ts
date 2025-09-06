function merge<T>(arr1: T[], arr2: T[]): T[] {
  const new_arr: T[] = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      new_arr.push(arr1[i]);
      i++;
    } else {
      new_arr.push(arr2[j]);
      j++;
    }
  }

  if (i < arr1.length) {
    new_arr.push(...arr1.slice(i));
  }
  if (j < arr2.length) {
    new_arr.push(...arr2.slice(j));
  }

  return new_arr;
}

export function mergeSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
