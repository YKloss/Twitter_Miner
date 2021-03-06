# -*- coding: utf-8 -*-
import tweepy


class TwitterConnector():
    def __init__(self):
        with open("twitter_secrets.txt", "r") as f:
            consumer_key = (f.readline().split("=")[1])
            consumer_secret = (f.readline().split("=")[1])
        auth = tweepy.OAuthHandler(consumer_key.strip('\n'), consumer_secret.strip('\n'))
        self.api = tweepy.API(auth)

    def get_tweets(self, hashtag, itemLimit):
        tweets = tweepy.Cursor(self.api.search, q=hashtag, lang="en").items(itemLimit)
        return [tweet for tweet in tweets]
