'use strict';

export default {

  setStyle: (element, properties) => {
    Object.keys(properties).forEach((key) => {
      element.style[key] = properties[key];
    });
  }

};