function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  //   getActiveTab().then((tabs) => {
  //     const gettingCookies = browser.cookies.get({
  //       url: tabs[0].url,
  //       name: 'popup',
  //     });
  //     gettingCookies.then((cookie) => {
  //       if (cookie) {
  //         const { backgroundColor, color, fontSize, fontFamily } = JSON.parse(
  //           cookie.value
  //         );
  //         browser.tabs.sendMessage(tabs[0].id, {
  //           backgroundColor,
  //           color,
  //           fontSize,
  //           fontFamily,
  //         });
  //       }
  //     });
  //   });

  getActiveTab()
    .then(async (tabs) => {
      const cookie = await browser.cookies.get({
        url: tabs[0].url,
        name: 'popup',
      });
      return { tabs, cookie };
    })
    .then(({ cookie, tabs }) => {
      if (cookie) {
        const { backgroundColor, color, fontSize, fontFamily } = JSON.parse(
          cookie.value
        );
        browser.tabs.sendMessage(tabs[0].id, {
          backgroundColor,
          color,
          fontSize,
          fontFamily,
        });
      }
    });
}

browser.tabs.onUpdated.addListener(cookieUpdate);
browser.tabs.onActivated.addListener(cookieUpdate);
