send_url = 'https://7b81-2a00-1fa1-863a-15e9-11e9-cc3d-11f6-b364.ngrok-free.app/' // ссылка на flask


const main = () => {
    chrome.tabs.query({active:true}, tabs=>{
        const tab = tabs[0]
        background(tab.url)
    })
}


const getName = () => {
    return 'Crimewave - Crystall Castles'
}


const getToken = (song_name) => {
    return `https://music-stable-loader/${song_name}`
}


// принимает data которая попадет в request и callback для следующего вызова
const sendData = (req) => {
    // настройка передачи request
    let xhr = new XMLHttpRequest()
    xhr.open('POST', send_url)
    xhr.setRequestHeader('Content-Type', 'application/json')

    // отправка request и получение response
    xhr.send(JSON.stringify(req))
    //xhr.responseType = 'json'
    //response = xhr.response
}


const background = (url_song) => {
    target = getToken(getName());
    sendData({'url_song': `${url_song}`, 'post-target': `${target}`})
}


document.getElementById('send').addEventListener('click', () => main())
