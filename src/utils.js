import { readFileSync } from 'node:fs';

/**
 * @param {boolean} [is_real=false]
 * @returns {string}
 */
export function read_input(is_real = false) {
  return readFileSync(is_real ? 'input.txt' : 'test.txt', { encoding: 'utf-8' });
}
