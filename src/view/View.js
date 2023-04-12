export default class View {
  constructor(target) {
    this.$newEl = target.cloneNode(true);
    this.$newEl.innerHTML = this.getTemplate();
    target.replaceWith(this.$newEl);
  }

  addComponent(className, component) {
    this.$newEl.querySelector(className).replaceWith(component);
  }

  addEvent() {}
  runDomEvents() {}
  getTemplate() {}
  hide(classList) {
    classList.forEach(className => {
      this.$newEl.querySelector(className).style.display = 'none';
    });
  }
  show(classList) {
    classList.forEach(className => {
      this.$newEl.querySelector(className).style.display = 'block';
    });
  }
}
