import { html } from 'lit-html';

import textBox from '../shared/text-box';
import notesTemplate from './show-notes';

export default ({
  title = '',
  pathToFile,
  href,
  notes
}) => {
  const getLineRef = () => {
    const lineMatch = href.match(/L(\d+)-?L?(\d+)?/i);
    if (!lineMatch) return;

    const [, line1, line2] = lineMatch;

    return `Line ${line1}${line2 ? `-${line2}` : ''}`;
  };

  return html`
    <div class="page-content position-relative container-lg p-responsive p-5">
      <div class="mb-3">
        <a href="https://github.com/_bookmarks_" class="btn btn-sm btn-outline mr-2" title="Return to bookmarks">
          ←
          <span class="d-md-none">Bookmarks</span>
          <span class="d-none d-md-inline">Back to bookmarks</span>
        </a>
      </div>
      <div class="gh-header">
        <div class="gh-header-show">
          <div class="gh-header-actions mt-2">
            <button type="button" class="btn btn-sm js-edit-title" aria-expanded="true" aria-label="Edit Bookmark title">Edit</button>
            <button type="button" class="btn btn-sm btn-danger js-remove-button" aria-expanded="true" aria-label="Remove Bookmark">Remove</button>
          </div>

          <h1 class="gh-header-title">
            <span class="js-bookmark-title">
              ${title || '(no title)'}
            </span>
          </h1>
        </div>

        <div class="gh-header-edit">
          <form class="js-title-update d-flex">
            <input class="form-control flex-auto input-lg input-contrast mr-3 js-edit-title-input" autofocus="autofocus"
              autocomplete="off" aria-label="Pull Request title" type="text" value="${title}" name="issue[title]" id="issue_title" placeholder="Add title here">
            <div class="">
              <button class="btn mr-2" type="submit">Save</button>
              <button class="btn-link js-cancel-edit-title" type="button" aria-expanded="false">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <div class="Box mt-3 position-relative">
      <div class="Box-header py-2 d-flex flex-column flex-shrink-0 flex-md-row flex-md-items-center">
        <div class="text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1 mt-2 mt-md-0">
          ${ pathToFile }

          <span class="file-info-divider"></span>

          ${ getLineRef() }
        </div>

        <div class="d-flex py-1 py-md-0 flex-auto flex-order-1 flex-md-order-2 flex-sm-grow-0 flex-justify-between">

          <div class="BtnGroup">
            <a class="btn btn-sm BtnGroup-item" href="${href}">View bookmark</a>
          </div>
        </div>
      </div>

      ${textBox(html`
        <div class="text-center p-3">
          <a href="${href}">View bookmark</a>
        </div>
      `)}

      ${notesTemplate(notes)}
    </div>
  `;
};
