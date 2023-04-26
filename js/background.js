const URL = 'https://music.yandex.ru/handlers/ugc-upload.jsx?kind=3&filename='
let oauthTabId
const req = {}

const sendData = () => {
    console.log(req)

    req.code = 3
    chrome.runtime.sendMessage(req)
}

const openOauthTab = () => {
    const target_url = URL + `&filename=${req.song_name}` + `&artist=${req.artist_name}`
    chrome.tabs.create({url: target_url}, (tab) => { oauthTabId = tab.id})
};


chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
    if (oauthTabId !== tabId) {
        return
    }

    setTimeout(() => chrome.tabs.remove(tabId), 1000)

    oauthTabId = null
})


chrome.runtime.onMessage.addListener((msg) => {
    // send button
    if (msg.code === 0) {
        req.song_url = msg.song_url
        req.song_name = msg.song_name
    }
    // on load
    if (msg.code === 1) {
        req.artist_name = msg.artist_name
        if (msg.song_name) {
            req.song_name = msg.song_name
        }
        openOauthTab()
    }
    // target
    if (msg.code === 2) {
        req.target = msg.target
        sendData()
    }
})
