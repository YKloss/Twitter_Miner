# -*- coding: utf-8 -*-
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import logging
from abstractclassifier import AbstractClassifier


class SupportVectorMachine(AbstractClassifier):

    def __init__(self):
        AbstractClassifier.__init__(self)
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        self.logger.debug("Start training...")
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, n_iter=5, random_state=42)),
                          ])
        self.classificator = model.fit(texts, classes)
        self.logger.debug("Finished training.")

    def save(self):
        AbstractClassifier.save(self, "svm.p")

    def load(self):
        AbstractClassifier.load(self, "svm.p")
