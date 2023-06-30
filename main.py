from flask import Flask, request
from threading import Thread
from pytube import YouTube
import requests


app = Flask(__name__)
@app.route('/', methods=['POST'])
def index():
    req = request.get_json()
    url = req.get('songUrl')
    post_target = req.get('postTarget')

    t1 = Thread(target=main, args=(url, post_target))
    t1.start()

    return {'status': 200}


def main(url, post_target):
    print(url, post_target)
    song_url = YouTube(url).streaming_data['adaptiveFormats'][-1]['url']

    song_data = b''
    response = requests.get(url=song_url, stream=True)
    for chunk in response.iter_content(chunk_size=1024):
        song_data += chunk
    print('loaded')

    headers = {
        'Accept': '*/*',
        'Accept-Language': 'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
    }
    files = {'file': ('filename', song_data, 'audio/mpeg')}

    response = requests.post(url=post_target, headers=headers, files=files)
    print(response.content)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
