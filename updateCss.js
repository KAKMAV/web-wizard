function replaceText(wordMap, node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }
    //This creates our wordmap, replacing text content within the webnode based on user input, following regex rule
    let content = node.textContent;
    for (let word in wordMap) {
      content = content.replace(new RegExp(word, 'gi'), wordMap[word]);
    }
    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(wordMap, node.childNodes[i]);
    }
  }
}

//receives request from extension and updates browser content
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
    location.reload();
  }
}

browser.runtime.onMessage.addListener(updateCSS);
