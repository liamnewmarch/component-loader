import { html, render } from '/lit-html/lit-html.js';

export default class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    render(this.template(this), this.shadowRoot);
  }

  template({ name }) {
    return html`
      <style> :host { color: lightblue } </style>
      <p> Oh, no! </p>
    `;
  }
}
