function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  getActiveTab()
    .then(async (tabs) => {
      const cookie = await browser.cookies.get({
        url: tabs[0].url,
        name: 'popup',
      });
      return { cookie, tabs };
    })
    .then(({ cookie, tabs }) => {
      console.log(JSON.parse(cookie.value));
      if (cookie) {
        browser.tabs.sendMessage(tabs[0].id, JSON.parse(cookie.value));
      }
    });
}

browser.tabs.onUpdated.addListener(cookieUpdate);
browser.tabs.onActivated.addListener(cookieUpdate);
