import { LOG } from '@peter-schweitzer/ez-utils';
import { readFileSync } from 'node:fs';

/**
 * @param {boolean} [is_real=false]
 * @returns {string}
 */
export function read_input(is_real = false) {
  return readFileSync(is_real ? 'input.txt' : 'test.txt', { encoding: 'utf-8' });
}

/**
 * @template {any} T
 * @param {T} val
 * @returns {T}
 */
export function inspect(val) {
  return LOG(val), val;
}

/**
 * positive normalizing mod
 * @param {number} value
 * @param {number} modulo
 * @returns {number}
 */
export function pn_mod(value, modulo) {
  return ((value % modulo) + modulo) % modulo;
}

/**
 * @template {string|(string|number)[][]} Raw
 * @template {boolean} [Num=false]
 * @template {string|number} [T=Raw extends number[][] ? number : Num extends true ? number : Raw extends string ? string : Raw extends (infer RawT)[][] ? RawT : never]
 */
export class MapView {
  /** @type {T[][]} */
  #backing_map;
  #padding;
  #w;
  #h;

  /**
   * @param {Raw} map_data
   * @param {Object} param1
   * @param {T|null|undefined} [param1.padding=undefined]
   * @param {Num} [param1.parse_numbers=false]
   * @param {string} [param1.secondary_delim='']
   */
  // @ts-ignore
  constructor(map_data, { padding = undefined, parse_numbers = false, secondary_delim = '' } = {}) {
    /** @type {(string | number)[][]} */
    let data;
    if (typeof map_data === 'string') data = map_data.split('\n').map((l) => l.split(secondary_delim));
    else data = map_data;

    // @ts-ignore
    if (parse_numbers) this.#backing_map = data.map((l) => l.map((c) => +c));
    // @ts-ignore
    else this.#backing_map = data;

    this.#h = this.#backing_map.length;
    this.#w = this.#backing_map[0].length;

    this.#padding = padding;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {T|undefined}
   */
  at(x, y) {
    const w = this.#w;
    const h = this.#h;

    if (x < 0 || x >= w || y < 0 || y >= h)
      if (this.#padding === undefined) return undefined;
      else if (this.#padding === null) return this.#backing_map[pn_mod(y, h)][pn_mod(x, w)];
      else return this.#padding;
    else return this.#backing_map[y][x];
  }

  /**
   * @template R
   * @template {boolean} [B=false]
   * @param {(value: T, neighbors: {nw: T, n: T, ne: T, e: T, se: T, s: T, sw: T, w: T}, x: number, y: number) => R} fn
   * @param {B} [as_mapview=false]
   * @param {B extends true ? R|null|undefined : undefined} [new_padding=undefined]
   * @returns {B extends true ? MapView<R[][], false, R> : R[][]}
   */
  // @ts-ignore
  foreach(fn, as_mapview = false, new_padding = undefined) {
    /** @type {R[][]} */
    const ret = [];
    for (let y = 0; y < this.#backing_map.length; y++) {
      ret.push([]);
      for (let x = 0; x < this.#backing_map[y].length; x++) {
        const neighbors = {
          nw: this.at(x - 1, y - 1),
          n: this.at(x, y - 1),
          ne: this.at(x + 1, y - 1),
          w: this.at(x - 1, y),
          e: this.at(x + 1, y),
          sw: this.at(x - 1, y + 1),
          s: this.at(x, y + 1),
          se: this.at(x + 1, y + 1),
        };
        ret[y].push(fn(this.#backing_map[y][x], neighbors, x, y));
      }
    }

    // @ts-ignore
    return as_mapview ? new MapView(ret, { padding: new_padding }) : ret;
  }
}
