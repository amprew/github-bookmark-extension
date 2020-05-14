import { render } from 'lit-html';

import { parseMd } from '../shared/markdown';

import { updateBookmark, findBookmark, removeBookmark } from '../shared/bookmark';
import { waitForElement } from '../shared/utils';

import bookmarkShowTemplate from '../templates/bookmarks/show';

(async () => {
  document.title = 'Bookmarks';

  const [, id] = window.location.pathname.match(/_bookmark_\/(.+)/);
  const bookmark = findBookmark(id);

  if(!bookmark) {
    window.location.assign('/_bookmarks_');

    return;
  }

  const applicationMain = await waitForElement('.application-main');
  applicationMain.className = 'application-main';
  render(bookmarkShowTemplate(bookmark), applicationMain);

  const ghHeader = document.querySelector('.gh-header');
  const bookmarkTitle = document.querySelector('.js-bookmark-title');
  const editTitleButton = document.querySelector('.js-edit-title');
  const cancelEditTitleButton = document.querySelector('.js-cancel-edit-title');
  const titleUpdateForm = document.querySelector('.js-title-update');
  const editTitleInput = document.querySelector('.js-edit-title-input');
  const removeButton = document.querySelector('.js-remove-button');
  const notesTextarea = document.querySelector('.js-notes-textarea');
  const notesMarkdown = document.querySelector('.js-notes-md');
  const notesEdit = document.querySelector('.js-notes-edit');

  const updateHeight = (element) => {
    const { value } = element;

    const lineBreaks = (value.match(/\n/g)?.length || 0) + 2;
    const lineHeight = getComputedStyle(element).lineHeight;
    const lineHeightInt = parseInt(lineHeight.replace(/\D/g, ''));

    const height = (lineHeightInt * lineBreaks) + 32;

    element.style.height = `${height}px`;
  };

  updateHeight(notesTextarea);

  const headerToggle = () => ghHeader.classList.toggle('open');
  const notesToggle = () => {
    notesTextarea.hidden = !notesTextarea.hidden;
    notesMarkdown.hidden = !notesMarkdown.hidden;

    notesEdit.hidden = !notesTextarea.hidden;

    if(!notesTextarea.hidden) {
      notesTextarea.focus();
    }
  };

  if(!bookmark.title) {
    headerToggle();
    editTitleInput.focus();
  }

  if(!bookmark.notes) {
    notesToggle();
  }

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
  notesTextarea.addEventListener('keyup', (e) => {
    const element = e.target;
    const { value } = element;

    updateBookmark(bookmark.id, { notes: value });

    updateHeight(element, value);
  });
  notesTextarea.addEventListener('blur', () => {
    const { value } = notesTextarea;

    if(!value) return;

    notesToggle();

    notesMarkdown.innerHTML = parseMd(value);
  });
  notesEdit.addEventListener('click', () => {
    notesToggle();
  });
})();
