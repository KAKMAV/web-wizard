const colorPick = document.getElementById('colorInput');
const reset = document.querySelector('.color-reset button');
const cookieVal = { color : ''};

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

reset.onclick = function () {
    console.log('hello');
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            reset: true
        });

        cookieVal = {
            color: ''
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
