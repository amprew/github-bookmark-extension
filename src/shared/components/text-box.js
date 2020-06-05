import { h } from 'preact';

/** @jsx h */
const TextBox = ({ children }) => (
  <div itemprop="text" class="Box-body p-0 blob-wrapper data type-text">
    {children}
  </div>
);

export default TextBox;
