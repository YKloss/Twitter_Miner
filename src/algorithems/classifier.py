from bayes import NaiveBayes
from svm import SupportVectorMachine
from tree import DecisionTree
import logging

logger = logging.getLogger(__name__)


class CombinedClassifier:
    def __init__(self):
        self.models = [SupportVectorMachine(), NaiveBayes(), DecisionTree()]

    def train(self, texts, classes):
        for model in self.models:
            model.train(texts, classes)

    def eval(self, texts, classes):
        for model in self.models:
            try:
                model.eval(texts, classes)
            except Exception as e:
                logger.error(e.message)

    def predict(self, text):
        results = []
        for model in self.models:
            try:
                results.append(model.predict(text))
            except Exception as e:
                logger.error(e.message)
        return results

    def predict_all(self, texts):
        results = []
        for model in self.models:
            try:
                results.append(model.predict(texts))
            except Exception as e:
                logger.error(e.message)
        return results

    def save(self):
        for model in self.models:
            try:
                model.save()
            except Exception as e:
                logger.error(e.message)

    def load(self):
        for model in self.models:
            try:
                model.load()
            except Exception as e:
                logger.error(e.message)

