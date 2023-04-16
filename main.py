from flask import Flask, request, Response, make_response

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def foo():
    if request.method == 'POST':
        req = request.get_json()
        print(req)

        resp = 'foo'
        if req.get('url_song') is not None:
            #resp = make_response({'song_name': 'dadaya'})
            #resp.headers['Access-Control-Allow-Origin'] = '*'
            resp = {'song_name': 'Crimewave - Crystall Castles'}
        elif req.get('post-target') is not None:
            resp = {'status': '201'}
        elif req.get('status') == 'NoneTypeResponse':
            resp = {'status': '500'}

        return resp


    elif request.method == 'GET':
        print('GET')
        return 'GET method'


if __name__ == '__main__':
    app.run(debug=True, port=5000)
