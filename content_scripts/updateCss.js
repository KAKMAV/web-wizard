browser.runtime.onMessage.addListener(updateCSS);

function replaceText(wordMap, node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }
    let content = node.textContent;
    for (let word in wordMap) {
      content = content.replace(word, wordMap[word]);
    }
    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(wordMap, node.childNodes[i]);
    }
  }
}

function updateCSS(request, sender, sendResponse) {
  const html = document.querySelector('html');
  const body = document.querySelector('body');

  if (request.color) {
    html.style.backgroundColor = request.color;
    body.style.backgroundColor = request.color;
  } else if (request.fontSize) {
    html.style.fontSize = request.fontSize;
    body.style.fontSize = request.fontSize;
    span.style.fontSize = request.fontSize;
  } else if (request.fontFamily) {
    html.style.fontFamily = request.fontFamily;
    body.style.fontFamily = request.fontFamily;
  } else if (request.textContent) {
    const wordMap = { about: request.textContent };
    replaceText(wordMap, document.body);
  } else if (request.reset) {
    html.style.backgroundColor = '';
    body.style.backgroundColor = '';
    html.style.fontSize = '';
    body.style.fontSize = '';
    html.style.fontFamily = '';
    body.style.fontFamily = '';
  }
}
