export function getPopoverContainer(selector = '#main', isPrepend = false) {
  const containerParent = selector instanceof Node
    ? selector
    : document.querySelector(selector);

  const container = document.createElement('div');

  containerParent.appendChild(container);

  return container;
}
