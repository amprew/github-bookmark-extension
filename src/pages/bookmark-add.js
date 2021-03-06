import { observe } from 'selector-observer';

import { pageUpdateInit, removeAllElements, waitForUrl } from '../shared/utils';

import { addBookmark } from '../shared/bookmark';

const getCanonical = () => {
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  const canonicalMatch = canonical.match(/github\.com\/(.+?)\/(.+?)\/.+?\/(.+?)\/(.+)/);

  const [
    ,
    org,
    repo,
    branch,
    pathToFile
  ] = canonicalMatch;

  return { org, repo, branch, pathToFile };
};

const handleBookmarkCreate = (e) => {
  if(e) { e.preventDefault(); }

  const { href } = window.location;
  const createdAt = new Date().toISOString();

  const bookmark = addBookmark({
    ...getCanonical(),
    href,
    createdAt
  });

  window.location.assign(`/_bookmark_/${bookmark.id}`)
};

const addTooltipBookmarkAction = async (el) => {
  // return if bookmark already added.
  const bookmarkButtonExists = document.querySelector('.js-add-bookmark');
  if(bookmarkButtonExists) return;

  el.insertAdjacentHTML(
    'beforeend',
    '<a class="dropdown-item js-add-bookmark" role="menuitem" href="#">Add bookmark</a>'
  );

  const addBookmarkButton = document.querySelector('.js-add-bookmark');
  addBookmarkButton.addEventListener('click', handleBookmarkCreate);
};

const addHeaderBookmarkAction = async (el) => {
  const listGroup = el.closest('.btn-octicon').parentNode;

  listGroup.insertAdjacentHTML(
    'afterbegin',
    `
      <button class="btn-octicon tooltipped tooltipped-nw js-header-bookmark-button" type="submit" aria-label="Add bookmark" data-js-add-bm-header>
        <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" width="14" height="16"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
      </button>
    `
  );

  const headerBookmarkBtn = document.querySelector('.js-header-bookmark-button');

  headerBookmarkBtn.addEventListener('click', handleBookmarkCreate);
};

let cObserverDropdown = null;
let cObserverIcon = null;

const addBookmarkControl = () => {
  if(cObserverIcon) cObserverIcon.abort();
  if(cObserverDropdown) cObserverDropdown.abort();

  waitForUrl(/^\/.+?\/.+?\/blob\//)
    .then(() => {
      cObserverDropdown = observe('.BlobToolbar-dropdown', {
        initialize(el) {
          addTooltipBookmarkAction(el);
        }
      });

      cObserverIcon = observe('.Box-header .btn-octicon-danger', {
        initialize(el) {
          removeAllElements('[data-js-add-bm-header]');
          addHeaderBookmarkAction(el);
        }
      });
    })
    .catch(() => {});
};

pageUpdateInit();

addBookmarkControl();

window.addEventListener('message', function(event) {
  if (event.data === 'page-change') {
    addBookmarkControl();
  }
});
