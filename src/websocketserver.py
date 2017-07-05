# -*- coding: utf-8 -*-
from flask_socketio import SocketIO,emit
from flask import Flask, send_file
from algorithems.classifier import CombinedClassifier
from twitterconnector import TwitterConnector
import json
from flask_cors import CORS, cross_origin

def test():
    model = CombinedClassifier()
    model.load()
    twitterconnector = TwitterConnector()
    tweets = twitterconnector.get_tweets("brexit", 10)

    model_result = model.predict_all([t.text for t in tweets])
    json_result = build_respone(tweets, model_result)
    print(json_result)
test()
exit()

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
    print("number_of_tweets: " + str(number_of_tweets))
    twitterconnector = TwitterConnector()
    tweets = twitterconnector.get_tweets(hashtag, number_of_tweets)

    tweet_texts = [t.text for t in tweets]
    model = app.config['model']
    model_result = model.predict_all([t.text for t in tweets])
    json_result = build_respone(tweets,model_result)


    result_json = []
    emit('data_response', json_result)


def build_respone(tweets, model_result):
    dataset_resp = []
    tweets_resp = []
    labels_resp = []

    overall_sentiment = 0.0

    for algorithm in model_result:
        dataset_resp.append({"data":model_result[algorithm], "label": algorithm})


    for i, tweet in enumerate(tweets):
        new_tweet = {
            "author":tweet.user.name,
            "text": tweet.text
        }
        for algorithm in model_result:
            new_tweet[algorithm] = model_result[algorithm][i]
        tweets_resp.append(new_tweet)
        labels_resp.append(tweet.time)


    response_obj = {
        "graph_data": {
            "dataset": dataset_resp,
            "labels": labels_resp
        },
        "tweets": tweets_resp,
        "overall_sentiment": overall_sentiment
    }
    return response_obj

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

if __name__ == '__main__':
    socketio.run(app)


