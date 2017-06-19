import tweepy

class TwitterConnector():
    def __init__(self, consumer_key, consumer_secret):   
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        self.api = tweepy.API(auth)

    def get_tweets(self, hastag):
        tweets = tweepy.Cursor(self.api.search, q=hastag).items()
        #return complete tweet, not only the text
        return tweets 