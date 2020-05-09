import { render } from 'lit-html';

import { getAllBookmarks } from './shared/bookmark';
import { waitForElement } from './shared/utils';

import bookmarksListTemplate from './templates/bookmarks/list';

(async () => {
  const bookmarks = getAllBookmarks();

  const applicationMain = await waitForElement('.application-main');
  applicationMain.className = 'application-main';
  render(bookmarksListTemplate(bookmarks), applicationMain);

  document.title = 'Bookmarks';
})();
