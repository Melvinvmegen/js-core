export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> {
  first: Node<T> | null;
  last: Node<T> | null;
  length: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  queue(value: T): number {
    const newNode = new Node(value);
    if (!this.length) {
      this.first = newNode;
      this.last = newNode;
    } else {
      if (!this.last) return this.length;
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;

    return this.length;
  }

  dequeue(): T | undefined {
    if (this.length === 0 || !this.first) return;
    const toRemove = this.first;
    if (this.length === 1) {
      this.last = null;
    }
    this.first = this.first.next;
    this.length--;

    return toRemove.value;
  }
}
