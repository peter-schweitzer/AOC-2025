import { LOG } from '@peter-schweitzer/ez-utils';
import { read_input } from '../utils.js';

// const text = read_input();
const text = read_input(true);

const ranges = text.split(',').map((s) => s.split('-').map((n) => +n));

let count = 0;

for (const [s, e] of ranges) {
  for (let i = s; i <= e; i++) {
    const str = i.toString();
    const len = str.length;
    if (len & 1) continue;

    const half = len >> 1;

    if (str.slice(0, half) === str.slice(half)) count += i;
  }
}

LOG(count);
