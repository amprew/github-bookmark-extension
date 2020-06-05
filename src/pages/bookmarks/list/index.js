import { render, h } from 'preact';

import ListItem from './item';

import { getAllBookmarks } from '../../../shared/bookmark';
import { waitForElement } from '../../../shared/utils';

/** @jsx h */
const BookmarkList = ({ bookmarks }) => {
  return (
    <div className="page-content position-relative container-lg p-responsive">
      <h2 className="mb-3">Your bookmarks</h2>

      <div className="Box Box--responsive hx_Box--firstRowRounded0" id="js-issues-toolbar" data-pjax="">
        <div className="js-navigation-container js-active-navigation-container" data-issue-and-pr-hovercards-enabled="" data-repository-hovercards-enabled="">
          {bookmarks.map(ListItem)}
        </div>
      </div>
    </div>
  );
};


(async () => {
  const bookmarks = getAllBookmarks();

  const applicationMain = await waitForElement('.application-main', 10, 20);
  applicationMain.className = 'application-main';

  render(<BookmarkList bookmarks={bookmarks} />, applicationMain.parentNode, applicationMain);

  document.title = 'Bookmarks';
})();
