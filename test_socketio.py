from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('data_request')
def handle_message(request_data):
    print('received message: ' + str(request_data))

    response_obj = {
        "graph_data": {
            "dataset": [
                {"data": [0.5, 0.5, 1, 0], "label": "bayes"},
                {"data": [0.7, 0.4, 1, 0], "label": "svm"},
                {"data": [0.3, 0.3, 1, 0], "label": "tree"}
            ],
            "labels": [
                1499077732840,
                1499077652040,
                1499077579200,
                1499077495160,
            ]
        },
        "tweets": [
            {"author": "SPIEGELONLINE", "text": "bla", "bayes": 1, "svm": 0.2, "tree": 0.5},
            {"author": "FOKUS", "text": "blub", "bayes": 0.6, "svm": 0.4, "tree": 0.5},
            {"author": "NTV", "text": "wuppi", "bayes": 0, "svm": 0.1, "tree": 0.2},
            {"author": "MINDENER_TAGEBLATT", "text": "fluppi", "bayes": 0, "svm": 0.2, "tree": 1}
        ],
        "overall_sentiment": 0.5
    }

    print("response to send: " + json.dumps(response_obj))
    emit('data_response', response_obj)


if __name__ == '__main__':
    socketio.run(app)