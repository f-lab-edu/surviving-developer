export default abstract class Modal<T> {
  $element: HTMLDivElement;
  props: T;

  constructor(props: T) {
    this.props = props;
    this.$element = document.createElement('div');
    this.createElement('modal_area');
    this.addEvent();
  }

  protected abstract createElement(className: string): void;

  private addEvent() {
    this.$element.addEventListener('click', (event: MouseEvent) => {
      const { target, currentTarget } = event;
      if (target !== currentTarget) {
        return;
      }
      this.closeModal();
    });
  }

  closeModal() {
    const modal = document.querySelector('.modal_area') as HTMLDivElement;
    modal.classList.remove('is__show');
    modal.innerHTML = '';
  }
}
