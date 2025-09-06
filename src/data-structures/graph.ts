import { PriorityQueue } from "./priority_queue";

// TODO add weighted graphs
export class GraphList<T extends string | number = string> {
  private adjacencyList: Record<T, T[]>;

  constructor() {
    this.adjacencyList = {} as Record<T, T[]>;
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  removeEdge(vertex1: T, vertex2: T): void {
    if (this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => v !== vertex2);
    }

    if (this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => v !== vertex1);
    }
  }

  removeVertex(vertex: T): void {
    if (!this.adjacencyList[vertex]) return;
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      if (adjacentVertex) {
        this.removeEdge(vertex, adjacentVertex);
      }
    }
    delete this.adjacencyList[vertex];
  }

  depthFirstRecursive(start: T): T[] {
    const visited: Record<T, boolean> = {} as Record<T, boolean>;
    const ordered: T[] = [];
    const adjacencyList = this.adjacencyList;

    (function traverse(vertex?: T) {
      if (!vertex || !adjacencyList[vertex]) return null;

      visited[vertex] = true;
      ordered.push(vertex);
      for (const neighbor of adjacencyList[vertex]) {
        if (visited[neighbor]) continue;
        traverse(neighbor);
      }
    })(start);

    return ordered;
  }

  depthFirstIterative(start: T): T[] {
    const stack: T[] = [start];
    const visited: Record<T, boolean> = {} as Record<T, boolean>;
    const ordered: T[] = [];
    visited[start] = true;

    while (stack.length) {
      const vertex = stack.pop();
      if (!vertex || !this.adjacencyList[vertex]) continue;
      ordered.push(vertex);
      for (const neighbor of this.adjacencyList[vertex]) {
        if (visited[neighbor]) continue;
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }

    return ordered;
  }

  breadthFirstTraversal(start: T): T[] {
    const queue: T[] = [start];
    const visited: Record<T, boolean> = {} as Record<T, boolean>;
    const ordered: T[] = [];
    visited[start] = true;

    while (queue.length) {
      const vertex = queue.shift();
      if (!vertex || !this.adjacencyList[vertex]) break;
      ordered.push(vertex);
      for (const neighbor of this.adjacencyList[vertex]) {
        if (visited[neighbor]) continue;
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }

    return ordered;
  }

  Dijkstra(start: T, finish: T): T[] {
    if (!this.adjacencyList[start] || !this.adjacencyList[finish]) {
      return [];
    }
    const nodes = new PriorityQueue();
    const distances: Record<T, number> = {} as Record<T, number>;
    const previous: Record<T, T | null> = {} as Record<T, T | null>;
    const path: T[] = [];
    let smallest: T | undefined;

    // Initialize distances and priority queue
    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values().length) {
      const node = nodes.dequeue();
      if (node) {
        smallest = node.value as T;
      } else {
        break;
      }

      if (smallest === finish) {
        let current = smallest;
        while (current && previous[current]) {
          path.push(current);
          current = previous[current];
        }
        if (current === start) {
          path.push(start);
        }
        return path.reverse();
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (const neighbor of this.adjacencyList[smallest]) {
          const candidate = distances[smallest] + 1;
          if (candidate < distances[neighbor]) {
            distances[neighbor] = candidate;
            previous[neighbor] = smallest;
            nodes.enqueue(neighbor, candidate);
          }
        }
      }
    }
    return [];
  }
}

export class GraphMatrix<T extends string | number = string> {
  private vertices: T[];
  private adjacencyMatrix: number[][];

  constructor(size: number) {
    this.vertices = new Array(size) as T[];
    this.adjacencyMatrix = new Array(size).fill([]).map(() => new Array(3).fill(0));
  }

  addVertex(vertex: T): void {
    if (!this.vertices.includes(vertex)) {
      this.vertices.push(vertex);
      this.adjacencyMatrix.forEach((row) => row.push(0));
      this.adjacencyMatrix.push(new Array(this.vertices.length).fill(0));
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    if (index1 !== -1 && index2 !== -1) {
      this.adjacencyMatrix[index1][index2] = 1;
      this.adjacencyMatrix[index2][index1] = 1;
    }
  }

  removeEdge(vertex1: T, vertex2: T): void {
    const index1 = this.vertices.indexOf(vertex1);
    const index2 = this.vertices.indexOf(vertex2);

    if (index1 !== -1 && index2 !== -1) {
      this.adjacencyMatrix[index1][index2] = 0;
      this.adjacencyMatrix[index2][index1] = 0;
    }
  }

  removeVertex(vertex: T): void {
    const index = this.vertices.indexOf(vertex);

    if (index !== -1) {
      this.vertices.splice(index, 1);
      this.adjacencyMatrix.splice(index, 1);
      this.adjacencyMatrix.forEach((row) => row.splice(index, 1));
    }
  }

  depthFirstTraversal(start: T): T[] {
    const visited: Record<number, boolean> = {};
    const result: T[] = [];

    const vertices = this.vertices;
    const adjacencyMatrix = this.adjacencyMatrix;
    function traverse(vertexIndex) {
      visited[vertexIndex] = true;
      result.push(vertices[vertexIndex]);

      for (let i = 0; i < adjacencyMatrix[vertexIndex].length; i++) {
        if (adjacencyMatrix[vertexIndex][i] === 1 && !visited[i]) {
          traverse(i);
        }
      }
    }

    const startIndex = this.vertices.indexOf(start);
    if (startIndex !== -1) {
      traverse(startIndex);
    }

    return result;
  }

  breadthFirstTraversal(start: T): T[] {
    const visited: Record<number, boolean> = {};
    const result: T[] = [];
    const queue: number[] = [];

    const startIndex = this.vertices.indexOf(start);
    if (startIndex !== -1) {
      queue.push(startIndex);
      visited[startIndex] = true;

      while (queue.length) {
        const vertexIndex = queue.shift() as number;
        result.push(this.vertices[vertexIndex]);

        for (let i = 0; i < this.adjacencyMatrix[vertexIndex].length; i++) {
          if (this.adjacencyMatrix[vertexIndex][i] === 1 && !visited[i]) {
            visited[i] = true;
            queue.push(i);
          }
        }
      }
    }

    return result;
  }

  Dijkstra(start, finish) {
    const startIndex = this.vertices.indexOf(start);
    const finishIndex = this.vertices.indexOf(finish);

    if (startIndex === -1 || finishIndex === -1) {
      return [];
    }

    const nodes = new PriorityQueue();
    const distances: number[] = new Array(this.vertices.length).fill(Infinity);
    const previous: (number | null)[] = new Array(this.vertices.length).fill(null);
    const path: T[] = [];
    let smallest: number | undefined;

    distances[startIndex] = 0;
    for (let i = 0; i < this.vertices.length; i++) {
      nodes.enqueue(i, distances[i]);
    }

    while (nodes.values().length) {
      const node = nodes.dequeue();
      if (node == null || node === undefined) break;
      smallest = node.value as number;
      const smallestVertex = this.vertices[smallest];
      if (smallestVertex === finish) {
        let currentIndex = smallest;
        while (currentIndex !== startIndex && previous[currentIndex] !== null) {
          path.push(this.vertices[currentIndex]);
          currentIndex = previous[currentIndex] as number;
        }

        if (currentIndex == 0) {
          path.push(this.vertices[0]);
        }

        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let i = 0; i < this.adjacencyMatrix[smallest].length; i++) {
          if (this.adjacencyMatrix[smallest][i] === 1) {
            const candidate = distances[i] === Infinity ? 1 : distances[i];
            if (candidate < distances[i]) {
              distances[i] = candidate;
              previous[i] = smallest;
              nodes.enqueue(i, candidate);
            }
          }
        }
      }
    }
    return path.reverse();
  }
}
