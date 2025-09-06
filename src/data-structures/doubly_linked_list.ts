export class Node<T> {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T): DoublyLinkedList<T> {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  pop(): Node<T> | undefined {
    if (!this.head) return undefined;
    const current_tail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail?.prev || null;
      if (this.tail) {
        this.tail.next = null;
      }
      current_tail.prev = null;
    }

    this.length--;
    return current_tail;
  }

  shift(): Node<T> | undefined {
    if (!this.head) return undefined;
    const current_head = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head.prev = null;
      this.head = current_head.next;
      current_head.next = null;
    }

    this.length--;
    return current_head;
  }

  unshift(value: T): DoublyLinkedList<T> {
    const new_node = new Node(value);
    if (!this.head) {
      this.head = new_node;
      this.tail = this.head;
    } else {
      new_node.next = this.head;
      this.head.prev = new_node;
      this.head = new_node;
    }

    this.length++;
    return this;
  }

  get(index: number): Node<T> | null {
    if (this.length === 0 || this.length <= index || index < 0) return null;
    let item;
    if (index > this.length / 2) {
      item = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        item = item.prev;
      }
    } else {
      item = this.head;
      for (let i = 0; i < index; i++) {
        item = item.next;
      }
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
    if (index >= this.length) return !!this.push(value);
    else if (index <= 0) return !!this.unshift(value);
    const next_item = this.get(index);
    if (!next_item) return false;

    const new_item = new Node(value);
    const previous_item = next_item.prev;
    if (previous_item) {
      previous_item.next = new_item;
    }
    next_item.prev = new_item;
    new_item.prev = previous_item;
    new_item.next = next_item;
    this.length++;
    return true;
  }

  remove(index: number): Node<T> | undefined {
    if (index === 0) return this.shift();
    else if (index === this.length - 1) return this.pop();
    const item = this.get(index);
    if (!item) return undefined;
    const previous = item.prev;
    const next = item.next;
    if (previous) {
      previous.next = next;
    }
    if (next) {
      next.prev = previous;
    }
    this.length--;
    return item;
  }

  reverse(): DoublyLinkedList<T> {
    let temp = null as Node<T> | null;
    let current = this.head;
    this.tail = this.head;
    while (current != null) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }

    if (temp != null) {
      this.head = temp.prev;
    }

    return this;
  }
}
