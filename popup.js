import { customHandler } from './utils.js';

['backgroundColor', 'color', 'fontSize', 'fontFamily', 'textContent'].map(
  (id) => {
    document.getElementById(id).onchange = function (e) {
      customHandler(id, e.target.value);
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
