import { waitForElementText } from '../shared/utils';

(async () => {
  const gistHeaderLink = await waitForElementText('.dropdown-item', 'Your gists');

  gistHeaderLink.insertAdjacentHTML(
    'afterend',
    `
      <a role="menuitem" class="dropdown-item" href="/_bookmarks_">
        Your bookmarks
      </a>
    `
  );
})();
