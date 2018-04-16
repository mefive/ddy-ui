'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelFullScreen = cancelFullScreen;
exports.requestFullScreen = requestFullScreen;
function cancelFullScreen() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;

  if (requestMethod) {
    // cancel full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== 'undefined') {
    // Older IE.
    var wscript = new ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
}

function requestFullScreen() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;

  // Supports most browsers and their versions.
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== 'undefined') {
    // Older IE.
    var wscript = new ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
  return false;
}