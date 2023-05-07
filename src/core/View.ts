import { Handler } from '../types/types.ts';
import Controller from './Controller.ts';
import Core from './Core.ts';

type Element<T extends HTMLElement> = T;

export default class View extends Core {
  $newEl: Element<HTMLElement>;

  constructor(target: HTMLElement) {
    super();
    this.$newEl = target.cloneNode(true) as HTMLElement;
    this.$newEl.innerHTML = this.getTemplate();
    target.replaceWith(this.$newEl);
  }

  protected addComponent(className: string, component: HTMLElement) {
    const targetList = this.$newEl.querySelectorAll(className);
    Array.from(targetList).forEach((target) => target.replaceWith(component));
  }

  addEvent(handler: Handler<Controller>) {}
  protected runDomEvents() {}
  protected getTemplate(): string {
    return '';
  }

  protected hide(classList: string[]) {
    classList.forEach((className) => {
      const element = this.$newEl.querySelector(className) as HTMLElement;
      if (element) {
        element.style.display = 'none';
      }
    });
  }
  protected show(classList: string[]) {
    classList.forEach((className) => {
      const element = this.$newEl.querySelector(className) as HTMLElement;
      if (element) {
        element.style.display = 'block';
      }
    });
  }

  static render() {}
}
