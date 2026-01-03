import { LOG } from '@peter-schweitzer/ez-utils';
import { inspect, MapView, read_input } from '../utils.js';

// const text = read_input();
const text = read_input(true);

const map = new MapView(text, { padding: '.' });

const a = map.foreach((value, neighbors) => {
  if (value === '.') return 0;

  let free = 0;
  for (const dir in neighbors) if (neighbors[dir] === '@') free++;

  return free < 4 ? 1 : 0;
});

const sum = inspect(a).reduce((acc, l) => acc + l.reduce((a, v) => a + v), 0);

LOG(sum);
