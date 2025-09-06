export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Stack<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T): number {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const temp = this.head;
      this.head = newNode;
      this.head.next = temp;
    }
    this.length++;

    return this.length;
  }

  pop(): Node<T> | null {
    if (this.length === 0 || !this.head) return null;
    const toRemove = this.head;
    if (this.length === 1) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;

    return toRemove;
  }
}
