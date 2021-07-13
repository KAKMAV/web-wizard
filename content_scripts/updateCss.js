browser.runtime.onMessage.addListener(updateCSS);

function replaceText (node) {
  console.log(node);
  if (node.nodeType === Node.TEXT_NODE) {
    if( node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }
    let content = node.textContent;

    for (let word in wordMap) {
      
      // const regex = regexs.get(word);

      content = content.replace(word, wordMap[word]);
    }

    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
  console.log('end of function');
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
    // html.textContent = request.textContent;
    // body.textContent = request.textContent;
    console.log('check textContent');
    const wordMap = {'about': request.textContent};
    // let regexs = new Map();
    // for (let word of wordMap.keys()) {
    // regexs.set(word, new RegExp(word, 'gi'));
    // }
    console.log('before function call');
    replaceText(document.body);
    console.log('after function call');
  } else if (request.reset) {
    html.style.backgroundColor = '';
    body.style.backgroundColor = '';
    html.style.fontSize = '';
    body.style.fontSize = '';
    html.style.fontFamily = '';
    body.style.fontFamily = '';
  }
}


