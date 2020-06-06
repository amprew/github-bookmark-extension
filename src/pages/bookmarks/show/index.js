import { render, h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { parseMd } from '../../../shared/markdown';

import { updateBookmark, findBookmark, removeBookmark } from '../../../shared/bookmark';
import { waitForElement } from '../../../shared/utils';

import TextBox from '../../../shared/components/text-box';

import Notes from './notes';

const getLineRef = (href) => {
  const lineMatch = href.match(/L(\d+)-?L?(\d+)?/i);
  if (!lineMatch) return;

  const [, line1, line2] = lineMatch;

  return `Line ${line1}${line2 ? `-${line2}` : ''}`;
};

/** @jsx h */
const Bookmarkshow = ({ bookmark }) => {
  const { id, href, pathToFile, title } = bookmark;

  const titleInput = useRef();

  const [titleValue, setTitleValue] = useState(title);
  const [savedTitleValue, setSavedTitleValue] = useState(title);
  const [editingTitle, seteEditingTitle] = useState(!title);

  useEffect(() => {
    if(editingTitle) {
      titleInput.current.focus();
    }
  }, [editingTitle]);

  const handleEditClick = (e) => {
    e.preventDefault();

    seteEditingTitle(true);
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();

    removeBookmark(id);

    window.location.assign('/_bookmarks_');
  };

  const handleTitleChange = ({ target: { value } }) => {
    setTitleValue(value);
  };

  const handleSaveTitle = (e) => {
    e.preventDefault();

    setSavedTitleValue(titleValue);

    updateBookmark(id, { title: titleValue });

    seteEditingTitle(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    seteEditingTitle(false);
  }

  return (
    <div className="page-content position-relative container-lg p-responsive p-5 width-full">
      <div className="mb-3">
        <a href="https://github.com/_bookmarks_" className="btn btn-sm btn-outline mr-2" title="Return to bookmarks">
          ←
          <span className="d-md-none">Bookmarks</span>
          <span className="d-none d-md-inline">Back to bookmarks</span>
        </a>
      </div>
      <div>
        <div className="gh-header-show" hidden={editingTitle}>
          <div className="gh-header-actions mt-2">
            <button type="button" type="button" className="btn btn-sm" aria-expanded="true" aria-label="Edit Bookmark title" onClick={handleEditClick}>Edit</button>
            <button type="button" className="btn btn-sm btn-danger" aria-expanded="true" aria-label="Remove Bookmark" onClick={handleRemoveClick}>Remove</button>
          </div>

          <h1 className="gh-header-title">
            {savedTitleValue || '(no title)'}
          </h1>
        </div>

        <div className="gh-header-edit" hidden={!editingTitle}>
          <form className="d-flex" onSubmit={handleSaveTitle}>
            <input onChange={handleTitleChange} ref={titleInput} className="form-control flex-auto input-lg input-contrast mr-3" autofocus="autofocus" autocomplete="off" aria-label="Pull Request title" type="text" value={titleValue} name="issue[title]" id="issue_title" placeholder="Add title here"/>
            <div>
              <button className="btn mr-2" type="submit">Save</button>
              <button className="btn-link" type="button" aria-expanded="false" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <div className="Box mt-3 position-relative">
        <div className="Box-header py-2 d-flex flex-column flex-shrink-0 flex-md-row flex-md-items-center">
          <div className="text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1 mt-2 mt-md-0">
            <a href={href} className="pr-1">{ pathToFile }</a>

            <span className="file-info-divider"></span>

            { getLineRef(href) }
          </div>

          <div className="d-flex py-1 py-md-0 flex-auto flex-order-1 flex-md-order-2 flex-sm-grow-0 flex-justify-between">

            <div className="BtnGroup">
              <a className="btn btn-sm BtnGroup-item" href={href}>View bookmark</a>
            </div>
          </div>
        </div>

        <TextBox>
          <div className="text-center p-3">
            <a href={href}>View bookmark</a>
          </div>
        </TextBox>

        <Notes {...bookmark} />
      </div>
    </div>
  )
}

(() => {
  const [, id] = window.location.pathname.match(/_bookmark_\/(.+)/);
  const bookmark = findBookmark(id);

  if(!bookmark) {
    window.location.assign('/_bookmarks_');

    return;
  }

  waitForElement('.application-main', 10, 20)
    .then((applicationMain) => {
      applicationMain.className = 'application-main';

      render(<Bookmarkshow bookmark={bookmark} />, applicationMain.parentNode, applicationMain);

      document.title = 'Bookmarks';
    })
    .catch(() => {});
})();
