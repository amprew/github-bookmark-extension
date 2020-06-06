import { render, h } from 'preact';

import ListItem from './item';

import { getAllBookmarks } from '../../../shared/bookmark';
import { waitForElement } from '../../../shared/utils';

/** @jsx h */
const BookmarkList = ({ bookmarks }) => {
  return (
    <div className="page-content position-relative container-lg p-responsive width-full">
      <h2 className="mb-3">Your bookmarks</h2>

      <div className="Box Box--responsive hx_Box--firstRowRounded0" data-pjax="">
        <div data-issue-and-pr-hovercards-enabled="" data-repository-hovercards-enabled="">
          {bookmarks.map(ListItem)}
        </div>
      </div>
    </div>
  );
};


(() => {
  const bookmarks = getAllBookmarks();

  waitForElement('.application-main', 10, 20)
    .then((applicationMain) => {
      applicationMain.className = 'application-main';

      render(<BookmarkList bookmarks={bookmarks} />, applicationMain.parentNode, applicationMain);

      document.title = 'Bookmarks';
    })
    .catch(() => {});
})();
