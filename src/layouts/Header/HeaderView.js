import View from '../../core/View';
import headerViewTemplate from './headerViewTemplate';

export default class HeaderView extends View {
  static render() {
    document.querySelector('header').innerHTML = headerViewTemplate();
  }
}
