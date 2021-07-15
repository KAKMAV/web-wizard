function cookieUpdate() {
    //This awaits the cookie values and updates the browser based on those values
    browser.tabs
        .query({ active: true, currentWindow: true })
        .then(async (tabs) => {
            const cookie = await browser.cookies.get({
                url: tabs[0].url,
                name: 'popup',
            });
            return { cookie, tabs };
        })
        .then(({ cookie, tabs }) => {
            if (cookie) {
                browser.tabs.sendMessage(tabs[0].id, JSON.parse(cookie.value));
            }
        });
}

browser.tabs.onUpdated.addListener(cookieUpdate);
browser.tabs.onActivated.addListener(cookieUpdate);