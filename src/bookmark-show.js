import { render } from 'lit-html';

import { updateBookmark, findBookmark, removeBookmark } from './shared/bookmark';
import { waitForElement } from './shared/utils';

import bookmarkShowTemplate from './templates/bookmarks/show';

(async () => {
  const [, id] = window.location.pathname.match(/_bookmark_\/(.+)/);
  const bookmark = findBookmark(id);

  if(!bookmark) {
    window.location.assign('/_bookmarks_');

    return;
  }

  const applicationMain = await waitForElement('.application-main');
  applicationMain.className = 'application-main';
  render(bookmarkShowTemplate(bookmark), applicationMain);
  document.title = 'Bookmarks';

  const ghHeader = document.querySelector('.gh-header');
  const bookmarkTitle = document.querySelector('.js-bookmark-title');
  const editTitleButton = document.querySelector('.js-edit-title');
  const cancelEditTitleButton = document.querySelector('.js-cancel-edit-title');
  const titleUpdateForm = document.querySelector('.js-title-update');
  const editTitleInput = document.querySelector('.js-edit-title-input');
  const removeButton = document.querySelector('.js-remove-button');

  const headerToggle = () => ghHeader.classList.toggle('open');

  editTitleButton.addEventListener('click', () => {
    headerToggle()
    editTitleInput.focus();
  });
  cancelEditTitleButton.addEventListener('click', () => headerToggle())
  removeButton.addEventListener('click', () => {
    removeBookmark(id);
    window.location.assign('/_bookmarks_');
  })
  titleUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = editTitleInput.value;

    updateBookmark(bookmark.id, { title });

    bookmarkTitle.textContent = title;

    headerToggle();
  });

  if(!bookmark.title) {
    headerToggle();
    editTitleInput.focus();
  }
})();
