import View from '../../core/View';
import HeaderViewTemplate from './HeaderViewTemplate.ts';

export default class HeaderView extends View {
  static render() {
    const header = document.querySelector('header') as HTMLElement;
    header.innerHTML = HeaderViewTemplate();
  }
}
