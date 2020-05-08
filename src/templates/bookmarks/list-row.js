import { html } from 'lit-html';

export default ({
  id,
  org,
  repo,
  title = '',
  pathToFile,
  href,
  createdAt
}) => {
  const bookmarkPath = `/_bookmark_/${id}`;

  return html`
    <div class="Box-row Box-row--focus-gray p-0 mt-0 js-navigation-item js-issue-row " data-id="604793423">
      <div class="d-flex Box-row--drag-hide position-relative">
        <div class="flex-shrink-0 pt-2 pl-3">
          <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" width="12" height="16"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
        </div>

        <!-- Issue title column -->
        <div class="flex-auto min-width-0 lh-condensed p-2 pr-3 pr-md-2">
          <a class="v-align-middle muted-link h4 pr-1" data-hovercard-type="repository"
            data-hovercard-url="/${org}/${repo}/hovercard"
            href="https://github.com/${org}/${repo}">
            ${org}/${repo}
          </a>
          <a class="link-gray-dark v-align-middle no-underline h4" href="${bookmarkPath}">${title}</a>

          <div class="mt-1 text-small text-gray">
            <relative-time datetime="${createdAt}" class="no-wrap" title="${new Date(createdAt)}"></relative-time>

            <span class="d-none d-md-inline">
              <span class="d-inline-block">
                •
                <a class="muted-link"
                  href="${bookmarkPath}">
                  ${pathToFile}
                </a>
              </span>
            </span>
          </div>
        </div>

        <div class="flex-shrink-0 col-3 pt-2 text-right pr-3 no-wrap d-flex hide-sm ">
          <span class="ml-2 flex-1 flex-shrink-0">
            <div class="AvatarStack AvatarStack--right ml-2 flex-1 flex-shrink-0 ">
              <div
                class="AvatarStack-body tooltipped tooltipped-sw tooltipped-multiline tooltipped-align-right-1 mt-1"
                aria-label="Assigned to ">
              </div>
            </div>
          </span>

          <span class="ml-2 flex-1 flex-shrink-0">
          </span>

          <span class="ml-2 flex-1 flex-shrink-0">
            <a href="${bookmarkPath}" class="muted-link" aria-label="3 comments">
              <svg class="octicon octicon-comment v-align-middle" viewBox="0 0 16 16" version="1.1" width="16"
                height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z">
                </path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  `;
};
