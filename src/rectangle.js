'use strict';

export default class Rectangle {
  
  constructor(element) {
    this._top = element.offsetTop;
    this._left = element.offsetLeft;
    this._width = element.clientWidth;
    this._height = element.clientHeight;
  }
  
  get top() {
    return this._top;
  }

  set top(value) {
    this._top = value;
  }
  
  get left() {
    return this._left;
  }

  set left(value) {
    this._left = value;
  }
  
  get right() {
    return this._left + this._width;
  }
  
  get bottom() {
    return this._top + this._height;
  }
  
  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }
  
  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }
}