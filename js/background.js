const TEST_SEND_URL = 'https://1ddb-2a00-1fa1-c2ad-1ee8-a878-5dff-8418-683a.ngrok-free.app/'
const BASE_TARGET_URL = 'https://music.yandex.ru/handlers/ugc-upload.jsx?kind=3'
const EXT_ID = "ldaabkikipokheljnbnngcnhhckfjfbm";
const request = new Object();


const postRequest = () => {
    fetch(TEST_SEND_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(request)
    }).then(function(r) {
        return r;
    }).then(function(data) {
        console.log(data);
    });
}


// open tab for target link
const openTargetLink = () => {
    const target_url = BASE_TARGET_URL + `&filename=${request.song_name}` + `&artist=${request.artist_name}`
    chrome.tabs.create({url: target_url})
}


// main
chrome.runtime.onMessage.addListener((msg, sender) => {
    // popup case
    if (sender.origin.includes(EXT_ID)) {
        msg.song_name ? request.song_name = msg.song_name : {}
        request.artist_name = msg.artist_name

        openTargetLink()
    }
    // content case
    else {
        request.song_url ? {} : request.song_url = msg.song_url
        request.song_name ? {} : request.song_name = msg.song_name

        // after getting target and closing tab
        if (msg.target) {
            request.target = msg.target
            postRequest();
        }
    }

    console.log(request)
})
