export const injectFn = (fn) => {
  var script = document.createElement('script');
  var parent = document.documentElement;
  script.textContent = '('+ fn +')();';
  parent.appendChild(script);
  parent.removeChild(script);
}

export const pageUpdateInit = () => {
  injectFn(function() {
    var pushState = history.pushState;
    history.pushState = function on_pushState() {
      window.postMessage('page-change', '*');
      return pushState.apply(this, arguments);
    };
  });
};

export const waitForTime = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const waitForElement = async (selector, retries = 10, timeout = 50) => {
  if(retries <= 0) throw new Error(`Element not found: ${selector}.`);

  const element = document.querySelector(selector);

  if (element) return element;

  await waitForTime(timeout);

  return await waitForElement(selector, retries - 1, timeout);
};

export const waitForElementText = async (selector, text, retries = 10, timeout = 50) => {
  if(retries <= 0) throw new Error(`Element not found: '${selector}' with text ${text}.`);

  const elements = Array.from(document.querySelectorAll(selector));

  const matchingTextElements = elements.find(e => e.textContent.includes(text));

  if (matchingTextElements) return matchingTextElements;

  await waitForTime(timeout);

  return await waitForElementText(selector, text, retries - 1, timeout);
};

export const waitForUrl = async (urlMatcher, retries = 5, timeout = 50) => {
  if(retries <= 0) throw new Error(`URL never matched: '${urlMatcher}'.`);

  let match = false;
  if(urlMatcher instanceof RegExp) {
    match = urlMatcher.test(window.location.pathname);
  } else {
    match = urlMatcher === window.location.pathname;
  }

  if(match) return match;

  await waitForTime(timeout);

  return await waitForUrl(urlMatcher, retries - 1, timeout);
};
