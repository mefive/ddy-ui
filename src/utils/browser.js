import UAParser from 'ua-parser-js';

const uaParser = new UAParser(navigator.userAgent);

export function getBrowser() {
  return uaParser.getBrowser();
}

export function isOlderIE() {
  const browser = getBrowser();
  return browser.name === 'IE' && browser.version <= 9;
}

export function isMobile() {
  const device = uaParser.getDevice();
  return device.type === 'mobile';
}
