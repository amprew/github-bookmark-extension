import { waitForElementMutate } from '../shared/utils';

window.addEventListener('load', function() {
  waitForElementMutate(document.body, '.dropdown-item', 'Your gists')
    .then((gistHeaderLink) => {
      gistHeaderLink.insertAdjacentHTML(
        'afterend',
        `
          <a role="menuitem" class="dropdown-item" href="/_bookmarks_">
            Your bookmarks
          </a>
        `
      );
    })
    .catch(() => {});
});
