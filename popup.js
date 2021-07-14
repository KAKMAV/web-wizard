const colorPick = document.getElementById('colorInput');
const resetColor = document.getElementById('color-reset');
const cookieVal = {};

const fontColorChange = document.getElementById('fontColor');
const fontSizeChange = document.getElementById('fontSize');
const fontFamilyChange = document.getElementById('fontFamily');

const textContentChange = document.getElementById('textContent');
const resetFontSize = document.getElementById('font-size-reset');

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

colorPick.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const backgroundColor = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      backgroundColor,
    });

    cookieVal.backgroundColor = backgroundColor;
    browser.cookies.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};

fontColor.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const color = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      color,
    });

    cookieVal.color = color;
    browser.cookies.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};

fontSize.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const fontSize = e.target.value + 'px';
    browser.tabs.sendMessage(tabs[0].id, {
      fontSize,
    });

    cookieVal.fontSize = fontSize;
    browser.cookies.set({
      url: tabs[0].url,
      name: 'popup',
      value: JSON.stringify(cookieVal),
    });
  });
};

fontFamilyChange.onchange = function (e) {
  getActiveTab().then((tabs) => {
    const fontFamily = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {
      fontFamily,
    });
    cookieVal.fontFamily = fontFamily;
    browser.cookies.set({
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
    browser.cookies.set({
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
  cookieVal = {
    color: '',
    fontSize: '',
    fontFamily: '',
    textContent: '',
  };
};

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`cookie changed:\n
    * cookie: ${JSON.stringify(changeInfo.cookie)}\n
    * cause: ${changeInfo.cause}\n
    * removed: ${changeInfo.removed}`);
});
