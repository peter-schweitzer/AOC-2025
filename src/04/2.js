import { LOG } from '@peter-schweitzer/ez-utils';
import { inspect, MapView, read_input } from '../utils.js';

// const text = read_input();
const text = read_input(true);

/** @type {MapView<string, false, '.' | '@'>} */
let map = new MapView(text, { padding: '.' });

let total = 0;
let removed;
do {
  removed = 0;
  map = map.foreach((value, neighbors) => {
    if (value === '.') return '.';

    let occupied = 0;
    for (const dir in neighbors) if (neighbors[dir] === '@') occupied++;

    if (occupied < 4) {
      removed++;
      return '.';
    } else return '@';
  }, true);

  total += inspect(removed);
} while (removed > 0);

LOG(total);
