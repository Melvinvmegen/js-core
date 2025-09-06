export function maxSubarraySum(arr: number[], num: number): number {
  if (num <= 0 || num > arr.length) return 0;
  let max = 0;
  let temp = 0;

  for (let i = 0; i < num; i++) {
    if (!arr[i]) continue;
    max += arr[i];
  }

  temp = max;
  for (let i = num; i < arr.length; i++) {
    if (!arr[i]) continue;
    temp = temp - arr[i - num] + arr[i];
    max = Math.max(max, temp);
  }

  return max;
}
