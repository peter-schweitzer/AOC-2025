import { LOG } from '@peter-schweitzer/ez-utils';
import { read_input } from '../utils.js';

const text = read_input(true);

const lines = text.split('\n');

let count = 0;
let pos = 50;

for (const line of lines) {
  const dir = line[0] == 'R' ? 1 : -1;
  const amount = +line.slice(1);
  pos = (pos + amount * dir + 100) % 100;

  if (pos === 0) count++;
}

LOG(count);
