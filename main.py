from flask import Flask, request
import requests


def get_bytes(url):
    headers = {
        'authority': 'downloader.freemake.com',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Yandex";v="22"',
        'dnt': '1',
        'x-cf-country': 'RU',
        'sec-ch-ua-mobile': '?0',
        'x-user-platform': 'Win32',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'x-user-browser': 'YaBrowser',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/98.0.4758.141 YaBrowser/22.3.3.852 Yowser/2.5 Safari/537.36',
        'x-analytics-header': 'UA-18256617-1',
        'x-request-attempt': '1',
        'x-user-id': '94119398-e27a-3e13-be17-bbe7fbc25874',
        'sec-ch-ua-platform': '"Windows"',
        'origin': 'https://www.freemake.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.freemake.com/ru/free_video_downloader/',
        'accept-language': 'ru,en;q=0.9,uk;q=0.8',
    }


    # получение ссылки на сайт с всей инфой о видео
    video_id = url.split('v=')[1].split('&')[0]
    info_json_url = f'https://downloader.freemake.com/api/videoinfo/{video_id}'

    # получение json со всеми ссылками на это видео
    video_links_json = requests.get(url=info_json_url, headers=headers).json()
    # отбор худшего видео
    url = video_links_json['qualities'][-1]['url']
    print(url)

    # запись байтов видео
    bytes_of_video = b''
    r = requests.get(url, stream = True)
    for chunk in r.iter_content(chunk_size = 1024):
        bytes_of_video += chunk

    return bytes_of_video


def send(bytes_of_video, post_target):
    files = {'file': ('filename', bytes_of_video, 'audio/mpeg')}

    headers = {
        'Accept': '*/*',
        'Accept-Language': 'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
    }

    resp = requests.post(post_target, files=files, headers=headers)
    print(resp.content)


def main(req):
    bytes_of_video = get_bytes(req.get('song_url'))
    send(bytes_of_video, req.get('target'))


app = Flask(__name__)
@app.route('/', methods=['GET','POST'])
def foo():
    if request.method == 'POST':
        req = request.get_json()
        print(req)

        main(req)
        return {'status': 200}


if __name__ == '__main__':
    app.run(debug=True, port=5000)
