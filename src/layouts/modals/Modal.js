export default class Modal {
  constructor(props) {
    this.props = props;
    this.$element = document.createElement('div');
    this.createElement('modal_area');
    this.#addEvent();
  }

  createElement() {}

  #addEvent() {
    this.$element.addEventListener('click', ({ target, currentTarget }) => {
      if (target !== currentTarget) {
        return;
      }
      this.closeModal();
    });
  }

  closeModal() {
    const modal = document.querySelector('.modal_area');
    modal.classList.remove('is__show');
    modal.innerHTML = '';
  }
}
