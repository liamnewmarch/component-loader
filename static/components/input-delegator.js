import { html, render } from '/lit-html/lit-html.js';

export default class extends HTMLElement {
  static observedAttribute = ['aria-controls'];

  constructor() {
    super();
    this.input = this.input.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() {
    render(this.template(this), this.shadowRoot);
  }

  connectedCallback() {
    this.addEventListener('input', this.input);
    render(this.template(this), this.shadowRoot);
  }

  input({ target }) {
    if (!this.getAttribute('aria-controls')) return;
    const id = this.getAttribute('aria-controls');
    const controlled = document.getElementById(id);
    controlled[target.name] = target.value;
  }

  template() {
    return html`<slot></slot>`;
  }
}
