import { GraphList, GraphMatrix } from "../src/data-structures/graph";
import { describe, expect, it, beforeEach } from "vitest";

describe("GraphList", () => {
  let graph;

  beforeEach(() => {
    graph = new GraphList();
  });

  describe("constructor", () => {
    it("should initialize with empty adjacency list", () => {
      expect(graph.adjacencyList).toEqual({});
    });
  });

  describe("addVertex", () => {
    it("should add a vertex to the graph", () => {
      graph.addVertex("A");
      expect(graph.adjacencyList).toEqual({ A: [] });
    });

    it("should not add duplicate vertices", () => {
      graph.addVertex("A");
      graph.addVertex("A");
      expect(graph.adjacencyList).toEqual({ A: [] });
    });
  });

  describe("addEdge", () => {
    it("should add an edge between two vertices", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addEdge("A", "B");
      expect(graph.adjacencyList).toEqual({ A: ["B"], B: ["A"] });
    });

    it("should not add edge if vertices do not exist", () => {
      graph.addEdge("A", "B");
      expect(graph.adjacencyList).toEqual({});
    });
  });

  describe("removeEdge", () => {
    it("should remove an edge between two vertices", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addEdge("A", "B");
      expect(graph.adjacencyList).toEqual({ A: ["B"], B: ["A"] });
      graph.removeEdge("A", "B");
      expect(graph.adjacencyList).toEqual({ A: [], B: [] });
    });

    it("should handle non-existent edges gracefully", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.removeEdge("A", "B");
      expect(graph.adjacencyList).toEqual({ A: [], B: [] });
    });
  });

  describe("removeVertex", () => {
    it("should remove a vertex and all its edges", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.removeVertex("A");
      expect(graph.adjacencyList).toEqual({ B: [], C: [] });
    });

    it("should handle non-existent vertices gracefully", () => {
      graph.removeVertex("A");
      expect(graph.adjacencyList).toEqual({});
    });
  });

  describe("depthFirstRecursive", () => {
    it("should return correct DFS traversal for a graph", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const result = graph.depthFirstRecursive("A");
      const possibleResults = [
        ["A", "B", "D", "E", "C", "F"],
        ["A", "B", "D", "E", "F", "C"],
        ["A", "B", "D", "F", "E", "C"],
        ["A", "C", "E", "B", "D", "F"],
        ["A", "C", "E", "D", "B", "F"],
        ["A", "C", "E", "D", "F", "B"],
        ["A", "C", "E", "F", "D", "B"],
      ];
      expect(possibleResults).toContainEqual(result);
    });

    it("should return empty array for non-existent start vertex", () => {
      const result = graph.depthFirstRecursive("A");
      expect(result).toEqual([]);
    });
  });

  describe("depthFirstIterative", () => {
    it("should return correct DFS traversal for a graph", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const result = graph.depthFirstIterative("A");
      expect(result).toEqual(["A", "C", "E", "F", "D", "B"]);
    });

    it("should return empty array for non-existent start vertex", () => {
      const result = graph.depthFirstIterative("A");
      expect(result).toEqual([]);
    });
  });

  describe("breadthFirstTraversal", () => {
    it("should return correct BFS traversal for a graph", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const result = graph.breadthFirstTraversal("A");
      expect(result).toEqual(["A", "B", "C", "D", "E", "F"]);
    });

    it("should return empty array for non-existent start vertex", () => {
      const result = graph.breadthFirstTraversal("A");
      expect(result).toEqual([]);
    });
  });

  describe("Dijkstra", () => {
    it("should find shortest path between nodes", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const path = graph.Dijkstra("A", "F");
      expect(path[0]).toBe("A");
      expect(path[path.length - 1]).toBe("F");
      expect(path.length).toBe(4);
    });

    it("should return empty array if no path exists", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addEdge("A", "B");

      const path = graph.Dijkstra("A", "C");
      expect(path).toEqual([]);
    });

    it("should return empty array for non-existent vertices", () => {
      const path1 = graph.Dijkstra("A", "B");
      const path2 = graph.Dijkstra("A", "A");
      expect(path1).toEqual([]);
      expect(path2).toEqual([]);
    });
  });
});

describe("GraphMatrix", () => {
  let graph;

  beforeEach(() => {
    graph = new GraphMatrix(0);
  });

  describe("constructor", () => {
    it("should initialize with empty vertices and matrix", () => {
      expect(graph["vertices"]).toEqual([]);
      expect(graph["adjacencyMatrix"]).toEqual([]);
    });

    it("should initialize with correct size", () => {
      const graphWithSize = new GraphMatrix(3);
      expect(graphWithSize["vertices"]).toEqual([undefined, undefined, undefined]);
      expect(graphWithSize["adjacencyMatrix"]).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
    });
  });

  describe("addVertex", () => {
    it("should add a vertex to the graph", () => {
      graph.addVertex("A");
      expect(graph["vertices"]).toEqual(["A"]);
      expect(graph["adjacencyMatrix"]).toEqual([[0]]);
    });

    it("should not add duplicate vertices", () => {
      graph.addVertex("A");
      graph.addVertex("A");
      expect(graph["vertices"]).toEqual(["A"]);
    });

    it("should expand the adjacency matrix when adding vertices", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      expect(graph["vertices"]).toEqual(["A", "B"]);
      expect(graph["adjacencyMatrix"]).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });
  });

  describe("addEdge", () => {
    it("should add an edge between two vertices", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addEdge("A", "B");
      expect(graph["adjacencyMatrix"]).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });

    it("should not add edge if vertices do not exist", () => {
      graph.addEdge("A", "B");
      expect(graph["vertices"]).toEqual([]);
      expect(graph["adjacencyMatrix"]).toEqual([]);
    });
  });

  describe("removeEdge", () => {
    it("should remove an edge between two vertices", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addEdge("A", "B");
      graph.removeEdge("A", "B");
      expect(graph["adjacencyMatrix"]).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });

    it("should handle non-existent edges gracefully", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.removeEdge("A", "B");
      expect(graph["adjacencyMatrix"]).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });
  });

  describe("removeVertex", () => {
    it("should remove a vertex and all its edges", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "C");
      graph.removeVertex("A");
      expect(graph["vertices"]).toEqual(["B", "C"]);
      expect(graph["adjacencyMatrix"]).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });

    it("should handle non-existent vertices gracefully", () => {
      graph.removeVertex("A");
      expect(graph["vertices"]).toEqual([]);
      expect(graph["adjacencyMatrix"]).toEqual([]);
    });
  });

  describe("depthFirstTraversal", () => {
    it("should return correct DFS traversal for a graph", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const result = graph.depthFirstTraversal("A");
      const possibleResults = [["A", "B", "D", "E", "C", "F"]];
      expect(possibleResults).toContainEqual(result);
    });

    it("should return empty array for non-existent start vertex", () => {
      const result = graph.depthFirstTraversal("A");
      expect(result).toEqual([]);
    });
  });

  describe("breadthFirstTraversal", () => {
    it("should return correct BFS traversal for a graph", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const result = graph.breadthFirstTraversal("A");
      expect(result).toEqual(["A", "B", "C", "D", "E", "F"]);
    });

    it("should return empty array for non-existent start vertex", () => {
      const result = graph.breadthFirstTraversal("A");
      expect(result).toEqual([]);
    });
  });

  describe("Dijkstra", () => {
    it("should find shortest path between nodes", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");
      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");

      const path = graph.Dijkstra("A", "F");
      expect(path.length).toBe(4);
      // Possible shortest paths: A-B-D-F or A-C-E-F
      expect(path[0]).toBe("A");
      expect(path[path.length - 1]).toBe("F");
    });

    it("should return empty array if no path exists", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addEdge("A", "B");

      const path = graph.Dijkstra("A", "C");
      expect(path).toEqual([]);
    });

    it("should return empty array for non-existent vertices", () => {
      const path1 = graph.Dijkstra("A", "B");
      const path2 = graph.Dijkstra("A", "A");
      expect(path1).toEqual([]);
      expect(path2).toEqual([]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty graph operations gracefully", () => {
      expect(graph.depthFirstTraversal("A")).toEqual([]);
      expect(graph.breadthFirstTraversal("A")).toEqual([]);
      expect(graph.Dijkstra("A", "B")).toEqual([]);
    });

    it("should handle disconnected graphs correctly", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addEdge("A", "B");
      expect(graph.breadthFirstTraversal("A")).toEqual(["A", "B"]);
    });
  });
});
