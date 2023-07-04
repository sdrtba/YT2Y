const BACKEND = 'https://flask-production-5543a.up.railway.app/';
let songUrl = new String();


const PostRequest = (postTarget) => {
    fetch(BACKEND, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({postTarget, songUrl})
    }).then(function(r) {
        return r;
    }).then(function(data) {
        console.log(data);
    });
}


// open tab for target link
const OpenUrlWithTarget = (songName) => {
    let targetURI = `https://music.yandex.ru/handlers/ugc-upload.jsx?kind=3&filename=${songName}`;
    chrome.tabs.create({url: targetURI});
}


chrome.runtime.onMessage.addListener((msg) => {
    // popup
    if (msg.isPopup) {
        songUrl = msg.songUrl;
        OpenUrlWithTarget(msg.songName);
    }
    // content
    else {
        PostRequest(msg.postTarget);
    }
})
