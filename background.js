let color = 'green';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color});
    console.log('default background color set to green', `color:${color}`)
});