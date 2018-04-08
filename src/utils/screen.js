export function cancelFullScreen(el = document) {
  const requestMethod
    = el.cancelFullScreen
    || el.webkitCancelFullScreen
    || el.mozCancelFullScreen
    || el.exitFullscreen;

  if (requestMethod) { // cancel full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
}

export function requestFullScreen(el = document.documentElement) {
  // Supports most browsers and their versions.
  const requestMethod
    = el.requestFullScreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    || el.msRequestFullscreen;

  if (requestMethod) { // Native full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
  return false;
}
