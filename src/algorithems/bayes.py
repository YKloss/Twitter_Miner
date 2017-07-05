from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import logging
from algorithems.abstractclassifier import AbstractClassifier

logger = logging.getLogger(__name__)


class NaiveBayes(AbstractClassifier):

    def __init__(self):
        AbstractClassifier.__init__(self)
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        self.logger.debug("Start training...")
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', MultinomialNB()),
                          ])
        self.classificator = model.fit(texts, classes)
        self.logger.debug("Finished training.")

    def get_name(self):
        return "bayes"
