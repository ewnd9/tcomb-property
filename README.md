# tcomb-property

[![Build Status](https://travis-ci.org/ewnd9/tcomb-property.svg?branch=master)](https://travis-ci.org/ewnd9/tcomb-property)

Alternative syntax for defining default props in tcomb structures

## Install

```sh
$ npm install --save tcomb-property
```

## Usage

```js
import t from 'tcomb';
import { property, createInstance } from 'tcomb-property';

const Show = t.struct({
  title: t.String,
  duration: property(t.String, '40m'),
  network: t.struct({
    country: property(t.String, 'USA')
  })
});

createInstance(Show)
/*
{
  title: undefined,
  duration: '40m',
  network: {
    country: 'USA'
  }
}
*/

createInstance(Show, { title: 'Top Gear', duration: '20m', network: { country: 'UK' } })
/*
{
  title: 'Top Gear',
  duration: '20m',
  network: {
    country: 'UK'
  }
}
*/
```

## Related

- [tcomb](https://github.com/gcanti/tcomb/blob/bdd7112314fc1e25880e4e94e2297ff52a0b4817/docs/API.md#the-struct-combinator)
- [tcomb-defaults](https://github.com/ahdinosaur/tcomb-defaults)

## License

MIT © [ewnd9](http://ewnd9.com)
