browser.runtime.onMessage.addListener(updateCSS);

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

function updateCSS(request, sender, sendResponse) {
    const html = document.querySelector('html');
    const body = document.querySelector('body');

    if (request.backgroundColor) {
        html.style.backgroundColor = request.backgroundColor;
        body.style.backgroundColor = request.backgroundColor;
    } else if (request.fontSize) {
        html.style.fontSize = request.fontSize;
        body.style.fontSize = request.fontSize;
    } else if (request.fontFamily) {
        html.style.fontFamily = request.fontFamily;
        body.style.fontFamily = request.fontFamily;
    } else if (request.fontColor) {
        html.style.color = request.fontColor;
        body.style.color = request.fontColor;
    } else if (request.textContent) {
        console.log(request.textContent);
        const wordMap = JSON.parse(request.textContent);
        console.log('wordMap', wordMap);
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


