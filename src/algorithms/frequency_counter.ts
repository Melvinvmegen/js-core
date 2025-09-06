export function frequencyCounter(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;

  const frequency = {};
  for (const val of arr1) {
    frequency[val] = frequency[val] ? frequency[val] + 1 : 1;
  }

  for (const val of arr2) {
    if (!frequency[val]) return false;
    else frequency[val]--;
  }

  return true;
}

export function validAnagram(str1: string, str2: string): boolean {
  const str1LowerCased = str1.toLowerCase().replace(' ', '') ;
  const str2LowerCased = str2.toLowerCase().replace(' ', '') ;
  if (str1LowerCased.length !== str2LowerCased.length) return false;
  const frequency = {};

  for (const char of str1LowerCased) {
    frequency[char] = frequency[char] ? frequency[char] + 1 : 1;
  }

  for (const char of str2LowerCased) {
    if (!frequency[char]) return false;
    else frequency[char] -= 1;
  }

  return true;
}
