import { html } from 'lit-html';

export default (text) => html`
  <div itemprop="text" class="Box-body p-0 blob-wrapper data type-text">
    ${text}
  </div>
`;
