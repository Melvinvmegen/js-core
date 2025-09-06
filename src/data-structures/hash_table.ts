import type { KeyValuePair } from "../../types/KeyValuePair";

export class HashTable<K extends string | number, V> {
  private map: Array<Array<KeyValuePair<K, V>>>;
  private size: number;

  constructor(size = 30) {
    this.size = size;
    this.map = new Array(size);
  }

  private _hash(key: K): number {
    let total = 0;
    const WEIRD_PRIME = 31;
    const keyString = key.toString();

    for (let i = 0; i < Math.min(keyString.length, 100); i++) {
      const char = keyString[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.map.length;
    }
    return Math.abs(total);
  }

  set(key: K, value: V): number {
    const index = this._hash(key);
    if (!this.map[index]) this.map[index] = [];
    this.map[index].push([key, value]);
    return index;
  }

  get(key: K): V | undefined {
    const index = this._hash(key);
    const results = this.map[index];
    if (!results) return undefined;
    const foundItem = results.find((item) => item[0] === key);
    return foundItem ? foundItem[1] : undefined;
  }

  keys(): K[] {
    const keys: K[] = [];
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < this.map[i].length; j++) {
          keys.push(this.map[i][j][0]);
        }
      }
    }

    return keys;
  }

  values(): V[] {
    const values: V[] = [];
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < this.map[i].length; j++) {
          values.push(this.map[i][j][1]);
        }
      }
    }

    return values;
  }

  delete(key: K): boolean {
    const index = this._hash(key);
    const bucket = this.map[index];
    if (!bucket) return false;

    const initialLength = bucket.length;
    this.map[index] = bucket.filter((item) => item[0] !== key);
    return this.map[index].length !== initialLength;
  }

  clear(): void {
    this.map = new Array(this.size);
  }
}
