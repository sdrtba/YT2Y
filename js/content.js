if (document.readyState === "interactive") {
    let curUrl = document.URL;
    if (curUrl.includes('https://music.yandex.ru/handlers/')) {
        chrome.runtime.sendMessage({
            postTarget: JSON.parse(document.body.firstElementChild.innerText)['post-target']
        })
        setTimeout(() => close(), 1000)
    }
}
