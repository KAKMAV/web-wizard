['backgroundColor', 'fontColor', 'fontSize', 'fontFamily', 'textContent'].map(
  (id) => {
    document.getElementById(id).onchange = function (e) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(async (tabs) => {
          await browser.tabs.sendMessage(tabs[0].id, { [id]: e.target.value });
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
          cookieVal[id] = e.target.value;
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

document.getElementById('reset').onclick = function () {
  browser.tabs
    .query({ active: true, currentWindow: true })
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
  cookieVal = {
    color: '',
    fontSize: '',
    fontFamily: '',
    textContent: '',
  };
};
