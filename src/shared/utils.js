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

export const waitForElement = async (selector, retries = 5, timeout = 500) => {
  if(retries <= 0) throw new Error(`Element not found: ${selector}.`);

  const element = document.querySelector(selector);

  if (element) return element;

  await waitForTime(timeout);

  return await waitForElement(selector, retries - 1, timeout);
};

export const waitForElementText = async (selector, text, retries = 4, timeout = 1000) => {
  if(retries <= 0) throw new Error(`Element not found: '${selector}' with text ${text}.`);

  const elements = Array.from(document.querySelectorAll(selector));

  const matchingTextElements = elements.find(e => e.textContent.includes(text));

  if (matchingTextElements) return matchingTextElements;

  await waitForTime(timeout);

  return await waitForElementText(selector, text, retries - 1, timeout);
};

export const waitForElementMutate = async (container, selector, text) => new Promise((resolve, reject) => {
  const intialFind = container.querySelector(selector);

  if(intialFind && (!text || intialFind.textContent.includes(text))) {
    resolve(intialFind);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (!mutation.addedNodes) return

      mutation.addedNodes.forEach((node) => {
        if(!node.matches || !node.matches(selector)) {
          return;
        }

        if(text && !node?.textContent?.includes(text)) {
          return;
        }

        resolve(node);
        observer.disconnect();
      });
    });
  });
  const config = {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  };

  observer.observe(container, config);
});

export const waitForUrl = async (urlMatcher, retries = 5, timeout = 500) => {
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
