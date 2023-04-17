from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def foo():
    if request.method == 'POST':
        req = request.get_json()
        print(req)

        resp = {'status': 500}
        if req.get('url_song') is not None:
            resp = {'status': 201}

        return resp


    elif request.method == 'GET':
        print('GET')
        return 'GET method'


if __name__ == '__main__':
    app.run(debug=True, port=5000)
