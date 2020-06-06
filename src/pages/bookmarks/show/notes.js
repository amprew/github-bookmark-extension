import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import TextBox from '../../../shared/components/text-box';

import { parseMd } from '../../../shared/markdown';

import { updateBookmark } from '../../../shared/bookmark';

const updateHeight = (element) => {
  const { value } = element;

  const lineBreaks = (value.match(/\n/g)?.length || 0) + 2;
  const lineHeight = getComputedStyle(element).lineHeight;
  const lineHeightInt = parseInt(lineHeight.replace(/\D/g, ''));

  const height = (lineHeightInt * lineBreaks) + 32;

  element.style.height = `${height}px`;
};

/** @jsx h */
const ShowNotes = ({
  notes = '',
  id
}) => {
  const [ editing, setEditing ] = useState(!notes);
  const [ notesValue, setNotesValue ] = useState(notes);
  const input = useRef();

  useEffect(() => {
    if(!notesValue) {
      setEditing(true);
    }
  }, []);

  useEffect(() => {
    if(editing) {
      input.current.focus();
      updateHeight(input.current);
    }
  }, [editing]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleMarkdownChange = ({ target: { value } }) => {
    setNotesValue(value);
  };

  const handleMarkdownBlur = () => {
    setEditing(!notesValue.length);
  };

  const handleKeyUp = ({ target }) => {
    const element = target;
    const { value } = element;

    updateBookmark(id, { notes: value });

    updateHeight(element, value);

  };

  const markdownHtml = (`<div>${parseMd(notesValue)}</div>`);

  return (
    <TextBox>
      <div class="position-relative markdown-body">
        <button
          type="button"
          class="position-absolute top-2 right-2 btn btn-sm btn-outline"
          onClick={handleEditClick}
          hidden={editing}
        >
          Edit
        </button>

        <div class="d-block p-3" dangerouslySetInnerHTML={{ __html: markdownHtml }} hidden={editing} />
        <textarea
          class="d-block border-0 p-3"
          spellcheck="false"
          style="min-width: 100%;"
          placeholder="Add notes here... (p.s. markdown available.)"
          hidden={!editing}
          ref={input}
          onChange={handleMarkdownChange}
          onBlur={handleMarkdownBlur}
          onKeyUp={handleKeyUp}
        >
          {notesValue}
        </textarea>
      </div>
    </TextBox>
  );
};

export default ShowNotes;
