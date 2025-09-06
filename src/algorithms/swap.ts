export function swap<T>(arr: T[], idx: number, idx2: number) {
  if (idx < 0 || idx2 < 0 || idx > arr.length - 1 || idx2 > arr.length - 1) throw new Error("Index out of bounds")
  const temp = arr[idx];
  arr[idx] = arr[idx2];
  arr[idx2] = temp;
}
