browser.runtime.onMessage.addListener(updateCSS);

function updateCSS(request, sender, sendResponse) {
    const html = document.querySelector('html');
    const body = document.querySelector('body');

    if (request.color) {
        html.style.backgroundColor = request.color;
        body.style.backgroundColor = request.color;
    } else if (request.reset) {
        html.style.backgroundColor = "";
        body.style.backgroundColor = "";
    }
}