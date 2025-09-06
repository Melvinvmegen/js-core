export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T): SinglyLinkedList<T> {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop(): Node<T> | undefined {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift(): Node<T> | undefined {
    if (!this.head) return undefined;
    const current_head = this.head;
    this.head = current_head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return current_head;
  }

  unshift(value: T): SinglyLinkedList<T> {
    const new_node = new Node(value);
    if (!this.head) {
      this.head = new_node;
      this.tail = this.head;
    } else {
      new_node.next = this.head;
      this.head = new_node;
    }

    this.length++;
    return this;
  }

  get(index: number): Node<T> | null {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let item = this.head;
    for (let i = 0; i < index; i++) {
      if (!item) continue;
      item = item.next;
    }

    return item;
  }

  set(index: number, value: T): boolean {
    const item = this.get(index);
    if (!item) return false;
    item.value = value;
    return true;
  }

  insert(value: T, index: number): boolean {
    if (index >= this.length) {
      return !!this.push(value);
    } else if (index <= 0) {
      return !!this.unshift(value);
    }

    const previous_item = this.get(index - 1);
    if (!previous_item) return false;
    const next_item = previous_item.next;
    const new_item = new Node(value);
    previous_item.next = new_item;
    new_item.next = next_item;
    this.length++;

    return true;
  }

  remove(index: number): Node<T> | undefined {
    if (index < 0 || index >= this.length) return undefined;
    else if (index === 0) return this.shift();
    else if (index === this.length - 1) return this.pop();

    const previous = this.get(index - 1);
    if (!previous) return undefined;
    const next_item = previous.next;
    if (!next_item) return undefined;
    previous.next = next_item.next;
    this.length--;
    return next_item;
  }

  reverse(): SinglyLinkedList<T> {
    let temp = null as Node<T> | null;
    let current = this.head;
    let prevNode = null as Node<T> | null;

    this.tail = this.head;
    while (current != null) {
      temp = current.next;
      current.next = prevNode;
      prevNode = current;
      current = temp;
    }
    this.head = prevNode;
    return this;
  }

  traverse(): T[] {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}
