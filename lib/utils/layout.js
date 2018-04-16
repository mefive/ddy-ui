'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPopoverContainer = getPopoverContainer;
function getPopoverContainer() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#main';

  var containerParent = selector instanceof Node ? selector : document.querySelector(selector);

  var container = document.createElement('div');

  containerParent.appendChild(container);

  return container;
}