import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM THIS IS FROM JSDOC
   * @param {Object | object[]} data the data to be rendered ex recipe
   * @param {boolean} [render=true] if false, create markup string instead of rendering to dom
   * @returns {undefined | string} a markup string is returned if render= false
   * @this {Object} View instance
   * @author Erik Nuber
   * @todo
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newElem, i) => {
      const curElem = curElements[i];
      //updates changed Text
      if (
        !newElem.isEqualNode(curElem) &&
        newElem.firstChild?.nodeValue.trim() !== ''
      ) {
        curElem.textContent = newElem.textContent;
      }
      //updates changed attributes
      if (!newElem.isEqualNode(curElem)) {
        Array.from(newElem.attributes).forEach(attr =>
          curElem.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = () => {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError = (message = this._errorMessage) => {
    const markup = `
        <div class="error">
            <div>
                <svg>
                <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderMessage = (message = this._message) => {
    const markup = `
        <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}
