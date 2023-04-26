const req = {};

// !change
window.addEventListener('load', () => {
    const url = document.URL;
    if (url.includes('https://www.youtube.com/')) {
        req.code = 0
        req.song_url = url
        req.song_name = document.title;
    }
    if (url.includes('https://music.yandex.ru/handlers/')) {
        req.code = 2
        req.target = document.body.firstElementChild.innerText
    }

    chrome.runtime.sendMessage(req)
})
