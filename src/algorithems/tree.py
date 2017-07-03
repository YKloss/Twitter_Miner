# -*- coding: utf-8 -*-
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import tree
from sklearn.pipeline import Pipeline
import logging
from algorithems.abstractclassifier import AbstractClassifier

logger = logging.getLogger(__name__)


class DecisionTree(AbstractClassifier):

    def __init__(self):
        AbstractClassifier.__init__(self)
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        logger.debug("Start training...")
        model = Pipeline([('vect', TfidfVectorizer(max_df=0.95, min_df=2, max_features=6000, decode_error='ignore')),
                          ('clf', tree.DecisionTreeClassifier()),
                          ])
        self.classificator = model.fit(texts, classes)
        logger.debug("Finished training.")

    def save(self):
        AbstractClassifier.save(self, "tree.p")

    def load(self):
        AbstractClassifier.load(self, "tree.p")

