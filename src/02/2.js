import { LOG } from '@peter-schweitzer/ez-utils';
import { read_input } from '../utils.js';

// const text = read_input();
const text = read_input(true);

const ranges = text.split(',').map((s) => s.split('-').map((n) => +n));

let count = 0;

const primes = [2, 3, 5, 7, 9, 11, 13];

/**
 * @param {string} str
 * @returns {boolean}
 */
function check_for_repeating_patterns(str) {
  const len = str.length;

  for (const parts of primes) {
    if (len < parts) return false;
    else if (len % parts) continue;

    const part_len = len / parts;
    const pattern = str.slice(0, part_len);

    let same = true;
    for (let part = 2; part <= parts; part++) same &&= pattern === str.slice(part_len * (part - 1), part_len * part);

    if (same) {
      LOG(`\x1b[35m${pattern}\x1b[32m${pattern.repeat(parts - 1)}\x1b[0m (\x1b[33m${parts}\x1b[0m)`);
      return true;
    }
  }

  return false;
}

for (const [s, e] of ranges)
  for (let i = s; i <= e; i++) {
    const str = i.toString();
    if (!str.slice(1).includes(str[0])) continue;

    if (check_for_repeating_patterns(str)) {
      count += i;
    }
  }

LOG(count);
