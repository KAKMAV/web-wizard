function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

['backgroundColor', 'color', 'fontSize', 'fontFamily', 'textContent'].map(
  (id) => {
    document.getElementById(id).onchange = function (e) {
      getActiveTab()
        .then(async (tabs) => {
          await browser.tabs.sendMessage(tabs[0].id, { key: value });
          return tabs;
        })
        .then(async (tabs) => {
          const cookie = await browser.cookies.get({
            url: tabs[0].url,
            name: 'popup',
          });
          return { cookie, tabs };
        })
        .then(({ cookie, tabs }) => {
          const cookieVal = cookie ? JSON.parse(cookie.value) : {};
          cookieVal[key] = value;
          browser.cookies.set({
            url: tabs[0].url,
            name: 'popup',
            value: JSON.stringify(cookieVal),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
);

document.getElementById('color-reset').onclick = function () {
  getActiveTab()
    .then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        reset: true,
      });
      return tabs;
    })
    .then((tabs) => {
      browser.cookies.remove({
        name: 'popup',
        url: tabs[0].url,
      });
    });
};
