# -*- coding: utf-8 -*-
from flask_socketio import SocketIO,emit
from flask import Flask, send_file
from algorithems.classifier import CombinedClassifier
from twitterconnector import TwitterConnector
import json
import numpy as np
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, async_mode='gevent', debug=True, host="0.0.0.0", port=5000, engineio_logger=True, logger=True)
# socketio = SocketIO(app)


def setup(app):
    model = CombinedClassifier()
    try:
        model.load()
        pass
    except Exception as e:
        # app.logger.error(e.message)
        pass
    app.config['model'] = model
#setup(app)


@socketio.on('data_request')
def test_message(message):
    print('received message: ' + str(message))
    message = json.loads(message)
    hashtag = message['hashtag']
    print("hashtag: " + str(hashtag))
    number_of_tweets = message['number_of_tweets']
    number_of_datapoints = 20
    #TODO overall sentiment
    print("number_of_tweets: " + str(number_of_tweets))
    twitterconnector = TwitterConnector()
    tweets = twitterconnector.get_tweets(hashtag, number_of_tweets)
    tweet_texts = [t.text for t in tweets]
    model = app.config['model']
    model_result = model.predict_all(tweet_texts)
    json_result = build_respone(tweets,model_result, number_of_datapoints)


    result_json = []
    emit('data_response', json_result)


@app.route('/<path:path>')
@cross_origin()
def catch_all(path):
    tokens = path.split('/')

    if tokens[0] == 'node_modules':
        return send_file('./frontend/' + path)
    else:
        return send_file('./frontend/src/' + path)


@app.route("/")
def index():
    return send_file('./frontend/src/index.html')


def build_respone(tweets, model_result, number_of_datapoints):
    dataset_resp = []
    tweets_resp = []
    labels_resp = []

    overall_sentiment = {}

    for algorithm in model_result:
        overall_sentiment[algorithm] = np.average(np.array(model_result[algorithm]))
        dataset_resp.append({"data":moving_average(model_result[algorithm],number_of_datapoints), "label": algorithm})

    for i, tweet in enumerate(tweets):
        new_tweet = {
            "author":tweet.user.name,
            "text": tweet.text
        }
        for algorithm in model_result:
            new_tweet[algorithm] = model_result[algorithm][i]
        tweets_resp.append(new_tweet)
        labels_resp.append(int(tweet.created_at.timestamp()))

    labels_resp = moving_average(labels_resp, number_of_datapoints)

    response_obj = {
        "graph_data": {
            "dataset": dataset_resp,
            "labels": labels_resp
        },
        "tweets": tweets_resp,
        "overall_sentiment": overall_sentiment
    }
    return response_obj


def moving_average(alist, datapoints):
    window_size = int(float(len(alist))/datapoints)
    if window_size >= len(alist):
        return alist
    new_list = []
    entry_new = 0.0
    real_window = 0.0
    for i, entry in enumerate(alist):
        entry_new += entry
        real_window += 1.0
        if len(alist) % datapoints != 0 and len(new_list) == datapoints-1:
            window_size += 1
        if int(real_window) == window_size:
            entry_new /= real_window
            new_list.append(entry_new)
            entry_new = 0.0
            real_window = 0.0

    if real_window != 0:
        entry_new /= real_window
        new_list.append(entry_new)
    return new_list

if __name__ == '__main__':
    socketio.run(app)


