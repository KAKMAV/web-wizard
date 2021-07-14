browser.runtime.onMessage.addListener(updateCSS);

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
    } else if (request.reset) {
        html.style.backgroundColor = '';
        body.style.backgroundColor = '';
        html.style.fontSize = '';
        body.style.fontSize = '';
        html.style.fontFamily = '';
        body.style.fontFamily = '';
    }
}
