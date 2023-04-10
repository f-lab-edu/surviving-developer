export const createElement = (tagname, template, className) => {
  const $element = document.createElement(tagname);
  if (template) {
    $element.innerHTML = template;
  }
  if (className) {
    $element.setAttribute('class', className);
  }
  return $element;
};

export const someThing = () => {};
