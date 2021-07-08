let changeColor = document.getElementById("changeColor");
let changeFontSize = document.getElementById("changeFontSize");
// import iro from '@jaames/iro';


const colorPicker = new iro.ColorPicker("#picker")

chrome.tabs.excecuteScript(tab.id, {
    code:
        "document.body.appendChild(document.createElement('script')).src = 'https://cdn.jsdelivr.net/npm/@jaames/iro@5';"
})

chrome.storage.sync.get("fontSize", ({ fontSize }) => {
    changeColor.style.fontSize = fontSize;
});

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,

    });
});

changeFontSize.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageFontSize,
    });
});

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function setFontSize() {
    chrome.storage.sync.get("fontSize", ({ fontSize }) => {
        document.body.style.fontSize = fontSize;
    });
}