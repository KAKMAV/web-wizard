let fontSize = "12px";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ fontSize });
    console.log('default font size to x', `fontSize:${fontSize}`)
});