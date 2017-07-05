# -*- coding: utf-8 -*-
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
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', tree.DecisionTreeClassifier()),
                          ])
        self.classificator = model.fit(texts, classes)
        logger.debug("Finished training.")

    def get_name(self):
        return "tree"

