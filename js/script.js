send_url = 'https://cd8b-2a00-1fa1-c2a1-d63d-f177-2b32-eef5-fb56.ngrok-free.app/'; // ссылка на flask


const startDialog = () => {
    chrome.tabs.query({active:true}, tabs=>{
        const tab=tabs[0];
        const link = tab.url;
        data = {'url_song': `${link}`}; // получение ссылки на сайт из которого запущено расширение
        sendData(data, sendData); // запуск функции sendData с параметрами data и callback для следующего запроса
    });
};

// принимает data которая попадет в request и callback для следующего вызова
const sendData = (data={'status': 'NoneTypeResponse'}, callback=null) => {
    // настройка передачи request
    let xhr = new XMLHttpRequest();
    xhr.open('POST', send_url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // отправка request и получение response
    xhr.send(JSON.stringify(data));
    xhr.responseType = 'json';
    response = xhr.response;

    // проверка на наличие callback
    if (callback){
        //setTimeout(() => {callback({'response': 'done'});}, 10);
        // sendData с data но без callback. Тут должна быть переменная response
        callback({'post-target': 'htpps://music-stable-loader/'});
    };
};

document.getElementById('send').addEventListener('click', () => startDialog());
