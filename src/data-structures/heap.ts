export class MaxBinaryHeap<T extends number = number> {
  private values: T[];

  constructor() {
    this.values = [];
  }

  insert(value: T): void {
    this.values.push(value);
    let index = this.values.length - 1;
    const element = this.values[index];
    while (true) {
      const parentIndex = Math.round((index - 1) / 2);
      const parent = this.values[parentIndex];
      if (parent >= element) break;
      this.values[parentIndex] = element;
      this.values[index] = parent;
      index = parentIndex;
    }
  }

  extractMax(): T | undefined {
    if (this.values.length === 0) return undefined;
    let index = 0;
    const head = this.values[index];
    const end = this.values.pop();
    if (this.values.length === 0) return head;
    const length = this.values.length;
    if (end) {
      this.values[0] = end;
    }
    const element = this.values[index];
    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let left: T | null = null;
      let right: T | null = null;
      let swap: number | null = null;

      if (leftIndex < length) {
        left = this.values[leftIndex];
        if (left > element) {
          swap = leftIndex;
        }
      }
      if (rightIndex < length) {
        right = this.values[rightIndex];
        if ((swap === null && right > element) || (swap !== null && right > left)) {
          swap = rightIndex;
        }
      }
      if (swap === null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
    return head;
  }

  peek(): T | undefined {
    return this.values[0];
  }

  size(): number {
    return this.values.length;
  }

  heapSort(): T[] {
    const sorted: T[] = [];
    const originalValues = [...this.values];
    while (this.size()) {
      const max = this.extractMax();
      if (max !== undefined) {
        sorted.push(max);
      }
    }
    this.values = originalValues;
    return sorted;
  }
}
