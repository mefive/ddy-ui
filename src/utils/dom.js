export function scrollTop(element, top) {
  if (element.scrollTo != null) {
    element.scrollTo(0, top);
  } else {
    // eslint-disable-next-line
    element.scrollTop = top;
  }
}
