import View from '../View';

export default class LayoutView extends View {
  constructor() {
    super(document.querySelector('main'));
  }
  getTemplate() {
    return `<div style="color: #000">NotFound</div>`;
  }
}
