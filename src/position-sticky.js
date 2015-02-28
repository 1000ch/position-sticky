'use strict';

import Rectangle from './rectangle';
import util from './util';

export default class PositionSticky {
  
  constructor(element) {
    
    this.sticky = element;
    this.parent = element.parentNode;
    this.clone = null;
    this.rectangle = new WeakMap();

    this.rectangle.set(this.sticky, new Rectangle(this.sticky));
    this.rectangle.set(this.parent, new Rectangle(this.parent));

    this.top    = this.sticky.style.top.replace('px', '') - 0;
    this.bottom = this.sticky.style.bottom.replace('px', '') - 0;

    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }
  
  onScroll(e) {
    
    let sticky = this.rectangle.get(this.sticky);
    let parent = this.rectangle.get(this.parent);

    if (window.scrollY + sticky.height + this.bottom > parent.bottom) {

      if (!this.clone) {
        return;
      }

      util.setStyle(this.parent, {
        position: 'relative'
      });
      
      util.setStyle(this.sticky, {
        position: 'absolute',
        top: '',
        bottom: '0px',
        visibility: 'visible'
      });

      document.body.removeChild(this.clone);
      this.clone = null;

    } else if (window.scrollY >= sticky.top - this.top) {

      if (this.clone) {
        return;
      }

      this.clone = this.sticky.cloneNode(true);
      
      util.setStyle(this.clone, {
        position: 'fixed',
        top: this.top + 'px',
        left: sticky.left + 'px',
        width: sticky.width + 'px'
      });

      util.setStyle(this.sticky, {
        visibility: 'hidden'
      });

      document.body.appendChild(this.clone);

    } else {
      
      if (!this.clone) {
        return;
      }

      util.setStyle(this.parent, {
        position: ''
      });

      util.setStyle(this.sticky, {
        position: '',
        bottom: '',
        visibility: 'visible'
      });

      document.body.removeChild(this.clone);
      this.clone = null;
    }
  }
  
  onResize(e) { 

    if (!this.clone) {
      return;
    }

    let sticky = this.rectangle[this.sticky] = new Rectangle(this.sticky);
    let parent = this.rectangle[this.parent] = new Rectangle(this.parent);

    util.setStyle(this.clone, {
      left: sticky.left + 'px',
      width: sticky.width + 'px'
    });
  }
}