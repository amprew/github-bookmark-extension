import { pageUpdateInit, waitForElement } from './shared/utils';

import { addBookmark } from './shared/bookmark';

pageUpdateInit();

const addBookmarkControl = async () => {
  const list = await waitForElement('.BlobToolbar-dropdown', 5, 500);
  
  // return if bookmark already added.
  const bookmarkButtonExists = document.querySelector('.js-add-bookmark');
  if(bookmarkButtonExists) return;

  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  const canonicalMatch = canonical.match(/github\.com\/(.+?)\/(.+?)\/.+?\/(.+?)\/(.+)/);

  const [
    ,
    org,
    repo,
    branch,
    pathToFile
  ] = canonicalMatch;

  list.insertAdjacentHTML(
    'beforeend',
    '<a class="dropdown-item js-add-bookmark" role="menuitem" href="#">Add bookmark</a>'
  );

  const addBookmarkButton = document.querySelector('.js-add-bookmark');
  addBookmarkButton.addEventListener('click', (e) => {
    e.preventDefault();

    const { href } = window.location;
    const createdAt = new Date().toISOString();

    const bookmark = addBookmark({
      org,
      repo,
      branch,
      pathToFile,
      href,
      createdAt
    });

    window.location.assign(`/_bookmark_/${bookmark.id}`)
  });
};

addBookmarkControl();

window.addEventListener("message", function(event) {
  if (event.data === 'page-change') {
    addBookmarkControl();
  }
});
