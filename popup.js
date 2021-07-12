const colorPick = document.getElementById('colorInput');
const resetColor = document.querySelector('.color-reset button');
const cookieVal = { color : '', fontSize : ''};

const fontSizeChange = document.getElementById('fontSize');
const resetFontSize = document.getElementById('font-size-reset');


console.log('hello', colorPick);

function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

colorPick.onchange = function (e) {
    getActiveTab().then((tabs) => {
        const currentColor = e.target.value;
        browser.tabs.sendMessage(tabs[0].id, {
            color: currentColor
        });

        cookieVal.color = currentColor;
        browser.cookies.set({
            url: tabs[0].url,
            name: 'popup',
            value: JSON.stringify(cookieVal)
        })
    });
}

fontSize.onchange = function (e) {
    getActiveTab().then((tabs) => {
        const currentFontSize  = e.target.value;
        browser.tabs.sendMessage(tabs[0].id, {
            fontSize: currentFontSize + "px"
        });

    cookieVal.fontSize = currenFontSize;
    browser.cookie.set({
        url: tabs[0].url,
        name: 'popup',
        value: JSON.stringify(cookieVal)
        })
    });
}

resetColor.onclick = function () {
    console.log('hello');
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            reset: true
        });

        cookieVal = {
            color: '',
            fontSize: ''
        };

        browser.cookies.remove({
            url: tabs[0].url,
            name: 'popup'
        })
    });
}


browser.cookies.onChanged.addListener((changeInfo) => {
    console.log(`cookie changed:\n
    * cookie: ${JSON.stringify(changeInfo.cookie)}\n
    * cause: ${changeInfo.cause}\n
    * removed: ${changeInfo.removed}`);
});
