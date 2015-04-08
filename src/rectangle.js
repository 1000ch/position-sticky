'use strict';

export default class Rectangle {

  constructor(element) {
    this.offsetTop = element.offsetTop;
    this.offsetLeft = element.offsetLeft;
    this.clientWidth = element.clientWidth;
    this.clientHeight = element.clientHeight;
  }

  get top() {
    return this.offsetTop;
  }

  set top(value) {
    this.offsetTop = value;
  }

  get left() {
    return this.offsetLeft;
  }

  set left(value) {
    this.offsetLeft = value;
  }

  get right() {
    return this.offsetLeft + this.clientWidth;
  }

  get bottom() {
    return this.offsetTop + this.clientHeight;
  }

  get width() {
    return this.clientWidth;
  }

  set width(value) {
    this.clientWidth = value;
  }

  get height() {
    return this.clientHeight;
  }

  set height(value) {
    this.clientHeight = value;
  }
}
