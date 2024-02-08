from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, debug=True, cors_allowed_origins='*')


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@socketio.on("msg")
def msg(obj):
    print(obj)
    emit("test", "123", broadcast=True)


if __name__ == '__main__':
    app.run()
