function getActiveTab() {
    return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
    getActiveTab().then((tabs) => {
        const gettingCookies = browser.cookies.get({
            url: tabs[0].url,
            name: "popup"
        });
        gettingCookies.then((cookie) => {
            if (cookie) {
                const cookieVal = JSON.parse(cookie.value);
                browser.tabs.sendMessage(tabs[0].id, { color: cookieVal.color, fontSize: cookieVal.fontSize });
    
            }
        });
    });
}

browser.tabs.onUpdated.addListener(cookieUpdate);
browser.tabs.onActivated.addListener(cookieUpdate);
