if (document.readyState === "interactive") {
    chrome.runtime.sendMessage({
        postTarget: JSON.parse(document.body.firstElementChild.innerText)['post-target']
    })
    setTimeout(() => close(), 1000)
}
