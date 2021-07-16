//This maps through our content id's to grab user inputs
['backgroundColor', 'fontColor', 'fontSize', 'fontFamily', 'textContent'].map(
  (id) => {
    document.getElementById(id).onchange = function (e) {
      browser.tabs
        //Sends a message from our extension to the current tab
        .query({ active: true, currentWindow: true })
        .then(async (tabs) => {
          await browser.tabs.sendMessage(tabs[0].id, { [id]: e.target.value });
          return tabs;
        })
        .then(async (tabs) => {
          //this gets/creates cookies
          const cookie = await browser.cookies.get({
            url: tabs[0].url,
            name: 'popup',
          });
          return { cookie, tabs };
        })
        .then(({ cookie, tabs }) => {
          //this sets the cookie values based on user input
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

//This undos all of the changes that the user made
document.getElementById('reset').onclick = function () {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      //removes cookie named 'popup'
      browser.cookies.remove({
        name: 'popup',
        url: tabs[0].url,
      });
      return tabs;
    })
    .then((tabs) => {
      //refreshes browser
      browser.tabs.sendMessage(tabs[0].id, {
        reset: true,
      });
    });
  //clears input fields
  ['backgroundColor', 'fontColor', 'fontSize', 'fontFamily', 'textContent'].map(
    (id) => {
      document.getElementById(id).value = '';
    }
  );
};
