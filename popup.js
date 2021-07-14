const colorPick = document.getElementById('colorInput');
const resetColor = document.getElementById('color-reset');
const cookieVal = {};

const fontColorChange = document.getElementById('fontColor')
const fontSizeChange = document.getElementById('fontSize');
const fontFamilyChange = document.getElementById('fontFamily');

const textContentChange = document.getElementById('textContent');
const resetFontSize = document.getElementById('font-size-reset');

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

colorPick.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const currentColor = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      backgroundColor: currentColor,
    });

    cookieVal.backgroundColor = currentColor;
    browser.cookies.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};

fontColor.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const currentFontColor = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      color: currentFontColor,
    });
  });
};

fontSize.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const currentFontSize = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      fontSize: currentFontSize + 'px',
    });

    cookieVal.fontSize = currentFontSize;
    browser.cookie.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};

fontFamilyChange.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const currentFontFamily = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      fontFamily: currentFontFamily,
    });

    cookieVal.fontFamily = currentFontFamily;
    browser.cookie.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};

textContentChange.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const currentTextContent = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      textContent: currentTextContent,
    });

    cookieVal.textContent = currentTextContent;
    browser.cookie.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};



resetColor.onclick = function () {
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

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`cookie changed:\n
    * cookie: ${JSON.stringify(changeInfo.cookie)}\n
    * cause: ${changeInfo.cause}\n
    * removed: ${changeInfo.removed}`);
});
