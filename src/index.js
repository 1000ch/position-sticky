'use strict';

/**
 * if using a feature that requires a browser-polyfill
 * @see https://babeljs.io/docs/usage/polyfill/
 */
require('babel/browser-polyfill');

import PositionSticky from './position-sticky';

export default function (element) {
  return new PositionSticky(element);
}

let StickyElementPrototype = Object.create(HTMLElement.prototype);

StickyElementPrototype.attachedCallback = function () {
  new PositionSticky(this);
};

document.registerElement('position-sticky', {
  prototype: StickyElementPrototype,
  extends: 'div'
});