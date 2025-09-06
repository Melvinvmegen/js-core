import { HashTable } from "../src/data-structures/hash_table";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("HashTable", () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  describe("constructor", () => {
    it("should initialize with correct size and empty map", () => {
      expect(hashTable.size).toBe(30); // Default size
      expect(hashTable.map.length).toBe(30);
      expect(hashTable.map.every((bucket) => bucket === undefined)).toBe(true);
    });

    it("should accept a custom size parameter", () => {
      const customSizeTable = new HashTable(10);
      expect(customSizeTable["size"]).toBe(10);
      expect(customSizeTable["map"].length).toBe(10);
    });
  });

  describe("set", () => {
    it("should add a key-value pair to the hash table", () => {
      const index = hashTable.set("key1", "value1");
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(30);
    });

    it("should handle collisions by storing multiple items at the same index", () => {
      const mockHashTable = new HashTable(30);
      mockHashTable["_hash"] = vi.fn().mockReturnValue(5);
      mockHashTable.set("key1", "value1");
      mockHashTable.set("key2", "value2");
      mockHashTable.set("key3", "value3");

      const bucket = mockHashTable["map"][5];
      expect(bucket.length).toBe(3);
      expect(bucket.find((item) => item[0] === "key1")).toBeTruthy();
      expect(bucket.find((item) => item[0] === "key2")).toBeTruthy();
      expect(bucket.find((item) => item[0] === "key3")).toBeTruthy();
    });

    it("should return the index where the item was stored", () => {
      const tableWithHashAccess = {
        ...hashTable,
        getHash: (key) => hashTable._hash(key),
      };

      const index = hashTable.set("key1", "value1");
      const actualIndex = tableWithHashAccess.getHash("key1");
      expect(index).toBe(actualIndex);
    });

    it("should handle numeric keys", () => {
      const index = hashTable.set(123, "numeric_value");
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(30);
    });
  });

  describe("get", () => {
    it("should return undefined for a key that does not exist", () => {
      expect(hashTable.get("nonexistent_key")).toBeUndefined();
    });

    it("should return the correct value for an existing key", () => {
      hashTable.set("key1", "value1");
      expect(hashTable.get("key1")).toBe("value1");
    });

    it("should return the correct value even when there are collisions", () => {
      const mockHashTable = new HashTable(30);
      mockHashTable["_hash"] = vi.fn().mockReturnValue(5);
      mockHashTable.set("key1", "value1");
      mockHashTable.set("key2", "value2");
      mockHashTable.set("key3", "value3");

      expect(mockHashTable.get("key1")).toBe("value1");
      expect(mockHashTable.get("key2")).toBe("value2");
      expect(mockHashTable.get("key3")).toBe("value3");
    });

    it("should handle numeric keys correctly", () => {
      hashTable.set(123, "numeric_value");
      expect(hashTable.get(123)).toBe("numeric_value");
    });

    it("should return undefined for a key that was deleted", () => {
      hashTable.set("key1", "value1");
      hashTable.delete("key1");
      expect(hashTable.get("key1")).toBeUndefined();
    });
  });

  describe("keys", () => {
    it("should return an empty array for an empty hash table", () => {
      expect(hashTable.keys()).toEqual([]);
    });

    it("should return all keys in the hash table", () => {
      hashTable.set("key1", "value1");
      hashTable.set("key2", "value2");
      hashTable.set("key3", "value3");

      const keys = hashTable.keys();
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
      expect(keys).toContain("key3");
      expect(keys.length).toBe(3);
    });

    it("should return all keys even with collisions", () => {
      const mockHashTable = new HashTable(30);
      mockHashTable["_hash"] = vi.fn().mockReturnValue(5);
      mockHashTable.set("key1", "value1");
      mockHashTable.set("key2", "value2");
      mockHashTable.set("key3", "value3");

      const keys = mockHashTable.keys();
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
      expect(keys).toContain("key3");
      expect(keys.length).toBe(3);
    });

    it("should handle numeric keys", () => {
      hashTable.set(123, "value1");
      hashTable.set(456, "value2");

      const keys = hashTable.keys();
      expect(keys).toContain(123);
      expect(keys).toContain(456);
      expect(keys.length).toBe(2);
    });
  });

  describe("values", () => {
    it("should return an empty array for an empty hash table", () => {
      expect(hashTable.values()).toEqual([]);
    });

    it("should return all values in the hash table", () => {
      hashTable.set("key1", "value1");
      hashTable.set("key2", "value2");
      hashTable.set("key3", "value3");

      const values = hashTable.values();
      expect(values).toContain("value1");
      expect(values).toContain("value2");
      expect(values).toContain("value3");
      expect(values.length).toBe(3);
    });

    it("should return all values even with collisions", () => {
      const mockHashTable = new HashTable(30);
      mockHashTable["_hash"] = vi.fn().mockReturnValue(5);
      mockHashTable.set("key1", "value1");
      mockHashTable.set("key2", "value2");
      mockHashTable.set("key3", "value3");

      const values = mockHashTable.values();
      expect(values).toContain("value1");
      expect(values).toContain("value2");
      expect(values).toContain("value3");
      expect(values.length).toBe(3);
    });
  });

  describe("delete", () => {
    it("should return false when deleting a non-existent key", () => {
      expect(hashTable.delete("nonexistent_key")).toBe(false);
    });

    it("should return true when deleting an existing key", () => {
      hashTable.set("key1", "value1");
      expect(hashTable.delete("key1")).toBe(true);
    });

    it("should actually remove the key-value pair", () => {
      hashTable.set("key1", "value1");
      hashTable.delete("key1");
      expect(hashTable.get("key1")).toBeUndefined();
    });

    it("should handle deleting a key that has collisions", () => {
      const mockHashTable = new HashTable(30);
      mockHashTable["_hash"] = vi.fn().mockReturnValue(5);

      mockHashTable.set("key1", "value1");
      mockHashTable.set("key2", "value2");
      mockHashTable.set("key3", "value3");

      expect(mockHashTable.delete("key1")).toBe(true);
      expect(mockHashTable.get("key1")).toBeUndefined();
      expect(mockHashTable.get("key2")).toBe("value2");
      expect(mockHashTable.get("key3")).toBe("value3");
    });

    it("should maintain correctness when multiple deletions occur", () => {
      hashTable.set("key1", "value1");
      hashTable.set("key2", "value2");
      hashTable.set("key3", "value3");

      expect(hashTable.delete("key1")).toBe(true);
      expect(hashTable.delete("key2")).toBe(true);
      expect(hashTable.delete("key3")).toBe(true);

      expect(hashTable.get("key1")).toBeUndefined();
      expect(hashTable.get("key2")).toBeUndefined();
      expect(hashTable.get("key3")).toBeUndefined();
      expect(hashTable.keys().length).toBe(0);
    });
  });

  describe("clear", () => {
    it("should remove all items from the hash table", () => {
      hashTable.set("key1", "value1");
      hashTable.set("key2", "value2");
      hashTable.set("key3", "value3");

      hashTable.clear();
      expect(hashTable.keys().length).toBe(0);
      expect(hashTable.get("key1")).toBeUndefined();
      expect(hashTable.get("key2")).toBeUndefined();
      expect(hashTable.get("key3")).toBeUndefined();
    });
  });

  describe("collision handling", () => {
    it("should handle multiple items in the same bucket with different keys", () => {
      const collisionTable = new HashTable(10);
      const keys = ["a", "k", "u", "aa", "ka", "ua"];
      const values = ["value1", "value2", "value3", "value4", "value5", "value6"];

      for (let i = 0; i < keys.length; i++) {
        collisionTable.set(keys[i], values[i]);
      }

      for (let i = 0; i < keys.length; i++) {
        expect(collisionTable.get(keys[i])).toBe(values[i]);
      }
    });
  });

  describe("edge cases", () => {
    it("should handle numeric keys with decimal values", () => {
      hashTable.set(1.5, "value1");
      hashTable.set(2.3, "value2");

      expect(hashTable.get(1.5)).toBe("value1");
      expect(hashTable.get(2.3)).toBe("value2");
    });

    it("should handle empty string keys", () => {
      hashTable.set("", "empty_value");
      expect(hashTable.get("")).toBe("empty_value");
    });

    it("should handle key 0", () => {
      hashTable.set(0, "zero_value");
      expect(hashTable.get(0)).toBe("zero_value");
    });

    it("should handle very large keys", () => {
      const largeKey = "x".repeat(1000);
      const largeValue = "large_value";
      hashTable.set(largeKey, largeValue);
      expect(hashTable.get(largeKey)).toBe(largeValue);
    });

    it("should handle keys that are only numbers as strings", () => {
      hashTable.set("123", "string_number");
      expect(hashTable.get("123")).toBe("string_number");
    });

    it("should not confuse string numbers with number keys", () => {
      hashTable.set("123", "string");
      hashTable.set(123, "number");
      expect(hashTable.get("123")).toBe("string");
      expect(hashTable.get(123)).toBe("number");
    });
  });
});
