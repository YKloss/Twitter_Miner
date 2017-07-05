# -*- coding: utf-8 -*-
import tweepy


class TwitterConnector():
    def __init__(self):
        with open("twitter_secrets.txt", "r") as f:
            consumer_key = f.readline().split("=")[1]
            print("consumer_key: " + str(consumer_key))
            consumer_secret = f.readline().split("=")[1]
            print("consumer_secret: " + str(consumer_secret))

        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        self.api = tweepy.API(auth)

    def get_tweets(self, hashtag, itemLimit):
        tweets = tweepy.Cursor(self.api.search, q=hashtag, lang="en").items(itemLimit)
        #return complete tweet, not only the text
        return tweets 