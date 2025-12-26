import { LOG } from '@peter-schweitzer/ez-utils';
import { read_input } from '../utils.js';

const text = read_input(true);

const lines = text.split('\n');

let count = 0;
let pos = 50;

for (const line of lines) {
  let amount = +line.slice(1);

  const full_turns = (amount - (amount % 100)) / 100;
  count += full_turns;
  amount %= 100;

  switch (line[0]) {
    case 'R':
      if (amount >= 100 - pos) count++;

      pos += amount;
      pos %= 100;
      break;
    case 'L':
      if (amount >= pos && pos !== 0) count++;

      pos += 100 - amount;
      pos %= 100;
      break;
  }

  pos %= 100;
  LOG(`${line} -> ${pos} (full turns: ${full_turns}, count: ${count})`);
}

LOG('\n\n', count);
