class Node<T, P extends number> {
  value: T;
  priority: P;

  constructor(value: T, priority: P) {
    this.value = value;
    this.priority = priority;
  }
}

export class PriorityQueue<T, P extends number = number> {
  queue: Node<T, P>[];

  constructor() {
    this.queue = [];
  }

  enqueue(value: T, priority: P): void {
    const node: Node<T, P> = { value, priority };
    this.queue.push(node);
    this.bubbleUp(this.queue.length - 1);
  }

  dequeue(): Node<T, P> | undefined {
    const root = this.queue[0];
    const last = this.queue.pop();
    if (this.queue.length > 0) {
      this.queue[0] = last as Node<T, P>;
      this.bubbleDown(0);
    }

    return root;
  }

  values(): T[] {
    return this.queue.map((node) => node.value);
  }

  entries(): Array<{ value: T; priority: number }> {
    return this.queue.map((node) => ({ value: node.value, priority: node.priority }));
  }

  private bubbleUp(index: number): void {
    let currentIndex = index;
    const node = this.queue[currentIndex];

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parent = this.queue[parentIndex];

      if (node.priority >= parent.priority) break;

      this.queue[parentIndex] = node;
      this.queue[currentIndex] = parent;
      currentIndex = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    let currentIndex = index;
    const length = this.queue.length;
    const node = this.queue[currentIndex];

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let swapIndex: number | null = null;

      if (leftChildIndex < length) {
        const leftChild = this.queue[leftChildIndex];
        if (leftChild.priority < node.priority) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.queue[rightChildIndex];
        if (
          (swapIndex === null && rightChild.priority < node.priority) ||
          (swapIndex !== null && rightChild.priority < this.queue[swapIndex].priority)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;
      this.queue[currentIndex] = this.queue[swapIndex];
      this.queue[swapIndex] = node;
      currentIndex = swapIndex;
    }
  }
}
