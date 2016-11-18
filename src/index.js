'use strict';

const t = require('tcomb');
const merge = require('merge');

const secretKey = '__defaultValue__';

exports.property = property;
exports.createInstance = createInstance;

function property(type, defaultValue) {
  const res = t.refinement(type, type.is);

  res.displayName = type.displayName;
  res[secretKey] = defaultValue;

  return res;
}

function createInstance(type, props = {}) {
  return merge.recursive(rec(type), props);
}

function rec(type) {
  if (typeof type[secretKey] !== 'undefined') {
    if (typeof type[secretKey] === 'function') {
      return type[secretKey]();
    } else {
      return type[secretKey];
    }
  }

  const kind = type.meta.kind;

  switch (kind) {
    case 'struct':
      const props = {};

      for (const k in type.meta.props) {
        props[k] = rec(type.meta.props[k]);
      }

      return props;
    default:
      return undefined;
  }
}
