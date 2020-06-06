import { waitForElementText } from '../shared/utils';

(() => {
  waitForElementText('.dropdown-item', 'Your gists')
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
})();
