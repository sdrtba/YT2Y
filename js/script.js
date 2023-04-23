const SEND_URL = 'https://d1ad-2a00-1fa1-c679-60b6-65e3-c566-4f76-56f4.ngrok-free.app/'; // ссылка на flask
const req = {
    url_song: '',
    song_name: '',
    post_target: ''
};


const main = () => {
    getUrlSong()
    getName()
    getToken()
    sendData()
}

const getUrlSong = () => {
    chrome.tabs.query({active:true}, tabs=>{
        req.url_song = tabs[0]
    })
}


const getName = () => {
    req.song_name = 'Crimewave - Crystall Castles'
}


const getToken = () => {
    req.post_target = `https://music-stable-loader/${req.song_name}`
}


// принимает data которая попадет в request и callback для следующего вызова
const sendData = () => {
    // настройка передачи request
    let xhr = new XMLHttpRequest()
    xhr.open('POST', SEND_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')

    // отправка request и получение response
    xhr.send(JSON.stringify(req))
    //xhr.responseType = 'json'
    //response = xhr.response
}


document.getElementById('send').addEventListener('click', () => main())
