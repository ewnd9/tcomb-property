import test from 'ava';

import t from 'tcomb';
import { property, createInstance } from '../src/';

const Show = t.struct({
  title: t.String,
  duration: property(t.String, '40m'),
  network: t.struct({
    country: property(t.String, 'USA'),
  })
});

test('empty', assert => {
  assert.deepEqual(createInstance(Show), {
    title: undefined,
    duration: '40m',
    network: {
      country: 'USA'
    }
  });
});

test('new props', assert => {
  const props = { title: 'Top Gear', duration: '20m', network: { country: 'UK' } };
  assert.deepEqual(createInstance(Show, props), {
    title: 'Top Gear',
    duration: '20m',
    network: {
      country: 'UK'
    }
  });
});
