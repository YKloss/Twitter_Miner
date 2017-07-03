# -*- coding: utf-8 -*-
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import tree
from sklearn.pipeline import Pipeline
import numpy as np
import logging
import pickle
import os
import codecs

logger = logging.getLogger(__name__)


class DecisionTree():
    def __init__(self):
        self.classificator = None

    def train(self, texts, classes):
        logger.debug("Start training...")
        model = Pipeline([('vect', TfidfVectorizer(max_df=0.95, min_df=2, max_features=6000, decode_error='ignore')),
                          ('clf', tree.DecisionTreeClassifier()),
                          ])
        self.classificator = model.fit(texts, classes)
        logger.debug("Finished training.")

    def eval(self, texts, classes):
        logger.debug("Start evaluating...")
        if not self.classificator:
            raise Exception("Model not trained!")
        predicted = self.classificator.predict(texts)
        accuracy = np.mean(predicted == classes)
        logger.info("Accuracy: %f" % accuracy)
        return accuracy

    def predict(self, text):
        if not self.classificator:
            raise Exception("Model not trained!")
        result = self.classificator.predict([text])[0]
        return result

    def predict_all(self, texts):
        if not self.classificator:
            raise Exception("Model not trained!")
        result = self.classificator.predict(texts)
        return result

    def save(self):
        logger.debug("Saving model...")
        my_path = os.path.abspath(os.path.dirname(__file__))
        my_path = os.path.join(my_path, "trained_models/tree.p")
        if self.classificator:
            pickle.dump(self.classificator, open(my_path, "wb"))
            logger.debug("Model saved.")

    def load(self):
        my_path = os.path.abspath(os.path.dirname(__file__))
        my_path = os.path.join(my_path, "trained_models/tree.p")
        if not os.path.isfile(my_path):
            raise Exception("File not found: "+my_path)
        with open(my_path, "rb") as pickle_file:
            self.classificator = pickle.load(pickle_file)
