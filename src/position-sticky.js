'use strict';

class PositionSticky {
  
  constructor(selector) {
    
    this.element = document.querySelector(selector);
    this.container = this.element.parentNode;
    this.clone = null;

    this.rectangle = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      width: this.element.clientWidth,
      height: this.element.clientHeight
    };
    
    this.containerRectangle = {
      top: this.container.offsetTop,
      left: this.container.offsetLeft,
      right: this.container.offsetLeft + this.container.clientWidth,
      bottom: this.container.offsetTop + this.container.clientHeight,
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    
    this.top = this.element.style.top.replace('px', '') - 0;

    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }
  
  onScroll(e) {

    if (window.scrollY + this.rectangle.height > this.containerRectangle.bottom) {

      if (this.clone) {

        document.body.removeChild(this.clone);
        this.clone = null;

        this.container.style.position = 'relative';
        this.element.style.position = 'absolute';
        this.element.style.top = '';
        this.element.style.bottom = '10px';
        this.element.style.visibility = 'visible';
      }

    } else if (window.scrollY >= this.rectangle.top - this.top) {

      if (!this.clone) {

        this.clone = this.element.cloneNode(true);
        this.clone.style.position = 'fixed';
        this.clone.style.top = this.top + 'px';
        this.clone.style.left = this.rectangle.left + 'px';
        this.clone.style.width = this.rectangle.width + 'px';
        document.body.appendChild(this.clone);

        this.element.style.visibility = 'hidden';
      }

    } else {
      
      if (this.clone) {

        document.body.removeChild(this.clone);
        this.clone = null;

        this.container.style.position = '';
        this.element.style.position = '';
        this.element.style.bottom = '';
        this.element.style.visibility = 'visible';
      }

    }
  }
  
  onResize(e) {
    if (this.clone) {
      this.offset = {
        top: this.element.offsetTop,
        left: this.element.offsetLeft
      };
      
      this.clone.style.left = this.rectangle.left + 'px';
      this.clone.style.width = this.rectangle.width + 'px';
    }
  }
}

export default PositionSticky;