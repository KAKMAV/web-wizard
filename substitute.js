function sizeText (node) {
    if (node.nodeType === Node.TEXT_NODE) {

        if(node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
            return;
        }
        //targets all text content on the page
        let content = node.textContent;
        //adds css font size property to all text based on user input
        content = content.addStyle.fontSize;
        
    }
}
//applies function to webpage
sizeText(document.body);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if(mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i =0; i < mutation.addedNodes.length; i++) {
                const newNode = mutation.addedNodes[i];
                sizeText(newNode);
            }
        }
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});