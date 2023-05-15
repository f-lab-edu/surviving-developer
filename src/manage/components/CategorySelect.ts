import { CATEGORY_TYPE } from '../../utils/constant.ts';

export type CategorySelectProps = {
  categoryList: CATEGORY_TYPE;
  className: string;
  defaultOption?: string;
};

export default class QuestionList {
  props: CategorySelectProps;
  $element: HTMLSelectElement;

  constructor(props: CategorySelectProps) {
    this.props = props;
    this.$element = document.createElement('select');
    this.createElement();
  }

  private createElement() {
    const { categoryList, defaultOption, className } = this.props;

    this.$element.className = className;
    this.$element.innerHTML = `
      ${!defaultOption ? `<option value="all" selected>전체</option>` : ''}
      ${Object.keys(categoryList).map(
        (category) => `<option value="${category}">${category}</option>`,
      )}
    `;
  }

  get component() {
    return this.$element;
  }
}
