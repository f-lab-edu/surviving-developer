import View from '../../core/View';
import NotFoundViewTemplate from './NotFoundViewTemplate';

export default class NotFoundView extends View {
  static render() {
    document.querySelector('main').innerHTML = NotFoundViewTemplate;
  }
}
