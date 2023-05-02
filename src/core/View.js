import Core from './Core';

export default class View extends Core {
  constructor(target) {
    super();
    this.$newEl = target.cloneNode(true);
    this.$newEl.innerHTML = this.getTemplate();
    target.replaceWith(this.$newEl);
  }

  addComponent(className, component) {
    const targetList = this.$newEl.querySelectorAll(className);
    Array.from(targetList).forEach(target => target.replaceWith(component));
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

  static render() {}
}
