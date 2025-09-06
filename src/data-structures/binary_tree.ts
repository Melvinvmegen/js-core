export class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T extends number | string = number> {
  private root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T): BinarySearchTree<T> | undefined {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value: T): Node<T> | null {
    if (this.root === null) return null;
    let current: Node<T> | null = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return null;

    return current;
  }

  contains(value: T): boolean {
    if (this.root === null) return false;
    let current: Node<T> | null = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }

    return false;
  }

  remove(val: T): Node<T> | null {
    if (!this.root) return null;
    let node: Node<T> | null = this.root;
    if (node.value === val) {
      if (node.left === null && node.right === null) {
        this.root = null;
        return node;
      } else if (node.left !== null && node.right !== null) {
        let right = node.right;
        if (right.left === null) {
          right.left = node.left;
          this.root = right;
        } else {
          let rightParent = node;
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          rightParent.left = right.right;
          right.left = node.left;
          right.right = node.right;
          this.root = right;
        }
        return node;
      } else {
        this.root = node.left || node.right;
        return node;
      }
    }

    let parentNode;
    while (node?.value !== val) {
      if (!node) return null;
      parentNode = node;
      if ((node?.value || 0) > val) {
        node = node?.left || null;
      } else {
        node = node?.right || null;
      }
    }

    if (node !== this.root) {
      if (node.left === null && node.right === null) {
        if (parentNode.left === node) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      } else if (node.left !== null && node.right !== null) {
        let rightParent = node;
        let right = node.right;
        if (right.left === null) {
          right.left = node.left;
          if (parentNode.left === node) {
            parentNode.left = right;
          } else {
            parentNode.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parentNode.left === node) {
            parentNode.left.value = right.value;
          } else {
            parentNode.right.value = right.value;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parentNode.left === node) {
          if (node.right === null) {
            parentNode.left = node.left;
          } else {
            parentNode.left = node.right;
          }
        } else {
          if (node.right === null) {
            parentNode.right = node.left;
          } else {
            parentNode.right = node.right;
          }
        }
      }
    }

    return node;
  }

  isBalanced(node: Node<T> | null = this.root): boolean {
    if (!node) {
      return true;
    }
    return getHeightDiff(node) !== -1;

    function getHeightDiff(node) {
      if (node === null) return 0;
      const leftHeight = getHeightDiff(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = getHeightDiff(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      } else {
        return Math.max(leftHeight, rightHeight) + 1;
      }
    }
  }

  DFSPreOrder(): T[] {
    const result: T[] = [];
    function traverse(node) {
      if (!node) return;
      result.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  DFSInOrder(): T[] {
    const result: T[] = [];
    function traverse(node) {
      if (!node) return;
      if (node.left) traverse(node.left);
      result.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  DFSPostOrder(): T[] {
    const result: T[] = [];
    function traverse(node) {
      if (!node) return;
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.value);
    }
    traverse(this.root);
    return result;
  }

  BFS(): T[] {
    let node: Node<T> | undefined | null = this.root;
    const result: T[] = [];
    const queue: Node<T>[] = [];
    if (node) {
      queue.push(node);
    }

    while (queue.length) {
      node = queue.shift();
      if (!node) return;
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }
}
