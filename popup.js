const colorPick = document.getElementById('colorInput');
const resetColor = document.querySelector('.color-reset button');
const cookieVal = { color : '', fontSize : '', image : ''};

const fontSizeChange = document.getElementById('fontSize');
const resetFontSize = document.getElementById('font-size-reset');

const colorBtns = document.querySelectorAll('.color-container button');


console.log('hello', colorPick);

function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

for(const i = 0; i < colorBtns.length; i ++) {
    const imgName = colorBtns[i].getAttribute('class');
    const colorImg = 'url(\'images/' + imgName + '.png\')';
    colorBtns[i].style.backgroundImage = colorImg;

    colorBtns[i].onclick = function(e) {
        getActiveTab().then((tabs) => {
            const imgName = e.target.getAttribute('class');
            // double check the routing if code does not compile
            const fullUrl = browser.extension.getUrl('/images/'+ imgName + '.png'); 
            browser.tabs.sendMessage(tabs[0].id, {image: fullUrl});

            cookieVal.image = fullUrl;
            browser.cookies.set({
                url: tabs[0].url,
                // double check the name key "name", if code does not compile
                name: "popup",
                value: JSON.stringify(cookieVal)
            })
        });
    }
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
