import { render } from 'lit-html';

import { getAllBookmarks } from '../shared/bookmark';
import { waitForElement } from '../shared/utils';

import bookmarksListTemplate from '../templates/bookmarks/list';

(async () => {
  document.title = 'Bookmarks';

  const bookmarks = getAllBookmarks();

  const applicationMain = await waitForElement('.application-main', 10, 20);
  applicationMain.className = 'application-main';
  render(bookmarksListTemplate(bookmarks), applicationMain);
})();
