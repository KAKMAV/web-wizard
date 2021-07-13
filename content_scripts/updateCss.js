browser.runtime.onMessage.addListener(updateCSS);

function updateCSS(request, sender, sendResponse) {
    const html = document.querySelector('html');
    const body = document.querySelector('body');


    if (request.color) {
        html.style.backgroundColor = request.color;
        body.style.backgroundColor = request.color;

    } else if (request.fontSize) {
        html.style.fontSize = request.fontSize;
        body.style.fontSize = request.fontSize;

    } else if (request.image) {
        html.style.backgroundImage = 'url(' + request.image + ')';
        body.style.backgroundImage = 'url(' + request.image + ')';
    }
        
    } else if (request.reset) {
        html.style.backgroundColor = '';
        body.style.backgroundColor = '';
        html.style.fontSize = '';
        body.style.fontSize = '';
    }
}
