'use strict';

/**
 * if using a feature that requires a browser-polyfill
 * @see https://babeljs.io/docs/usage/polyfill/
 */
require('babel/browser-polyfill');

import PositionSticky from './position-sticky';

export default function (selector) {
  return new PositionSticky(selector);
}