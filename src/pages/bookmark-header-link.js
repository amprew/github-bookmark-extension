import {observe} from 'selector-observer';

observe('.dropdown-item', {
  add(el) {
    if(el.textContent !== 'Your gists') return;

    el.insertAdjacentHTML(
      'afterend',
      `
        <a role="menuitem" class="dropdown-item" href="/_bookmarks_">
          Your bookmarks
        </a>
      `
    );
  }
});
