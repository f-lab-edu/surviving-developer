import View from '../../core/View.ts';
import NotFoundViewTemplate from './NotFoundViewTemplate.ts';

export default class NotFoundView extends View {
  static render() {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = NotFoundViewTemplate;
  }
}
