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
}
