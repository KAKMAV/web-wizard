function replaceText(wordMap, node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }
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
    console.log('reset');
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        console.log('reset2');
        return browser.cookies.get({
          url: tabs[0].url,
          name: 'popup',
        });
      })
      .then((cookie) => {
        console.log('reset3');
        const newTextContent = {};
        if (cookie && cookie.value.textContent) {
          const cookieVal = JSON.parse(cookie.value);
          console.log(cookieVal);
          const textContent = JSON.parse(cookieVal.textContent);
          console.log(textContent);
          for (let key of textContent.keys()) {
            newTextContent[textContent[key]] = key;
          }
        }
        return newTextContent;
      })
      .then((newTextContent) => {
        console.log('reset4');
        replaceText(JSON.parse(request.textContent), document.body);
      })
      .catch((error) => console.log(error));
    console.log('reset5');
    html.style.backgroundColor = '';
    body.style.backgroundColor = '';
    html.style.fontSize = '';
    body.style.fontSize = '';
    html.style.fontFamily = '';
    body.style.fontFamily = '';
  }
}

browser.runtime.onMessage.addListener(updateCSS);
