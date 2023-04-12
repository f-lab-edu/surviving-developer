import View from '../View';
import layoutViewTemplate from './layoutViewTemplate';
import HeaderView from './Header/HeaderView';

export default class LayoutView extends View {
  constructor() {
    super(document.querySelector('#app'));
    new HeaderView();
  }
  getTemplate() {
    return layoutViewTemplate();
  }
}
