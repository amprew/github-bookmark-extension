import { html } from 'lit-html';

import listRowTemplate from './list-row';
import textBox from '../shared/text-box';

export default (bookmarks) => {
  return html`
    <div class="page-content position-relative container-lg p-responsive">
      <h2 class="mb-3">Your bookmarks</h2>

      <div class="Box Box--responsive hx_Box--firstRowRounded0" id="js-issues-toolbar" data-pjax="">
        <div class="js-navigation-container js-active-navigation-container" data-issue-and-pr-hovercards-enabled=""
          data-repository-hovercards-enabled="">

          ${
            bookmarks.length ?
              bookmarks.map(listRowTemplate) :
              textBox('No bookmarks found.')
          }
        </div>
      </div>
    </div>
  `;
}
