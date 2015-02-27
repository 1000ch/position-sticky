'use strict';

import Rectangle from './rectangle';

export default class PositionSticky {
  
  constructor(selector) {
    
    let element = document.querySelector(selector);
    
    this.target = {
      element: element,
      rectangle: new Rectangle(element)
    };

    this.container = {
      element: element.parentNode,
      rectangle: new Rectangle(element.parentNode)
    };

    this.clone = null;
    this.top = this.target.element.style.top.replace('px', '') - 0;

    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }
  
  onScroll(e) {

    if (window.scrollY + this.target.rectangle.height > this.container.rectangle.bottom) {

      if (this.clone) {

        document.body.removeChild(this.clone);
        this.clone = null;

        this.container.element.style.position = 'relative';
        this.target.element.style.position = 'absolute';
        this.target.element.style.top = '';
        this.target.element.style.bottom = '10px';
        this.target.element.style.visibility = 'visible';
      }

    } else if (window.scrollY >= this.target.rectangle.top - this.top) {

      if (!this.clone) {

        this.clone = this.target.element.cloneNode(true);
        this.clone.style.position = 'fixed';
        this.clone.style.top = this.top + 'px';
        this.clone.style.left = this.target.rectangle.left + 'px';
        this.clone.style.width = this.target.rectangle.width + 'px';
        document.body.appendChild(this.clone);

        this.target.element.style.visibility = 'hidden';
      }

    } else {
      
      if (this.clone) {

        document.body.removeChild(this.clone);
        this.clone = null;

        this.container.element.style.position = '';
        this.target.element.style.position = '';
        this.target.element.style.bottom = '';
        this.target.element.style.visibility = 'visible';
      }

    }
  }
  
  onResize(e) {
    if (this.clone) {

      this.offset = {
        top: this.target.element.offsetTop,
        left: this.target.element.offsetLeft
      };
      
      this.clone.style.left = this.target.rectangle.left + 'px';
      this.clone.style.width = this.target.rectangle.width + 'px';
    }
  }
}