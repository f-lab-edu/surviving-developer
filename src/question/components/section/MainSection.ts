export abstract class MainSection<T> {
  props: T;
  $element: HTMLDivElement;

  constructor(props: T) {
    this.props = props;
    this.$element = document.createElement('div');
  }

  protected abstract createElement(classname: string): void;

  get component() {
    return this.$element;
  }
}
