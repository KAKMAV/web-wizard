function replaceText(wordMap, node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }
    let content = node.textContent;
    for (let word in wordMap) {
      content = content.replace(new RegExp(word, 'g'), wordMap[word]);
    }
    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(wordMap, node.childNodes[i]);
    }
  }
}

function updateCSS(request) {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  if (request.backgroundColor) {
    html.style.backgroundColor = request.backgroundColor;
    body.style.backgroundColor = request.backgroundColor;
  }
  if (request.fontSize) {
    html.style.fontSize = request.fontSize + 'px';
    body.style.fontSize = request.fontSize + 'px';
  }
  if (request.fontFamily) {
    html.style.fontFamily = request.fontFamily;
    body.style.fontFamily = request.fontFamily;
  }
  if (request.fontColor) {
    html.style.color = request.fontColor;
    body.style.color = request.fontColor;
  }
  if (request.textContent) {
    replaceText(JSON.parse(request.textContent), document.body);
  }
  if (request.reset) {
    const cookieVal = JSON.parse(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('popup='))
        .split('=')[1]
    );
    const textContent = JSON.parse(cookieVal.textContent);
    const newTextContent = {};
    for (let key of Object.keys(textContent)) {
      newTextContent[textContent[key]] = key;
    }
    replaceText(newTextContent, document.body);
    html.style.backgroundColor = '';
    body.style.backgroundColor = '';
    html.style.fontSize = '';
    body.style.fontSize = '';
    html.style.fontFamily = '';
    body.style.fontFamily = '';
  }
}

browser.runtime.onMessage.addListener(updateCSS);
