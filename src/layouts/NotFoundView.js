import View from '../core/View';

export default class NotFoundView extends View {
  static render() {
    document.querySelector(
      'main',
    ).innerHTML = `<div style="color: #000">NotFound</div>`;
  }
}
