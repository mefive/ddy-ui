export function travel(array = [], cb = () => {}, key, parentNode, level = 1) {
  if (!array || !Array.isArray(array)) {
    return;
  }

  array.forEach((node) => {
    cb(node, parentNode, level);

    if (key) {
      travel(node[key], cb, key, node, level + 1);
    }
  });
}

export function flattenWith(array = [], reducer = () => null, key) {
  const flatten = [];

  travel(array, (...p) => flatten.push(reducer(...p)), key);

  return flatten;
}
