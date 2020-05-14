import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { parseMd } from '../../shared/markdown';

import textBox from '../shared/text-box';

export default (notes) => {
  const markdownHtml = unsafeHTML(`<div>${parseMd(notes)}</div>`);

  return html`
    ${textBox(html`
      <div class="position-relative markdown-body">
        <button
          type="button"
          class="position-absolute top-2 right-2 btn btn-sm btn-outline js-notes-edit"
        >Edit</button>

        <div class="d-block p-3 js-notes-md">${markdownHtml}</div>
        <textarea
          class="d-block border-0 p-3 js-notes-textarea"
          spellcheck="false"
          style="min-width: 100%;"
          placeholder="Add notes here..."
          hidden
        >${notes}</textarea>
      </div>
    `)}
  `;
}
