export function padStart(str = '', length = 0, char = '') {
  if (typeof str !== 'string' || typeof char !== 'string') {
    return str;
  }

  const padLength = length - str.length;

  if (padLength <= 0) {
    return str;
  }

  let rt = str;

  for (let i = 0; i < padLength; i += 1) {
    rt = `${char}${rt}`;
  }

  return rt;
}

export function isValidMobile(mobile) {
  return /(^[0-9]{3,4}-[0-9]{3,8}$)|^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(mobile);
}

/* eslint-disable */
export function truncate(fullStr, strLen, separator) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  let sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}
/* eslint-enable */

export function maskPassword(password) {
  if (!password) {
    return null;
  }

  const { length } = password;

  const dots = [];

  for (let i = 0; i < length; i += 1) {
    dots.push('*');
  }

  return dots.join('');
}
