export function formatPrecision(value, precision) {
  const multiplier = 10 ** precision;

  return Math.round(value * multiplier) / multiplier;
}

export function ratioPercent(from, to, precision = 2) {
  if (Number.isNaN(from) || Number.isNaN(to)) {
    return 0;
  }

  if (to === 0) {
    return 1;
  }

  return formatPrecision(((from - to) / to) * 100, precision);
}

export function toFixed(value, precision) {
  if (Number.isNaN(+value) || value == null) {
    return null;
  }

  return (+value).toFixed(precision);
}

