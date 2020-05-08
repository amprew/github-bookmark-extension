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

export const waitForElement = async(selector, retries = 10, timeout = 50) => {
  if(retries <= 0) throw new Error(`Element not found: ${selector}.`);

  const element = document.querySelector(selector);

  if (element) return element;

  await waitForTime(timeout);

  return await waitForElement(selector, retries - 1);
};
