const customElementMap = new Map();

const domReady = new Promise((resolve) => {
  const check = () => document.readyState === 'complete' && resolve();
  check() || document.addEventListener('readystatechange', check);
});

async function fetchCustomElement(tagName) {
  const { default: CustomElement } = await import(`/components/${tagName}.js`);
  customElements.define(tagName, CustomElement);
}

function requestCustomElement(element) {
  const tagName = element.tagName.toLowerCase();
  if (customElementMap.has(tagName)) {
    return customElementMap.get(tagName);
  } else {
    const promise = fetchCustomElement(tagName);
    customElementMap.set(tagName, promise);
    return promise;
  }
}

async function main() {
  new MutationObserver((mutationList) => {
    for (const mutationRecord of mutationList) {
      for (const node of mutationRecord.addedNodes) {
        if ('matches' in node && node.matches(':not(:defined)')) {
          requestCustomElement(node);
        }
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });

  for (const element of document.querySelectorAll(':not(:defined)')) {
    requestCustomElement(element);
  }

  const element = document.createElement('oh-no');
  document.body.appendChild(element);
}

domReady.then(main);
