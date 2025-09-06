function getDigit(number: number, digit: number): number {
  return Math.floor(number / Math.pow(10, digit)) % 10;
}

function getMaxDigits(arr: number[]): number {
  let max_digits = 0;
  for (const num of arr) {
    max_digits = Math.max(("" + num).length, max_digits);
  }
  return max_digits;
}

export function radixSort(arr: number[]): number[] {
  const max_digits = getMaxDigits(arr);

  for (let i = 0; i < max_digits; i++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      buckets[getDigit(arr[j], i)].push(arr[j]);
    }
    arr = ([] as number[]).concat(...buckets);
  }

  return arr;
}
