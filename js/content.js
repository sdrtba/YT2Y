const contentRequest = new Object();

// DOMContentLoaded не работает. Что это пока непонятно
if (document.readyState === "interactive") {
    const url = document.URL;
    if (url.includes('https://www.youtube.com/')) {
        contentRequest.song_url = url
        contentRequest.song_name = document.title;
    }
    if (url.includes('https://music.yandex.ru/handlers/')) {
        contentRequest.target = JSON.parse(document.body.firstElementChild.innerText)['post-target']
        setTimeout(() => close(), 1000)
    }

    chrome.runtime.sendMessage(contentRequest) // {song_url: '', song_name: ''}    {target: ''}
}
