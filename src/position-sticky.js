'use strict';

import Rectangle from './rectangle';
import util from './util';

export default class PositionSticky {

  constructor(element) {

    this.sticky = element;
    this.parent = element.parentNode;
    this.rectangle = new WeakMap();

    this.rectangle.set(this.sticky, new Rectangle(this.sticky));
    this.rectangle.set(this.parent, new Rectangle(this.parent));

    this.diff = {
      top: this.parent.offsetTop - this.parent.offsetTop,
      left: this.sticky.offsetLeft - this.parent.offsetLeft
    };

    this.top    = this.sticky.style.top.replace('px', '') - 0;
    this.bottom = this.sticky.style.bottom.replace('px', '') - 0;

    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onScroll(e) {

    let sticky = this.rectangle.get(this.sticky);
    let parent = this.rectangle.get(this.parent);

    if (window.scrollY + sticky.height + this.bottom > parent.bottom) {

      util.setStyle(this.parent, {
        position: 'relative'
      });

      util.setStyle(this.sticky, {
        position: 'absolute',
        top: '',
        left: '',
        bottom: '0px'
      });

    } else if (window.scrollY >= sticky.top - this.top) {

      util.setStyle(this.sticky, {
        position: 'fixed',
        top: this.top + this.diff.top + 'px',
        left: parent.left + this.diff.left + 'px',
        width: sticky.width + 'px'
      });

    } else {

      util.setStyle(this.parent, {
        position: ''
      });

      util.setStyle(this.sticky, {
        position: '',
        bottom: ''
      });
    }
  }

  onResize(e) {

    this.rectangle.set(this.sticky, new Rectangle(this.sticky));
    this.rectangle.set(this.parent, new Rectangle(this.parent));

    this.onScroll.call(this);
  }
}
