'use strict';

import Rectangle from './rectangle';
import util from './util';

export default class PositionSticky {

  constructor(element) {

    this.sticky = element;
    this.parent = element.parentNode;

    this.diff = {
      top: this.sticky.offsetTop - this.parent.offsetTop,
      left: this.sticky.offsetLeft - this.parent.offsetLeft
    };

    this.original = {
      position: element.style.position,
      top: Number(element.style.top.replace(/[^0-9]/g, '')),
      bottom: Number(element.style.bottom.replace(/[^0-9]/g, '')),
      width: element.style.width,
      height: element.style.height
    };
  }

  attach() {

    this.onscroll = this.scrollHandler.bind(this);
    this.onresize = this.resizeHandler.bind(this);

    window.addEventListener('scroll', this.onscroll);
    window.addEventListener('resize', this.onresize);
  }

  detach() {

    if (this.onscroll) {
      window.removeEventListener('scroll', this.onscroll);
      this.onscroll = null;
    }

    if (this.onresize) {
      window.removeEventListener('resize', this.onresize);
      this.onresize = null;
    }
  }

  scrollHandler() {

    let sticky = new Rectangle(this.sticky);
    let parent = new Rectangle(this.parent);

    if (window.scrollY + sticky.height - this.original.bottom > parent.bottom - this.diff.top) {

      util.setStyle(this.sticky, {
        position: 'absolute',
        top: `${parent.bottom - sticky.height - this.diff.top}px`,
        left: 'auto'
      });

    } else if (window.scrollY >= parent.top - this.original.top) {

      util.setStyle(this.sticky, {
        position: 'fixed',
        top: `${this.original.top}px`,
        left: `${parent.left + this.diff.left}px`,
        width: `${sticky.width}px`
      });

    } else {

      util.setStyle(this.sticky, {
        position: this.original.position,
        width: this.original.width,
        height: this.original.height
      });
    }
  }

  resizeHandler() {
    this.onScroll.call(this);
  }
}
