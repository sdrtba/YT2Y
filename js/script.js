const SEND_URL = 'https://d433-85-140-5-233.ngrok-free.app'
const req = new Object()

const sendData = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', SEND_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')


    xhr.send(JSON.stringify(req))
}

const main = () => {
    req.code = 1
    req.song_name = document.getElementById("song_name").value
    req.artist_name = document.getElementById("artist_name").value

    chrome.runtime.sendMessage(req)
}


chrome.runtime.onMessage.addListener((msg) => {
    if (msg.code === 3) {
        sendData()
    }
})

// entry point
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('button').addEventListener('click', () => main())
})
