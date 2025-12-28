import { LOG } from '@peter-schweitzer/ez-utils';
import { inspect, read_input } from '../utils.js';

// const text = read_input();
const text = read_input(true);

const banks = text.split('\n').map((s) => {
  const chars = [];
  for (const c of s) chars.push(+c);
  return chars;
});

/**
 * @param {number[]} bank
 * @returns {number}
 */
function find_max_joltage(bank) {
  const ten = bank.slice(0, -1).sort().pop();
  const first_idx = bank.findIndex((v) => v === ten);
  const one = bank
    .slice(first_idx + 1)
    .sort()
    .pop();

  return inspect(ten * 10 + one);
}

const jolts = banks.map(find_max_joltage).reduce((acc, val) => acc + val, 0);

LOG(jolts);
