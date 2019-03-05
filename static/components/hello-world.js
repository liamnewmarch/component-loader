import { html, render } from '/lit-html/lit-html.js';

export default class extends HTMLElement {
  static observedAttributes = ['name'];

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value || '');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() {
    render(this.template(this), this.shadowRoot);
  }

  connectedCallback() {
    render(this.template(this), this.shadowRoot);
  }

  template({ name }) {
    return html`
      <style>
      :host {
        color: var(--color, lightyellow);
      }
      </style>
      <p> Hello, ${name} </p>`;
  }
}
