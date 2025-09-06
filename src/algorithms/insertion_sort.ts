export function insertionSort<T>(arr: T[], key: string): T[] {
  if (!key || arr[0] && !arr[0]?.[key]) throw new Error("Missing key");
  
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;

    if (!current[key]) throw new Error("Missing key");

    while (j >= 0 && arr[j][key] > current[key]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }

  return arr;
}
