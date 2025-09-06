export interface KeyValuePair<K, V> extends Array<K | V> {
  0: K;
  1: V;
}
