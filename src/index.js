'use strict';

/**
 * if using a feature that requires a browser-polyfill
 * @see https://babeljs.io/docs/usage/polyfill/
 */
require('babel/browser-polyfill');

import PositionSticky from './position-sticky';

export default {
  PositionSticky: PositionSticky,
  attach: function (element) {
    let positionSticky = new PositionSticky(element);
    positionSticky.attach();
    return positionSticky;
  }
}

if (document.registerElement) {
  let StickyElementPrototype = Object.create(HTMLElement.prototype);

  StickyElementPrototype.createdCallback = function () {
    this.positionSticky = new PositionSticky(this);
  };

  StickyElementPrototype.attachedCallback = function () {
    this.positionSticky.attach();
  };

  StickyElementPrototype.detachedCallback = function () {
    this.positionSticky.detach();
  };

  document.registerElement('position-sticky', {
    prototype: StickyElementPrototype,
    extends: 'div'
  });
}
