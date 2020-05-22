import marked from 'marked';

export const parseMd = (markdown) => postProcess(marked(markdown || ''));

const postProcess = (markdownHTML) => {
  const parsers = [addCodePreWrapper];

  let result = markdownHTML;

  for(const parser of parsers) {
    result = parser(result);
  }

  return result;
}

const addCodePreWrapper = (html) => {
  return html.replace(/(<pre.+?>.+?<\/pre>)/g, '<div class="highlight">$1</div>');
};
