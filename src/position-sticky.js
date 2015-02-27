'use strict';

class PositionSticky {
  
  constructor(selector) {
    
    this.element = document.querySelector(selector);
    this.clone = null;

    this.offset = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft
    };
 
    this.size = {
      width: this.element.clientWidth,
      height: this.element.clientHeight
    };
    
    this.top = this.element.style.top.replace('px', '') - 0;

    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }
  
  onScroll(e) {

    if (window.scrollY >= this.offset.top - this.top) {
      if (!this.clone) {
        this.clone = this.element.cloneNode(true);
        this.clone.style.position = 'fixed';
        this.clone.style.top = this.top + 'px';
        this.clone.style.left = this.offset.left + 'px';
        document.body.appendChild(this.clone);
        this.element.style.visibility = 'hidden';
      }
    } else {
      if (this.clone) {
        document.body.removeChild(this.clone);
        this.clone = null;
        this.element.style.visibility = 'visible';
      }
    }

  }
  
  onResize(e) {
    if (this.clone) {
      // re-calculate offset
      this.offset = {
        top: this.element.offsetTop,
        left: this.element.offsetLeft
      };
      
      this.clone.style.left = this.offset.left;
      this.clone.style.width = this.size.width;
    }
  }
}

export default PositionSticky;