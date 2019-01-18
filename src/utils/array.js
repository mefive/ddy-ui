export function travel(array = [], cb = () => {}, {
  key, parentNode, level = 1, depth,
}) {
  if (!array || !Array.isArray(array) || (depth != null && level > depth)) {
    return;
  }

  array.forEach((node) => {
    cb(node, parentNode, level);

    if (key) {
      travel(node[key], cb, {
        key, parentNode: node, level: level + 1, depth,
      });
    }
  });
}

export function flattenWith(array = [], reducer = () => null, key, depth) {
  const flatten = [];

  travel(array, (...p) => flatten.push(reducer(...p)), { key, depth });

  return flatten;
}
