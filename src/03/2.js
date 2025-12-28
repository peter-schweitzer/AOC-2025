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
  let val = '';
  let start_idx = 0;
  for (let i = 0; i < 11; i++) {
    const num = bank
      .slice(start_idx, i - 11)
      .sort()
      .at(-1);
    start_idx = bank.findIndex((v, i) => i >= start_idx && v === num) + 1;

    val += num;
  }
  val += bank.slice(start_idx).sort().at(-1);

  return inspect(+val);
}

const jolts = banks.map(find_max_joltage).reduce((acc, val) => acc + val, 0);

LOG('jolts:', jolts);
