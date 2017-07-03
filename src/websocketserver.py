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
        #model.load()
        pass
    except Exception as e:
        app.logger.error(e.message)
    app.config['model'] = model
setup(app)


@socketio.on('hashtag', namespace='/test')
def test_message(message):
    hashtag = message['hashtag']
    twitterconnector = TwitterConnector()
    tweets = twitterconnector.get_tweets(hashtag)

    tweet_texts = [t.text for t in tweets]
    model = app.config['model']
    result = model.predict_all(tweet_texts)


    result_json = []
    for tweet, tweet_text, svm in zip(tweets, tweet_texts, svd_result):
        result_json.append(
            {
                "text": tweet_text,
                "bayes": False,
                "svm": (True if svm else False),
                "decisiontree": False
            }
        )
    emit('tweets', {'tweets': result_json})


if __name__ == '__main__':
    socketio.run(app)
