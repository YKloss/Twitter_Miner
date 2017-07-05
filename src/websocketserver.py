# -*- coding: utf-8 -*-
from flask_socketio import SocketIO,emit
from flask import Flask
from algorithems.classifier import CombinedClassifier
from twitterconnector import TwitterConnector

app = Flask(__name__)
socketio = SocketIO(app, async_mode='gevent', debug=True, host="0.0.0.0", port=5000, engineio_logger=True, logger=True)


def setup(app):
    model = CombinedClassifier()
    try:
        model.load()
        pass
    except Exception as e:
        app.logger.error(e.message)
    app.config['model'] = model
setup(app)


@socketio.on('data_request')
def test_message(message):
    print('received message: ' + str(message))
    hashtag = message['hashtag']
    number_of_tweets = message['number_of_tweets']
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



if __name__ == '__main__':
    socketio.run(app)
